import uvicorn
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import yt_dlp
import logging
import os
import uuid
import shutil
import time
import tempfile
import sys
import subprocess

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import threading
import socket
import urllib.parse

# Thread Semaphore to restrict heavy download process load
CONCURRENT_DOWNLOAD_LIMIT = 4
download_semaphore = threading.Semaphore(CONCURRENT_DOWNLOAD_LIMIT)

def is_safe_url(url: str) -> bool:
    try:
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in ('http', 'https'):
            return False
            
        hostname = parsed.hostname
        if not hostname:
            return False
            
        # Check standard loopbacks/metadata IP literals directly 
        lowered_host = hostname.lower().strip()
        if lowered_host in ('localhost', '127.0.0.1', '0.0.0.0', '::1', '169.254.169.254'):
            return False
            
        # Address resolution & private CIDR checks
        ips = socket.getaddrinfo(hostname, None)
        for _, _, _, _, sockaddr in ips:
            ip = sockaddr[0]
            if '.' in ip:
                octets = ip.split('.')
                if len(octets) == 4:
                    first = int(octets[0])
                    second = int(octets[1])
                    if first == 127:  # Loopback
                        return False
                    if first == 10:   # Private Class A
                        return False
                    if first == 172 and (16 <= second <= 31):  # Private Class B
                        return False
                    if first == 192 and second == 168:  # Private Class C
                        return False
                    if first == 169 and second == 254:  # Link Local
                        return False
                    if first == 0:    # Unspecified
                        return False
            elif ':' in ip:
                ip_lower = ip.lower()
                if ip_lower == '::1' or ip_lower == '0:0:0:0:0:0:0:1':
                    return False
                if ip_lower.startswith('fc') or ip_lower.startswith('fd') or ip_lower.startswith('fe80'):
                    return False
        return True
    except Exception as e:
        logger.warning(f"Error checking URL safety for {url}: {e}")
        return False

# Self-healing background updates of yt-dlp
_ytdlp_update_lock = threading.Lock()
_last_ytdlp_update_time = 0

def update_ytdlp_async():
    global _last_ytdlp_update_time
    current_time = time.time()
    
    # Throttle updates to at most once per 10 minutes to avoid pip spam
    if current_time - _last_ytdlp_update_time < 600:
        return
        
    def run():
        if not _ytdlp_update_lock.acquire(blocking=False):
            return
        try:
            global _last_ytdlp_update_time
            logger.info("⚙️ Upgrading yt-dlp in the background to guarantee maximum platform compatibility...")
            # Run pip upgrade on yt-dlp inside the active environment
            subprocess.run(
                [sys.executable, "-m", "pip", "install", "-U", "yt-dlp"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=True
            )
            _last_ytdlp_update_time = time.time()
            logger.info("✅ Background yt-dlp self-healing upgrade completed successfully!")
        except Exception as e:
            logger.warning(f"Could not background-upgrade yt-dlp: {e}")
        finally:
            _ytdlp_update_lock.release()
            
    threading.Thread(target=run, daemon=True).start()

# Start background initial upgrade on startup
update_ytdlp_async()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === TEMP DIRECTORY SETUP ===
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_DIR = os.path.abspath(os.path.join(BACKEND_DIR, "..", "temp"))

if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR, exist_ok=True)

logger.info(f"📂 Temporary storage location: {TEMP_DIR}")

# === FFmpeg Detection and Setup ===
FFMPEG_PATH = None

