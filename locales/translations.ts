
export type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'hi' | 'ne';

export const translations = {
  en: {
    hero: {
      youtubeTitle: 'YouTube Audio Downloader',
      youtubeDesc: 'Convert YouTube videos and playlists to high-quality MP3.',
      facebookTitle: 'Facebook Video Downloader',
      facebookDesc: 'Save Facebook videos in high quality MP4 (Video Only).',
      instagramTitle: 'Instagram Downloader',
      instagramDesc: 'Download Instagram Reels and Videos instantly.',
      tiktokTitle: 'TikTok Downloader',
      tiktokDesc: 'Download TikTok videos without watermark in HD.',
      universalTitle: 'Universal Media Downloader',
      universalDesc: 'Download compatible videos from almost any site.',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'Other Sites',
      noWm: 'No WM'
    },
    search: {
      pasteYoutube: 'Paste YouTube URL or search music...',
      pasteFacebook: 'Paste Facebook URL...',
      pasteInstagram: 'Paste Instagram URL...',
      pasteTiktok: 'Paste TikTok Link...',
      pasteUniversal: 'Paste URL from any site...',
      get: 'Get',
      paste: 'Paste',
      working: 'Processing...',
      singleVideo: 'Single Video',
      playlist: 'Playlist'
    },
    settings: {
      config: 'Config',
      format: 'Format',
      quality: 'Quality',
      bitrate: 'Bitrate',
      videoMp4: 'VIDEO (MP4)',
      audioMp3: 'AUDIO (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'MP3 Audio & Art',
      clearAll: 'Clear All'
    },
    card: {
      download: 'Download',
      starting: 'Starting...',
      ready: 'Ready',
      playlistItem: 'Playlist Item',
      videosFound: 'Videos Found'
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      sitemap: 'Sitemap',
      about: 'About Us'
    },
    legal: {
      back: 'Back to Downloader',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'Transparent. Secure. Private.',
      termsTitle: 'Terms of Service',
      termsDesc: 'Rules, Rights & Responsibilities.'
    },
    about: {
      title: 'About Us',
      desc: 'Learn more about our mission and team.',
      missionTitle: 'Our Mission',
      missionDesc: 'To provide the world\'s most accessible, fast, and secure media downloading tool, completely free of charge.',
      teamTitle: 'The Team',
      teamDesc: 'We are a small team of passionate developers and privacy advocates dedicated to keeping the internet open and accessible.',
      contactTitle: 'Contact Us',
      contactDesc: 'Have questions or suggestions? We\'d love to hear from you.'
    },
    header: {
      fastFree: 'FAST & FREE'
    },
    sitemap: {
      title: 'Sitemap',
      desc: 'Navigate through all our tools and pages.',
      tools: 'Downloader Tools',
      pages: 'Legal & Support',
      home: 'Home'
    },
    errors: {
      invalidUrl: 'Please enter a valid URL.',
      playlistInVideo: 'This is a playlist link. Please switch to Playlist mode.',
      videoInPlaylist: 'This is a video link. Please switch to Video mode.',
      backendError: 'Could not connect to server. Ensure backend is running.',
    }
  },
  es: {
    hero: {
      youtubeTitle: 'Descargador de Audio de YouTube',
      youtubeDesc: 'Convierte videos y listas de YouTube a MP3 de alta calidad.',
      facebookTitle: 'Descargador de Facebook',
      facebookDesc: 'Guarda videos de Facebook en alta calidad MP4 (Solo Video).',
      instagramTitle: 'Descargador de Instagram',
      instagramDesc: 'Descarga Reels y videos de Instagram al instante.',
      tiktokTitle: 'Descargador de TikTok',
      tiktokDesc: 'Descarga videos de TikTok sin marca de agua en HD.',
      universalTitle: 'Descargador Universal',
      universalDesc: 'Descarga videos compatibles de casi cualquier sitio.',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'Otros Sitios',
      noWm: 'Sin MA'
    },
    search: {
      pasteYoutube: 'Pega URL de YouTube o busca música...',
      pasteFacebook: 'Pega URL de Facebook...',
      pasteInstagram: 'Pega URL de Instagram...',
      pasteTiktok: 'Pega enlace de TikTok...',
      pasteUniversal: 'Pega URL de cualquier sitio...',
      get: 'Obtener',
      paste: 'Pegar',
      working: 'Procesando...',
      singleVideo: 'Video Individual',
      playlist: 'Lista'
    },
    settings: {
      config: 'Config',
      format: 'Formato',
      quality: 'Calidad',
      bitrate: 'Tasa de bits',
      videoMp4: 'VIDEO (MP4)',
      audioMp3: 'AUDIO (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'Audio MP3 y Portada',
      clearAll: 'Limpiar Todo'
    },
    card: {
      download: 'Descargar',
      starting: 'Iniciando...',
      ready: 'Listo',
      playlistItem: 'Elemento de lista',
      videosFound: 'Videos Encontrados'
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos y Condiciones',
      sitemap: 'Mapa del Sitio',
      about: 'Sobre Nosotros'
    },
    legal: {
      back: 'Volver al Descargador',
      privacyTitle: 'Política de Privacidad',
      privacyDesc: 'Transparente. Seguro. Privado.',
      termsTitle: 'Términos de Servicio',
      termsDesc: 'Reglas, Derechos y Responsabilidades.'
    },
    about: {
      title: 'Sobre Nosotros',
      desc: 'Conozca más sobre nuestra misión y equipo.',
      missionTitle: 'Nuestra Misión',
      missionDesc: 'Proporcionar la herramienta de descarga de medios más accesible, rápida y segura del mundo, completamente gratis.',
      teamTitle: 'El Equipo',
      teamDesc: 'Somos un pequeño equipo de desarrolladores apasionados dedicados a mantener Internet abierto y accesible.',
      contactTitle: 'Contáctenos',
      contactDesc: '¿Tiene preguntas o sugerencias? Nos encantaría saber de usted.'
    },
    header: {
      fastFree: 'RÁPIDO Y GRATIS'
    },
    sitemap: {
      title: 'Mapa del Sitio',
      desc: 'Navega por todas nuestras herramientas y páginas.',
      tools: 'Herramientas',
      pages: 'Legal y Soporte',
      home: 'Inicio'
    },
    errors: {
      invalidUrl: 'Por favor ingresa una URL válida.',
      playlistInVideo: 'Este es un enlace de lista. Cambia al modo Lista.',
      videoInPlaylist: 'Este es un enlace de video. Cambia al modo Video.',
      backendError: 'No se pudo conectar al servidor.',
    }
  },
  pt: {
    hero: {
      youtubeTitle: 'Baixar Áudio do YouTube',
      youtubeDesc: 'Converta vídeos e playlists do YouTube para MP3 de alta qualidade.',
      facebookTitle: 'Baixar Vídeos do Facebook',
      facebookDesc: 'Salve vídeos do Facebook em MP4 (Apenas Vídeo).',
      instagramTitle: 'Baixar do Instagram',
      instagramDesc: 'Baixe Reels e vídeos do Instagram instantaneamente.',
      tiktokTitle: 'Baixar do TikTok',
      tiktokDesc: 'Baixe vídeos do TikTok sem marca d\'água em HD.',
      universalTitle: 'Baixador Universal',
      universalDesc: 'Baixe vídeos compatíveis de quase qualquer site.',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'Outros Sites',
      noWm: 'Sem MD'
    },
    search: {
      pasteYoutube: 'Cole a URL do YouTube ou pesquise...',
      pasteFacebook: 'Cole a URL do Facebook...',
      pasteInstagram: 'Cole a URL do Instagram...',
      pasteTiktok: 'Cole o link do TikTok...',
      pasteUniversal: 'Cole a URL de qualquer site...',
      get: 'Baixar',
      paste: 'Colar',
      working: 'Processando...',
      singleVideo: 'Vídeo Único',
      playlist: 'Playlist'
    },
    settings: {
      config: 'Config',
      format: 'Formato',
      quality: 'Qualidade',
      bitrate: 'Taxa de bits',
      videoMp4: 'VÍDEO (MP4)',
      audioMp3: 'ÁUDIO (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'Áudio MP3 e Capa',
      clearAll: 'Limpar Tudo'
    },
    card: {
      download: 'Baixar',
      starting: 'Iniciando...',
      ready: 'Pronto',
      playlistItem: 'Item da lista',
      videosFound: 'Vídeos Encontrados'
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      privacy: 'Política de Privacidade',
      terms: 'Termos e Condições',
      sitemap: 'Mapa do Site',
      about: 'Sobre Nós'
    },
    legal: {
      back: 'Voltar ao Baixador',
      privacyTitle: 'Política de Privacidade',
      privacyDesc: 'Transparente. Seguro. Privado.',
      termsTitle: 'Termos de Serviço',
      termsDesc: 'Regras, Direitos e Responsabilidades.'
    },
    about: {
      title: 'Sobre Nós',
      desc: 'Saiba mais sobre nossa missão e equipe.',
      missionTitle: 'Nossa Missão',
      missionDesc: 'Fornecer a ferramenta de download de mídia mais acessível, rápida e segura do mundo, totalmente gratuita.',
      teamTitle: 'A Equipe',
      teamDesc: 'Somos uma pequena equipe de desenvolvedores apaixonados dedicados a manter a internet aberta e acessível.',
      contactTitle: 'Contate-nos',
      contactDesc: 'Tem perguntas ou sugestões? Adoraríamos ouvir você.'
    },
    header: {
      fastFree: 'RÁPIDO E GRÁTIS'
    },
    sitemap: {
      title: 'Mapa do Site',
      desc: 'Navegue por todas as nossas ferramentas e páginas.',
      tools: 'Ferramentas',
      pages: 'Legal e Suporte',
      home: 'Início'
    },
    errors: {
      invalidUrl: 'Por favor insira uma URL válida.',
      playlistInVideo: 'Este link é uma playlist. Mude para o modo Playlist.',
      videoInPlaylist: 'Este link é um vídeo. Mude para o modo Vídeo.',
      backendError: 'Não foi possível conectar ao servidor.',
    }
  },
  fr: {
    hero: {
      youtubeTitle: 'Téléchargeur Audio YouTube',
      youtubeDesc: 'Convertissez des vidéos et playlists YouTube en MP3 de haute qualité.',
      facebookTitle: 'Téléchargeur Facebook',
      facebookDesc: 'Enregistrez des vidéos Facebook en MP4 (Vidéo uniquement).',
      instagramTitle: 'Téléchargeur Instagram',
      instagramDesc: 'Téléchargez des Reels et vidéos Instagram instantanément.',
      tiktokTitle: 'Téléchargeur TikTok',
      tiktokDesc: 'Téléchargez des vidéos TikTok sans filigrane en HD.',
      universalTitle: 'Téléchargeur Universel',
      universalDesc: 'Téléchargez des vidéos compatibles depuis presque n\'importe quel site.',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'Autres sites',
      noWm: 'Sans Filigrane'
    },
    search: {
      pasteYoutube: 'Collez l\'URL YouTube ou recherchez...',
      pasteFacebook: 'Collez l\'URL Facebook...',
      pasteInstagram: 'Collez l\'URL Instagram...',
      pasteTiktok: 'Collez le lien TikTok...',
      pasteUniversal: 'Collez l\'URL de n\'importe quel site...',
      get: 'Obtenir',
      paste: 'Coller',
      working: 'Traitement...',
      singleVideo: 'Vidéo unique',
      playlist: 'Playlist'
    },
    settings: {
      config: 'Config',
      format: 'Format',
      quality: 'Qualité',
      bitrate: 'Débit',
      videoMp4: 'VIDÉO (MP4)',
      audioMp3: 'AUDIO (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'Audio MP3 et Pochette',
      clearAll: 'Tout effacer'
    },
    card: {
      download: 'Télécharger',
      starting: 'Lancement...',
      ready: 'Prêt',
      playlistItem: 'Élément de liste',
      videosFound: 'Vidéos trouvées'
    },
    footer: {
      rights: 'Tous droits réservés.',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions générales',
      sitemap: 'Plan du Site',
      about: 'À Propos'
    },
    legal: {
      back: 'Retour au téléchargeur',
      privacyTitle: 'Politique de confidentialité',
      privacyDesc: 'Transparent. Sécurisé. Privé.',
      termsTitle: 'Conditions d\'utilisation',
      termsDesc: 'Règles, droits et responsabilités.'
    },
    about: {
      title: 'À Propos',
      desc: 'En savoir plus sur notre mission et notre équipe.',
      missionTitle: 'Notre Mission',
      missionDesc: 'Fournir l\'outil de téléchargement de médias le plus accessible, rapide et sécurisé, totalement gratuitement.',
      teamTitle: 'L\'Équipe',
      teamDesc: 'Nous sommes une petite équipe de développeurs passionnés dédiés à garder l\'internet ouvert et accessible.',
      contactTitle: 'Contactez-nous',
      contactDesc: 'Des questions ou des suggestions ? Nous aimerions vous entendre.'
    },
    header: {
      fastFree: 'RAPIDE & GRATUIT'
    },
    sitemap: {
      title: 'Plan du Site',
      desc: 'Naviguez à travers tous nos outils et pages.',
      tools: 'Outils',
      pages: 'Légal & Support',
      home: 'Accueil'
    },
    errors: {
      invalidUrl: 'Veuillez entrer une URL valide.',
      playlistInVideo: 'Ceci est un lien de playlist. Passez en mode Playlist.',
      videoInPlaylist: 'Ceci est un lien vidéo. Passez en mode Vidéo.',
      backendError: 'Impossible de se connecter au serveur.',
    }
  },
  de: {
    hero: {
      youtubeTitle: 'YouTube Audio Downloader',
      youtubeDesc: 'Konvertieren Sie YouTube-Videos und Playlists in hochwertiges MP3.',
      facebookTitle: 'Facebook Video Downloader',
      facebookDesc: 'Speichern Sie Facebook-Videos als MP4 (nur Video).',
      instagramTitle: 'Instagram Downloader',
      instagramDesc: 'Laden Sie Instagram Reels und Videos sofort herunter.',
      tiktokTitle: 'TikTok Downloader',
      tiktokDesc: 'Laden Sie TikTok-Videos ohne Wasserzeichen in HD herunter.',
      universalTitle: 'Universeller Downloader',
      universalDesc: 'Laden Sie kompatible Videos von fast jeder Seite herunter.',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'Andere Seiten',
      noWm: 'Kein WZ'
    },
    search: {
      pasteYoutube: 'YouTube-URL einfügen oder suchen...',
      pasteFacebook: 'Facebook-URL einfügen...',
      pasteInstagram: 'Instagram-URL einfügen...',
      pasteTiktok: 'TikTok-Link einfügen...',
      pasteUniversal: 'URL von beliebiger Seite einfügen...',
      get: 'Holen',
      paste: 'Einfügen',
      working: 'Arbeiten...',
      singleVideo: 'Einzelnes Video',
      playlist: 'Wiedergabeliste'
    },
    settings: {
      config: 'Konfig',
      format: 'Format',
      quality: 'Qualität',
      bitrate: 'Bitrate',
      videoMp4: 'VIDEO (MP4)',
      audioMp3: 'AUDIO (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'MP3-Audio & Cover',
      clearAll: 'Alles löschen'
    },
    card: {
      download: 'Herunterladen',
      starting: 'Starten...',
      ready: 'Bereit',
      playlistItem: 'Listenelement',
      videosFound: 'Videos gefunden'
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutzrichtlinie',
      terms: 'Geschäftsbedingungen',
      sitemap: 'Sitemap',
      about: 'Über Uns'
    },
    legal: {
      back: 'Zurück zum Downloader',
      privacyTitle: 'Datenschutzrichtlinie',
      privacyDesc: 'Transparent. Sicher. Privat.',
      termsTitle: 'Nutzungsbedingungen',
      termsDesc: 'Regeln, Rechte & Pflichten.'
    },
    about: {
      title: 'Über Uns',
      desc: 'Erfahren Sie mehr über unsere Mission und unser Team.',
      missionTitle: 'Unsere Mission',
      missionDesc: 'Das zugänglichste, schnellste und sicherste Medien-Download-Tool der Welt kostenlos anzubieten.',
      teamTitle: 'Das Team',
      teamDesc: 'Wir sind ein kleines Team von leidenschaftlichen Entwicklern, die sich für ein offenes Internet einsetzen.',
      contactTitle: 'Kontakt',
      contactDesc: 'Haben Sie Fragen oder Vorschläge? Wir würden uns freuen, von Ihnen zu hören.'
    },
    header: {
      fastFree: 'SCHNELL & KOSTENLOS'
    },
    sitemap: {
      title: 'Sitemap',
      desc: 'Navigieren Sie durch alle unsere Tools und Seiten.',
      tools: 'Tools',
      pages: 'Rechtliches & Support',
      home: 'Startseite'
    },
    errors: {
      invalidUrl: 'Bitte geben Sie eine gültige URL ein.',
      playlistInVideo: 'Dies ist ein Playlist-Link. Bitte wechseln Sie in den Playlist-Modus.',
      videoInPlaylist: 'Dies ist ein Video-Link. Bitte wechseln Sie in den Video-Modus.',
      backendError: 'Keine Verbindung zum Server.',
    }
  },
  hi: {
    hero: {
      youtubeTitle: 'YouTube ऑडियो डाउनलोडर',
      youtubeDesc: 'YouTube वीडियो और प्लेलिस्ट को उच्च गुणवत्ता वाले MP3 में बदलें।',
      facebookTitle: 'Facebook वीडियो डाउनलोडर',
      facebookDesc: 'Facebook वीडियो को MP4 (केवल वीडियो) में सहेजें।',
      instagramTitle: 'Instagram डाउनलोडर',
      instagramDesc: 'Instagram Reels और वीडियो तुरंत डाउनलोड करें।',
      tiktokTitle: 'TikTok डाउनलोडर',
      tiktokDesc: 'बिना वॉटरमार्क के HD में TikTok वीडियो डाउनलोड करें।',
      universalTitle: 'यूनिवर्सल मीडिया डाउनलोडर',
      universalDesc: 'लगभग किसी भी साइट से वीडियो डाउनलोड करें।',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'अन्य साइटें',
      noWm: 'No WM'
    },
    search: {
      pasteYoutube: 'YouTube URL पेस्ट करें या खोजें...',
      pasteFacebook: 'Facebook URL पेस्ट करें...',
      pasteInstagram: 'Instagram URL पेस्ट करें...',
      pasteTiktok: 'TikTok लिंक पेस्ट करें...',
      pasteUniversal: 'किसी भी साइट का URL पेस्ट करें...',
      get: 'प्राप्त करें',
      paste: 'पेस्ट',
      working: 'कार्य जारी...',
      singleVideo: 'एकल वीडियो',
      playlist: 'प्लेलिस्ट'
    },
    settings: {
      config: 'कॉन्फ़िगरेशन',
      format: 'प्रारूप',
      quality: 'गुणवत्ता',
      bitrate: 'बिटरेट',
      videoMp4: 'वीडियो (MP4)',
      audioMp3: 'ऑडियो (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'MP3 ऑडियो और कला',
      clearAll: 'सभी साफ़ करें'
    },
    card: {
      download: 'डाउनलोड',
      starting: 'शुरू हो रहा है...',
      ready: 'तैयार',
      playlistItem: 'प्लेलिस्ट आइटम',
      videosFound: 'वीडियो मिले'
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      privacy: 'गोपनीयता नीति',
      terms: 'नियम और शर्तें',
      sitemap: 'साइटमैप',
      about: 'हमारे बारे में'
    },
    legal: {
      back: 'डाउनलोडर पर वापस जाएं',
      privacyTitle: 'गोपनीयता नीति',
      privacyDesc: 'पारदर्शी। सुरक्षित। निजी।',
      termsTitle: 'सेवा की शर्तें',
      termsDesc: 'नियम, अधिकार और जिम्मेदारियां।'
    },
    about: {
      title: 'हमारे बारे में',
      desc: 'हमारे मिशन और टीम के बारे में अधिक जानें।',
      missionTitle: 'हमारा मिशन',
      missionDesc: 'दुनिया का सबसे सुलभ, तेज और सुरक्षित मीडिया डाउनलोडिंग टूल मुफ्त में प्रदान करना।',
      teamTitle: 'टीम',
      teamDesc: 'हम भावुक डेवलपर्स की एक छोटी टीम हैं जो इंटरनेट को खुला और सुलभ रखने के लिए समर्पित हैं।',
      contactTitle: 'संपर्क करें',
      contactDesc: 'कोई प्रश्न या सुझाव? हम आपसे सुनना पसंद करेंगे।'
    },
    header: {
      fastFree: 'तेज़ और मुफ़्त'
    },
    sitemap: {
      title: 'साइटमैप',
      desc: 'हमारे सभी टूल्स और पेजों को ब्राउज़ करें।',
      tools: 'डाउनलोडर टूल्स',
      pages: 'कानूनी और सहायता',
      home: 'होम'
    },
    errors: {
      invalidUrl: 'कृपया एक वैध URL दर्ज करें।',
      playlistInVideo: 'यह एक प्लेलिस्ट लिंक है। कृपया प्लेलिस्ट मोड में स्विच करें।',
      videoInPlaylist: 'यह एक वीडियो लिंक है। कृपया वीडियो मोड में स्विच करें।',
      backendError: 'सर्वर से कनेक्ट नहीं हो सका।',
    }
  },
  ne: {
    hero: {
      youtubeTitle: 'YouTube अडियो डाउनलोडर',
      youtubeDesc: 'YouTube भिडियो र प्लेलिस्टहरूलाई उच्च गुणस्तरको MP3 मा बदल्नुहोस्।',
      facebookTitle: 'Facebook भिडियो डाउनलोडर',
      facebookDesc: 'Facebook भिडियोहरू MP4 (भिडियो मात्र) मा सेभ गर्नुहोस्।',
      instagramTitle: 'Instagram डाउनलोडर',
      instagramDesc: 'Instagram रिल र भिडियोहरू तुरुन्तै डाउनलोड गर्नुहोस्।',
      tiktokTitle: 'TikTok डाउनलोडर',
      tiktokDesc: 'वाटरमार्क बिना HD मा TikTok भिडियोहरू डाउनलोड गर्नुहोस्।',
      universalTitle: 'युनिभर्सल मिडिया डाउनलोडर',
      universalDesc: 'लगभग कुनै पनि साइटबाट मिल्दो भिडियोहरू डाउनलोड गर्नुहोस्।',
    },
    nav: {
      youtube: 'YouTube',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      other: 'अन्य साइटहरू',
      noWm: 'No WM'
    },
    search: {
      pasteYoutube: 'YouTube URL टाँस्नुहोस् वा खोज्नुहोस्...',
      pasteFacebook: 'Facebook URL यहाँ टाँस्नुहोस्...',
      pasteInstagram: 'Instagram URL यहाँ टाँस्नुहोस्...',
      pasteTiktok: 'TikTok लिंक यहाँ टाँस्नुहोस्...',
      pasteUniversal: 'कुनै पनि साइटको URL यहाँ टाँस्नुहोस्...',
      get: 'प्राप्त गर्नुहोस्',
      paste: 'टाँस्नुहोस्',
      working: 'काम गर्दै...',
      singleVideo: 'एकल भिडियो',
      playlist: 'प्लेलिस्ट'
    },
    settings: {
      config: 'कन्फिग',
      format: 'ढाँचा',
      quality: 'गुणस्तर',
      bitrate: 'बिटरेट',
      videoMp4: 'भिडियो (MP4)',
      audioMp3: 'अडियो (MP3)',
      mp4: 'MP4',
      mp3: 'MP3',
      mp3Label: 'MP3 अडियो र कला',
      clearAll: 'सबै हटाउनुहोस्'
    },
    card: {
      download: 'डाउनलोड',
      starting: 'सुरु हुँदैछ...',
      ready: 'तयार',
      playlistItem: 'प्लेलिस्ट वस्तु',
      videosFound: 'भिडियोहरू भेटिए'
    },
    footer: {
      rights: 'सबै अधिकार सुरक्षित।',
      privacy: 'गोपनीयता नीति',
      terms: 'नियम र सर्तहरू',
      sitemap: 'साइटम्याप',
      about: 'हाम्रो बारेमा'
    },
    legal: {
      back: 'डाउनलोडरमा फर्कनुहोस्',
      privacyTitle: 'गोपनीयता नीति',
      privacyDesc: 'पारदर्शी। सुरक्षित। निजी।',
      termsTitle: 'सेवाका सर्तहरू',
      termsDesc: 'नियम, अधिकार र जिम्मेवारीहरू।',
    },
    about: {
      title: 'हाम्रो बारेमा',
      desc: 'हाम्रो मिशन र टोली बारे थप जान्नुहोस्।',
      missionTitle: 'हाम्रो लक्ष्य',
      missionDesc: 'विश्वको सबैभन्दा पहुँचयोग्य, छिटो र सुरक्षित मिडिया डाउनलोड गर्ने उपकरण नि:शुल्क प्रदान गर्न।',
      teamTitle: 'टोली',
      teamDesc: 'हामी इन्टरनेटलाई खुला र पहुँचयोग्य राख्न समर्पित भावुक विकासकर्ताहरूको सानो टोली हौं।',
      contactTitle: 'सम्पर्क गर्नुहोस्',
      contactDesc: 'केहि प्रश्न वा सुझावहरू छन्? हामी सुन्न चाहन्छौं।'
    },
    header: {
      fastFree: 'छिटो र नि:शुल्क'
    },
    sitemap: {
      title: 'साइटम्याप',
      desc: 'हाम्रा सबै उपकरण र पृष्ठहरू ब्राउज गर्नुहोस्।',
      tools: 'उपकरणहरू',
      pages: 'कानूनी र समर्थन',
      home: 'गृहपृष्ठ'
    },
    errors: {
      invalidUrl: 'कृपया मान्य URL प्रविष्ट गर्नुहोस्।',
      playlistInVideo: 'यो प्लेलिस्ट लिंक हो। कृपया प्लेलिस्ट मोडमा स्विच गर्नुहोस्।',
      videoInPlaylist: 'यो भिडियो लिंक हो। कृपया भिडियो मोडमा स्विच गर्नुहोस्।',
      backendError: 'सर्वरमा जडान गर्न सकिएन।',
    }
  }
};