def get_ffmpeg_path():
    global FFMPEG_PATH
    if FFMPEG_PATH:
        return FFMPEG_PATH

    # 1. Check system PATH
    system_path = shutil.which('ffmpeg')
    if system_path:
        FFMPEG_PATH = system_path
        return FFMPEG_PATH

    # 2. Check common Unix/Linux absolute locations
    for path in ['/usr/bin/ffmpeg', '/usr/local/bin/ffmpeg', '/bin/ffmpeg', '/usr/sbin/ffmpeg']:
        if os.path.exists(path):
            FFMPEG_PATH = path
            return FFMPEG_PATH

    # 3. Check if imageio-ffmpeg is available or auto-install it
    try:
        import imageio_ffmpeg
        FFMPEG_PATH = imageio_ffmpeg.get_ffmpeg_exe()
        return FFMPEG_PATH
    except ImportError:
        logger.info("🔧 imageio-ffmpeg not found. Attempting self-healing auto-installation...")
        try:
            # Run pip to install imageio-ffmpeg inside the exact active python environment
            subprocess.run(
                [sys.executable, "-m", "pip", "install", "imageio-ffmpeg"],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            import imageio_ffmpeg
            FFMPEG_PATH = imageio_ffmpeg.get_ffmpeg_exe()
            logger.info(f"✅ Successfully auto-installed imageio-ffmpeg. Binary path: {FFMPEG_PATH}")
            return FFMPEG_PATH
        except Exception as e:
            logger.warning(f"Could not auto-install imageio-ffmpeg: {e}")

    # 4. Try running ffmpeg directly as a test fallback
    try:
        subprocess.run(['ffmpeg', '-version'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        FFMPEG_PATH = 'ffmpeg'
        return FFMPEG_PATH
    except Exception:
        pass

    return None

FFMPEG_PATH = get_ffmpeg_path()
FFMPEG_AVAILABLE = FFMPEG_PATH is not None
logger.info(f"🔍 FFmpeg discovered check result: {FFMPEG_AVAILABLE} (Path: {FFMPEG_PATH})")

class VideoRequest(BaseModel):
    url: str
    type: str = "video"
    platform: str = "youtube"

def clean_stale_files():
    try:
        current_time = time.time()
        retention_period = 300 # 5 minutes (more aggressive)
        if os.path.exists(TEMP_DIR):
            for filename in os.listdir(TEMP_DIR):
                file_path = os.path.join(TEMP_DIR, filename)
                if os.path.isfile(file_path):
                    if current_time - os.path.getmtime(file_path) > retention_period:
                        try:
                            os.remove(file_path)
                            logger.info(f"🧹 Cleaned up stale file: {file_path}")
                        except: pass
    except: pass

def cleanup_file(path: str, file_id: str = None):
    # Perform instant deletion since the stream has finished discharging.
    try:
        if path and os.path.exists(path):
            os.remove(path)
            logger.info(f"🗑️ Instantly deleted primary file from root temp: {path}")
    except Exception as e:
        # Fallback to retry with a small sleep if locked
        try:
            time.sleep(0.5)
            if path and os.path.exists(path):
                os.remove(path)
                logger.info(f"🗑️ Cleaned up primary file on retry: {path}")
        except Exception as retry_err:
            logger.warning(f"Failed to delete primary file {path}: {retry_err}")
    
    # If a file_id is provided, check for any associated files (like thumbnails, parts, artwork files, subtitles, conversion temps)
    if file_id:
        try:
            if os.path.exists(TEMP_DIR):
                for filename in os.listdir(TEMP_DIR):
                    if filename.startswith(file_id):
                        file_path = os.path.join(TEMP_DIR, filename)
                        try:
                            if os.path.exists(file_path):
                                os.remove(file_path)
                                logger.info(f"🗑️ Deleted extra session file: {file_path}")
                        except Exception as e:
                            logger.warning(f"Failed to delete extra session file {file_path}: {e}")
        except Exception as e:
            logger.warning(f"Error during file_id cleanup for {file_id}: {e}")

def extract_lyrics_from_description(desc: str):
    if not desc:
        return None
    import re
    lines = desc.splitlines()
    lyrics_lines = []
    started = False
    
    start_triggers = [
        r'\blyrics\b', r'\btext\b', r'\bverse 1\b', r'\bchorus\b', 
        r'\[intro\]', r'\[verse \d+\]', r'\[chorus \d+?\]'
    ]
    stop_triggers = [
        r'\bconnect\b', r'\bfollow\b', r'\blink\b', r'\bwebsite\b', r'\bhttp\b', r'\bhttps\b',
        r'\bfacebook\b', r'\btwitter\b', r'\binstagram\b', r'\bspotify\b', r'\bapple music\b',
        r'\bsubscribe\b', r'\bproduced by\b', r'\bwritten by\b', r'\bout now\b', r'\bshop\b'
    ]
    
    for line in lines:
        cleaned = line.strip()
        lowered = cleaned.lower()
        if not started:
            if any(re.search(trigger, lowered) for trigger in start_triggers):
                started = True
                if re.match(r'^lyrics:?$', lowered):
                    continue
                lyrics_lines.append(cleaned)
            continue
        if started:
            if any(re.search(trigger, lowered) for trigger in stop_triggers):
                if len(lyrics_lines) > 5:
                    break
            lyrics_lines.append(cleaned)
            
    if len(lyrics_lines) >= 3:
        return "\n".join(lyrics_lines)
    return None

def get_clean_lyrics(info: dict):
    # Try native lyrics field if present (extracted locally by yt-dlp)
    lyrics = info.get('lyrics')
    if lyrics:
        return lyrics
    # Try parsing description (wholly offline, local parser of description)
    lyrics = extract_lyrics_from_description(info.get('description', ''))
    if lyrics:
        return lyrics
    return None

def embed_artwork(audio_path: str, file_id: str, ext: str, info: dict = None):
    if not FFMPEG_AVAILABLE or not FFMPEG_PATH:
        return
    
    # Extract metadata fields
    title = ""
    artist = ""
    album = ""
    date = ""
    lyrics = ""
    
    if info:
        title = info.get('title') or ""
        artist = info.get('artist') or info.get('creator') or info.get('uploader') or ""
        album = info.get('album') or "Single"
        release_date = info.get('release_date') or info.get('release_year') or info.get('upload_date')
        if release_date:
            release_date = str(release_date)
            if len(release_date) == 8 and release_date.isdigit():
                date = f"{release_date[:4]}-{release_date[4:6]}-{release_date[6:]}"
            else:
                date = release_date
        lyrics = get_clean_lyrics(info) or ""
    
    # Scan files to find downloaded thumbnail associated with this file_id
    thumb_path = None
    if os.path.exists(TEMP_DIR):
        for f in os.listdir(TEMP_DIR):
            if f.startswith(file_id) and f.split('.')[-1].lower() in ['jpg', 'jpeg', 'png', 'webp', 'png']:
                possible_path = os.path.join(TEMP_DIR, f)
                if possible_path != audio_path:
                    thumb_path = possible_path
                    break
                
    cover_jpg = None
    if thumb_path and os.path.exists(thumb_path):
        logger.info(f"🎨 EmbedArtwork: Found thumbnail {thumb_path} for audio {audio_path}")
        orig_ext = thumb_path.split('.')[-1].lower()
        if orig_ext == 'webp':
            temp_jpg = os.path.join(TEMP_DIR, f"{file_id}_cover.jpg")
            try:
                logger.info("🎨 EmbedArtwork: Converting webp thumbnail to jpg using ffmpeg")
                subprocess.run(
                    [FFMPEG_PATH, '-y', '-i', thumb_path, temp_jpg],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=True
                )
                if os.path.exists(temp_jpg):
                    cover_jpg = temp_jpg
            except Exception as e:
                logger.warning(f"Failed to convert webp thumbnail to jpg: {e}")
        else:
            cover_jpg = thumb_path

    # Construct ffmpeg command to copy streams and add tags
    temp_output = os.path.join(TEMP_DIR, f"{file_id}_embedded.{ext}")
    try:
        if ext == 'mp3':
            if cover_jpg and os.path.exists(cover_jpg):
                cmd = [
                    FFMPEG_PATH, '-y',
                    '-i', audio_path,
                    '-i', cover_jpg,
                    '-map', '0:0',
                    '-map', '1:0',
                    '-c', 'copy',
                    '-id3v2_version', '3',
                    '-metadata:s:v', 'title="Album cover"',
                    '-metadata:s:v', 'comment="Cover (Front)"',
                ]
            else:
                cmd = [
                    FFMPEG_PATH, '-y',
                    '-i', audio_path,
                    '-c', 'copy',
                    '-id3v2_version', '3',
                ]
            
            # Apply tags
            if title: cmd.extend(['-metadata', f'title={title}'])
            if artist: cmd.extend(['-metadata', f'artist={artist}'])
            if album: cmd.extend(['-metadata', f'album={album}'])
            if date: cmd.extend(['-metadata', f'date={date}'])
            if lyrics: cmd.extend(['-metadata', f'lyrics={lyrics}', '-metadata', f'USLT={lyrics}'])
            cmd.append(temp_output)

        elif ext == 'm4a':
            if cover_jpg and os.path.exists(cover_jpg):
                cmd = [
                    FFMPEG_PATH, '-y',
                    '-i', audio_path,
                    '-i', cover_jpg,
                    '-map', '0:a',
                    '-map', '1:v',
                    '-c:a', 'copy',
                    '-c:v', 'mjpeg',
                    '-disposition:v', 'attached_pic',
                ]
            else:
                cmd = [
                    FFMPEG_PATH, '-y',
                    '-i', audio_path,
                    '-c:a', 'copy',
                ]
                
            # Apply tags
            if title: cmd.extend(['-metadata', f'title={title}'])
            if artist: cmd.extend(['-metadata', f'artist={artist}'])
            if album: cmd.extend(['-metadata', f'album={album}'])
            if date: cmd.extend(['-metadata', f'date={date}'])
            if lyrics: cmd.extend(['-metadata', f'lyrics={lyrics}'])
            cmd.append(temp_output)
        else:
            return
            
        logger.info(f"🎨 EmbedArtwork: Executing ffmpeg metadata & cover embed: {' '.join(cmd)}")
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        if os.path.exists(temp_output) and os.path.getsize(temp_output) > 0:
            os.replace(temp_output, audio_path)
            logger.info("🎨 EmbedArtwork: Successfully embedded artwork & metadata into audio file!")
    except Exception as e:
        logger.warning(f"🎨 EmbedArtwork: FFMPEG embedding error: {e}")
    finally:
        # Cleanup temporary cover and raw thumbnail
        if cover_jpg and cover_jpg != thumb_path:
            cleanup_file(cover_jpg)
        if thumb_path:
            cleanup_file(thumb_path)

@app.get("/status")
async def get_server_status():
    return {
        "status": "online",
        "ffmpeg": FFMPEG_AVAILABLE
    }

def get_ydl_opts(platform='youtube', fallback=False):
    # Rotating User Agents to avoid bot detection
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    ]
    # Use different UA based on time to rotate slightly
    ua = user_agents[int(time.time() / 60) % len(user_agents)] if not fallback else user_agents[0]

    opts = {
        'quiet': True,
        'no_warnings': True,
        'no_color': True,
        # Performance & Reliability
        'concurrent_fragment_downloads': 5,
        'buffersize': 1024 * 1024,
        'retries': 5,
        'fragment_retries': 5,
        'ignoreerrors': False, # Don't crash on minor warnings
        'user_agent': ua, # Safer options without wiping other headers
    }
    
    if platform == 'youtube':
        opts['extractor_args'] = {
            'youtube': {
                'player_client': ['ios', 'android', 'mweb', 'web_creator', 'tv'], # Prioritize highly resilient clients
                'player_skip': ['web_dash_manifest', 'web_hls_manifest'],
            }
        }
    
    if platform == 'universal':
        opts['geo_bypass'] = True

    return opts

def fetch_metadata(url: str, platform: str, is_playlist: bool = False):
    """Fetch video metadata with auto-retry logic"""
    errors = []
    
    # Strategy 1: Normal fetch
    try:
        opts = get_ydl_opts(platform, fallback=False)
        if is_playlist: opts['extract_flat'] = True
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info: return info, opts
    except Exception as e:
        errors.append(f"Standard: {str(e)}")
        logger.warning(f"Primary fetch failed for {url}: {e}")
        
    # Strategy 2: Fallback with restricted clients
    try:
        opts = get_ydl_opts(platform, fallback=True)
        if is_playlist: opts['extract_flat'] = True
        opts.update({
            'nocheckcertificate': True,
            'no_color': True,
        })
        # Try different client mix
        if platform == 'youtube':
            opts['extractor_args'] = {
                'youtube': {
                    'player_client': ['mweb', 'player_204', 'tv'],
                }
            }
            
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info: return info, opts
            errors.append("No info returned from fallback")
    except Exception as e:
        errors.append(f"Fallback: {str(e)}")
        logger.error(f"Fallback fetch failed for {url}: {e}")
            
    # If all failed, analyze the errors
    error_msg = "; ".join(errors)
    if "Sign in to confirm you're not a bot" in error_msg:
        detail = "YouTube is requesting bot verification. This is common in cloud hosting environments."
    elif "Private video" in error_msg:
        detail = "This video is private and cannot be accessed."
    elif "Video unavailable" in error_msg:
        detail = "This video is unavailable or has been removed."
    elif "geo-restricted" in error_msg.lower():
        detail = "This video is geo-restricted."
    else:
        detail = f"Could not retrieve info: {error_msg}"
        
    raise HTTPException(status_code=400, detail=detail)

@app.post("/info")
def get_video_info(request: VideoRequest):
    url = request.url
    platform = request.platform
    logger.info(f"Fetching info for: {url} [{platform}]")

    # 1. SSRF & Host restriction filter for safety
    if url.startswith('http://') or url.startswith('https://') or '://' in url:
        if not is_safe_url(url):
            raise HTTPException(status_code=400, detail="Access to the specified URL is restricted for security reasons (SSRF Defense).")
            
    # 2. YouTube Search fallback for plain text search terms
    is_search = False
    if platform == 'youtube' and request.type == 'video' and not (url.startswith('https://') or url.startswith('http://')):
        logger.info(f"🔎 Converting plain text to YouTube search: {url}")
        is_search = True
        search_query = f"ytsearch1:{url}"
        try:
            opts = get_ydl_opts(platform, fallback=False)
            with yt_dlp.YoutubeDL(opts) as ydl:
                search_info = ydl.extract_info(search_query, download=False)
            if not search_info or 'entries' not in search_info or not search_info['entries']:
                raise HTTPException(status_code=404, detail="No search results matched your query on YouTube.")
            info = search_info['entries'][0]
            # Override original url in-flight with absolute webpage url of first video match
            url = info.get('webpage_url') or f"https://www.youtube.com/watch?v={info.get('id')}"
        except Exception as se:
            logger.error(f"YouTube search error for query '{url}': {se}")
            # Trigger background auto-upgrade self-healing if extraction fails
            update_ytdlp_async()
            raise HTTPException(status_code=400, detail=f"Search failed. Please try again with a direct URL. ({str(se)})")
    else:
        # Fetch normally
        try:
            info, _ = fetch_metadata(url, platform, request.type == 'playlist')
        except Exception as e:
            # Trigger background upgrade of yt-dlp on any info extraction fails to ensure self-healing
            update_ytdlp_async()
            raise e

    if not info: raise HTTPException(status_code=404, detail="No info found")

    # === PLAYLIST ===
    if 'entries' in info:
        response_data = {
            "type": "playlist",
            "title": info.get('title', 'Playlist'),
            "id": info.get('id'),
            "url": info.get('webpage_url', url),
            "videos": []
        }
        entries = info.get('entries', [])
        if entries:
            for entry in entries: 
                if entry:
                    vid_id = entry.get('id')
                    thumb = entry.get('thumbnails', [{}])[0].get('url') if entry.get('thumbnails') else f"https://i.ytimg.com/vi/{vid_id}/hqdefault.jpg"
                    
                    # Ensure we have a high-quality full absolute URL for the video
                    entry_url = entry.get('url') or entry.get('webpage_url') or ""
                    
                    # If the URL is relative or is just a video ID, make it an absolute YouTube URL.
                    if vid_id:
                        if not entry_url or not entry_url.startswith('http') or entry_url.startswith('/') or entry_url == vid_id:
                            entry_url = f"https://www.youtube.com/watch?v={vid_id}"
                            
                    response_data['videos'].append({
                        "id": vid_id,
                        "title": entry.get('title') or f"Video {vid_id}",
                        "thumbnail": thumb,
                        "duration": entry.get('duration'),
                        "url": entry_url
                    })
        return response_data

    # === SINGLE VIDEO ===
    else:
        if 'formats' not in info:
             info, _ = fetch_metadata(url, platform, False)

        raw_formats = info.get('formats', [])
        formats = []
        audio_formats = []
        
        # 1. VIDEO FORMATS
        if platform == 'youtube':
            formats = [] # Video download removed for YouTube
        else:
            # Non-YouTube
            all_video = [f for f in raw_formats if f.get('height')]
            muxed = [f for f in all_video if f.get('acodec') != 'none']
            candidates = muxed if muxed else all_video
            candidates.sort(key=lambda x: x.get('height') or 0, reverse=True)
            
            if candidates:
                hd = candidates[0]
                formats.append({"format_id": hd['format_id'], "resolution": "HD", "ext": hd.get('ext'), "note": f"{hd.get('height')}p"})
                
                sd_list = [f for f in candidates if (f.get('height') or 0) < 720]
                if sd_list:
                    sd = sd_list[0]
                    if sd['format_id'] != hd['format_id']:
                        formats.append({"format_id": sd['format_id'], "resolution": "SD", "ext": sd.get('ext'), "note": f"{sd.get('height')}p"})

        # 2. AUDIO FORMATS
        if platform == 'youtube':
            audio_formats = [{"format_id": "bestaudio/best", "resolution": "Audio", "ext": "mp3", "note": "Best MP3 Audio"}]
        else:
            audio_formats = []

        if not formats:
            formats.append({"format_id": "best", "resolution": "Best", "ext": "mp4", "note": "Auto"})

        # Metadata generation
        artist = info.get('artist') or info.get('creator') or info.get('uploader') or "Unknown Artist"
        album = info.get('album') or "Single"
        release_date = info.get('release_date') or info.get('release_year') or info.get('upload_date')
        if release_date:
            release_date = str(release_date)
            if len(release_date) == 8 and release_date.isdigit():
                release_date = f"{release_date[:4]}-{release_date[4:6]}-{release_date[6:]}"
        else:
            release_date = "Unknown Date"
            
        lyrics = get_clean_lyrics(info) or "Lyrics not found for this track."

        return {
            "type": "video",
            "title": info.get('title'),
            "id": info.get('id'),
            "thumbnail": info.get('thumbnail'),
            "url": info.get('webpage_url', url),
            "formats": formats,
            "audio_formats": audio_formats,
            "metadata": {
                "artist": artist,
                "album": album,
                "release_date": release_date,
                "lyrics": lyrics
            }
        }

# Helper to perform the actual download sequence
def process_download(url: str, format_id: str, ext: str, background_tasks: BackgroundTasks, platform: str = 'youtube'):
    clean_stale_files()

    # Normalize url if it is relative or just a video ID for YouTube
    if platform == 'youtube' and not url.startswith('http'):
        if url.startswith('/'):
            url = url.lstrip('/')
        if 'watch?v=' in url:
            import urllib.parse
            parsed = urllib.parse.urlparse(url)
            queries = urllib.parse.parse_qs(parsed.query)
            if 'v' in queries and queries['v']:
                url = f"https://www.youtube.com/watch?v={queries['v'][0]}"
        else:
            url = f"https://www.youtube.com/watch?v={url}"

    try:
        file_id = str(uuid.uuid4())
        
        # Determine if we need to pre-fetch metadata.
        # Generally, we only need it if we are on YouTube and downloading video at a specific height (which is disabled anyway).
        # For audio downloads and other platforms, we can completely bypass this pre-fetch to avoid 429 rate limits.
        needs_prefetch = (platform == 'youtube' and ext == 'mp4' and format_id.endswith('p'))
        
        selected_format_code = 'best'
        successful_opts = get_ydl_opts(platform, fallback=False)
        prefetch_info = {}
        
        if needs_prefetch:
            try:
                prefetch_info, successful_opts = fetch_metadata(url, platform, False)
                if format_id.endswith('p') and format_id[:-1].isdigit():
                    target_h = int(format_id[:-1])
                    formats = prefetch_info.get('formats', [])
                    candidates = [f for f in formats if f.get('height') and f.get('acodec') != 'none' and f.get('vcodec') != 'none']
                    exact_matches = [f for f in candidates if f.get('height') == target_h]
                    higher_matches = [f for f in candidates if f.get('height') > target_h]
                    lower_matches = [f for f in candidates if f.get('height') < target_h]
                    best_match = None
                    if exact_matches:
                        exact_matches.sort(key=lambda x: x.get('tbr') or 0, reverse=True)
                        best_match = exact_matches[0]
                    elif higher_matches:
                        higher_matches.sort(key=lambda x: x.get('height'))
                        best_match = higher_matches[0]
                    elif lower_matches:
                        lower_matches.sort(key=lambda x: x.get('height'), reverse=True)
                        best_match = lower_matches[0]
                    if best_match:
                        selected_format_code = best_match['format_id']
            except Exception as e:
                logger.warning(f"Metadata pre-fetch failed, falling back to simple download: {e}")
                selected_format_code = 'best'
        else:
            if ext in ['mp3', 'm4a']:
                selected_format_code = 'bestaudio/best'
            elif format_id != 'best':
                selected_format_code = format_id
            else:
                selected_format_code = 'best'

        # 2. CONFIGURE DOWNLOADER
        dl_opts = successful_opts.copy()
        dl_opts.update({
            'outtmpl': f'{TEMP_DIR}/{file_id}.%(ext)s',
            'noplaylist': True,
        })

        if ext in ['mp3', 'm4a']:
            dl_opts['format'] = 'bestaudio/best'
            if FFMPEG_AVAILABLE:
                dl_opts['ffmpeg_location'] = FFMPEG_PATH
                dl_opts['writethumbnail'] = True
                dl_opts['postprocessors'] = [
                    {
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3' if ext == 'mp3' else 'm4a',
                        'preferredquality': '192',
                    }
                ]
                logger.info(f"Applying yt-dlp FFmpegExtractAudio postprocessor for {ext} using ffmpeg_location {FFMPEG_PATH}")
            else:
                logger.warning(f"FFmpeg not available. Returning raw audio stream renamed to {ext}")
        else:
            dl_opts['format'] = selected_format_code
            if FFMPEG_AVAILABLE:
                dl_opts['ffmpeg_location'] = FFMPEG_PATH

        # 3. EXECUTE DOWNLOAD WITH RETRY/FALLBACK
        info = None
        try:
            with yt_dlp.YoutubeDL(dl_opts) as ydl:
                # ydl.extract_info yields full info and downloads the file instantly
                info = ydl.extract_info(url, download=True)
        except Exception as primary_e:
            logger.warning(f"Primary download attempt failed for {url}, trying fallback options: {primary_e}")
            # Try with fallback options (different user agent, nocheckcertificate, etc)
            fallback_opts = get_ydl_opts(platform, fallback=True)
            fallback_opts.update({
                'nocheckcertificate': True,
                'no_color': True,
                'outtmpl': dl_opts['outtmpl'],
                'noplaylist': True,
            })
            if ext in ['mp3', 'm4a']:
                fallback_opts['format'] = 'bestaudio/best'
                if FFMPEG_AVAILABLE:
                    fallback_opts['ffmpeg_location'] = FFMPEG_PATH
                    fallback_opts['writethumbnail'] = True
                    fallback_opts['postprocessors'] = dl_opts.get('postprocessors', [])
            else:
                fallback_opts['format'] = selected_format_code
                if FFMPEG_AVAILABLE:
                    fallback_opts['ffmpeg_location'] = FFMPEG_PATH
                
            try:
                with yt_dlp.YoutubeDL(fallback_opts) as ydl:
                    info = ydl.extract_info(url, download=True)
            except Exception as fallback_e:
                # If fallback also fails, raise it to be caught by the outer block
                raise fallback_e

        if not info:
            raise HTTPException(status_code=400, detail="Download failed: yt-dlp was unable to extract video information or download the file. Try checking if the URL is valid, public, and not restricted.")
        filename = ydl.prepare_filename(info)

        if not os.path.exists(filename):
            # Fallback search matching file prefix
            for f in os.listdir(TEMP_DIR):
                if f.startswith(file_id):
                    filename = os.path.join(TEMP_DIR, f)
                    break
        
        if not os.path.exists(filename):
             raise HTTPException(status_code=404, detail="Download failed")

        # If TikTok video and FFmpeg is available, convert/re-encode to standard compatible MP4 (H.264/AAC with yuv420p)
        if platform == 'tiktok' and FFMPEG_AVAILABLE and ext not in ['mp3', 'm4a']:
            compat_filename = os.path.splitext(filename)[0] + "_compat.mp4"
            try:
                logger.info(f"Converting TikTok video {filename} to highly compatible MP4 format...")
                cmd = [
                    FFMPEG_PATH, "-y",
                    "-i", filename,
                    "-c:v", "libx264",
                    "-preset", "superfast",
                    "-crf", "23",
                    "-pix_fmt", "yuv420p",  # Essential for media players like Windows Media Player or Apple QuickTime
                    "-c:a", "aac",
                    "-b:a", "128k",
                    compat_filename
                ]
                result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                if result.returncode == 0 and os.path.exists(compat_filename) and os.path.getsize(compat_filename) > 0:
                    os.remove(filename)
                    new_mp4_name = os.path.splitext(filename)[0] + ".mp4"
                    os.rename(compat_filename, new_mp4_name)
                    filename = new_mp4_name
                    logger.info("TikTok video successfully converted to high-compatibility MP4 format!")
                else:
                    logger.warning(f"FFmpeg conversion failed (returncode {result.returncode}): {result.stderr}")
                    if os.path.exists(compat_filename):
                        os.remove(compat_filename)
            except Exception as conv_err:
                logger.error(f"Error converting TikTok video to compatible format: {conv_err}")

        # Force target format suffix renaming
        target_ext = 'm4a' if ext == 'm4a' else 'mp3' if ext == 'mp3' else filename.split('.')[-1]
        if ext in ['mp3', 'm4a'] or platform == 'youtube':
            if not filename.endswith(f'.{target_ext}'):
                new_filename = os.path.splitext(filename)[0] + f'.{target_ext}'
                try:
                    if os.path.exists(new_filename):
                        os.remove(new_filename)
                    os.rename(filename, new_filename)
                    filename = new_filename
                except Exception as re_err:
                    logger.warning(f"Failed to rename file to .{target_ext}: {re_err}")
            
            # Embed artwork and metadata tags using our robust ffmpeg custom method
            if FFMPEG_AVAILABLE:
                embed_artwork(filename, file_id, target_ext, info)
            
        media_type = 'audio/mpeg' if target_ext == 'mp3' else 'audio/mp4' if target_ext == 'm4a' else 'application/octet-stream'

        from urllib.parse import quote
        raw_title = info.get('title', 'video')
        # Remove any file extension from the title if it exists to prevent double extensions (e.g., file.mp3.mp3)
        for check_ext in ['.mp3', '.m4a', '.mp4', '.webm', '.mkv', '.3gp', '.avi']:
            if raw_title.lower().endswith(check_ext):
                raw_title = raw_title[:-len(check_ext)]
                break
        raw_title = raw_title.strip()

        if platform == 'youtube':
            artist = info.get('artist') or info.get('creator')
            if artist:
                # Format: Title -Artist -eAzy Downloader
                title_with_suffix = f"{raw_title} -{artist} -eAzy Downloader"
            else:
                title_with_suffix = f"{raw_title} -eAzy Downloader"
        else:
            # Other modes like facebook, instagram, tiktok, etc.
            title_with_suffix = f"{raw_title} -eAzy Downloader"

        dl_name = f"{title_with_suffix}.{target_ext}"
        dl_name = "".join([c for c in dl_name if c.isalnum() or c in [' ', '.', '-', '_', "'", '(', ')', '[', ']']]).strip()
        if not dl_name.endswith(f'.{target_ext}'):
            dl_name += f'.{target_ext}'

        background_tasks.add_task(cleanup_file, filename, file_id)

        encoded_filename = quote(dl_name)
        headers = {
            "Content-Disposition": f"attachment; filename=\"{dl_name}\"; filename*=utf-8''{encoded_filename}"
        }

        return FileResponse(
            path=filename, 
            media_type=media_type,
            headers=headers
        )

    except Exception as e:
        # Clean up any leftover partial files, thumbnails, or temporary downloads for this session
        if 'file_id' in locals() and file_id:
            try:
                cleanup_file("", file_id)
            except: pass
        import traceback
        traceback.print_exc()
        logger.error(f"Download Failed: {e}")
        if isinstance(e, HTTPException): raise e
        
        err_msg = str(e)
        if "Sign in to confirm you're not a bot" in err_msg:
            detail = "YouTube is requesting bot verification. This is common in cloud hosting environments."
        elif "Private video" in err_msg:
            detail = "This video is private and cannot be accessed."
        elif "Video unavailable" in err_msg:
            detail = "This video is unavailable or has been removed."
        elif "geo-restricted" in err_msg.lower():
            detail = "This video is geo-restricted or blocked in this region."
        else:
            detail = f"Download failed: {err_msg}"
            
        raise HTTPException(status_code=400, detail=detail)

@app.get("/download")
def download_video(url: str, format_id: str, ext: str, background_tasks: BackgroundTasks, platform: str = 'youtube'):
    # 1. SSRF & Host restriction filter for safety (on raw url if starts with protocol)
    if url.startswith('http://') or url.startswith('https://') or '://' in url:
        if not is_safe_url(url):
            raise HTTPException(status_code=400, detail="Access to the specified URL is restricted for security reasons (SSRF Defense).")

    # Normalize url if it is relative or just a video ID for YouTube
    if platform == 'youtube' and not url.startswith('http'):
        if url.startswith('/'):
            url = url.lstrip('/')
        if 'watch?v=' in url:
            import urllib.parse
            parsed = urllib.parse.urlparse(url)
            queries = urllib.parse.parse_qs(parsed.query)
            if 'v' in queries and queries['v']:
                url = f"https://www.youtube.com/watch?v={queries['v'][0]}"
        else:
            url = f"https://www.youtube.com/watch?v={url}"

    # 2. SSRF & Host restriction filter for safety on final normalized url
    if not is_safe_url(url):
        raise HTTPException(status_code=400, detail="Requested URL is restricted for security reasons (SSRF Defense).")

    # Limit concurrent heavy downloads utilizing thread lock
    with download_semaphore:
        try:
            return process_download(url, format_id, ext, background_tasks, platform)
        except Exception as e:
            # Trigger background yt-dlp auto-upgrade self-healing if download fails
            update_ytdlp_async()
            raise e

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
