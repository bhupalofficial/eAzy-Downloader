
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
    },
    guide: {
      howToTitle: '💡 How to Download Video & Audio',
      step1Title: 'Step 1',
      step1Desc: 'Copy the URL of your media from YouTube, TikTok, Facebook, or Instagram.',
      step2Title: 'Step 2',
      step2Desc: 'Paste the copied link in our search box above and hit the Get button.',
      step3Title: 'Step 3',
      step3Desc: 'Choose your preferred quality and format and begin your download seamlessly.',
      featuresTitle: '⚡ Key Features of eAzy Downloader',
      feature1Title: 'High-Quality MP3',
      feature1Desc: 'Convert any YouTube playlist or video directly into high-fidelity music with automatic album art embedding.',
      feature2Title: 'Universal Device Playback',
      feature2Desc: 'Auto-re-encodes TikTok downloads into H.264/AAC standard format so they play perfectly on mobile, web, and Windows Media Player.',
      feature3Title: 'No Watermarks',
      feature3Desc: 'Download clean, pristine social media videos instantly without watermarks or text overlays.',
      feature4Title: 'Free & Clean Site',
      feature4Desc: 'Safe, private, and lightning fast. No registration required, combined with auto-wiping disk space.',
      faqTitle: '🙋 Frequently Asked Questions (FAQ)',
      faq1Q: 'Is there any limit or charge for downloads?',
      faq1A: 'No, eAzy Downloader is 100% free and has no premium caps or daily search limits. No registration or software downloads are needed.',
      faq2Q: 'Why do TikTok downloaded videos sometimes fail to play?',
      faq2A: 'TikTok video files from other sources often package audio track streams or custom pixel groupings that are unreadable by standard media software like Apple QuickTime or Windows Media Player. eAzy Downloader solves this by auto-converting downloads into standard H.264 MP4 with AAC audio track, making it compatible with any offline player.',
      faq3Q: 'Which audio options are available?',
      faq3A: 'Audio downloads (MP3, M4A) are fully optimized for our YouTube downloader, while video platforms (TikTok, Instagram, Facebook) download pristine, highly compatible MP4 video tracks directly.',
      disclaimerTitle: 'Disclaimer',
      disclaimerDesc: 'Please respect copyright policies. eAzy Downloader does not host or store any copyright-restricted media on its servers and only indexes publicly accessible streams from social platforms.'
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
    },
    guide: {
      howToTitle: '💡 Cómo descargar videos y audio',
      step1Title: 'Paso 1',
      step1Desc: 'Copia la URL de tu medio de YouTube, TikTok, Facebook o Instagram.',
      step2Title: 'Paso 2',
      step2Desc: 'Pega el enlace copiado en nuestro cuadro de búsqueda de arriba y presiona el botón Get.',
      step3Title: 'Paso 3',
      step3Desc: 'Elige tu calidad y formato preferidos y comienza tu descarga sin problemas.',
      featuresTitle: '⚡ Características clave de eAzy Downloader',
      feature1Title: 'MP3 de alta calidad',
      feature1Desc: 'Convierte cualquier playlist o video de YouTube directamente en música de alta fidelidad con incrustación automática de portada.',
      feature2Title: 'Reproducción universal en dispositivos',
      feature2Desc: 'Vuelve a codificar las descargas de TikTok en formato estándar H.264/AAC para que se reproduzcan perfectamente en móviles, web y Windows Media Player.',
      feature3Title: 'Sin marcas de agua',
      feature3Desc: 'Descarga videos limpios de redes sociales al instante sin marcas de agua ni superposiciones de texto.',
      feature4Title: 'Sitio gratuito y limpio',
      feature4Desc: 'Seguro, privado y ultrarrápido. No requiere registro, combinado con la limpieza automática del espacio en disco.',
      faqTitle: '🙋 Preguntas frecuentes (FAQ)',
      faq1Q: '¿Existe algún límite o cargo por las descargas?',
      faq1A: 'No, eAzy Downloader es 100% gratuito y no tiene límites premium ni topes de búsqueda diarios. No se necesitan registros ni descargas de software.',
      faq2Q: '¿Por qué los videos descargados de TikTok a veces no se reproducen?',
      faq2A: 'Los archivos de video de TikTok a menudo empaquetan pistas de audio o píxeles no legibles por reproductores estándar. eAzy Downloader soluciona esto convirtiendo las descargas a MP4 estándar H.264 con audio AAC.',
      faq3Q: '¿Qué opciones de audio están disponibles?',
      faq3A: 'Las descargas de audio (MP3, M4A) están optimizadas para YouTube, mientras que las plataformas de video obtienen pistas de video MP4 altamente compatibles directamente.',
      disclaimerTitle: 'Descargo de responsabilidad',
      disclaimerDesc: 'Por favor respeta las políticas de derechos de autor. eAzy Downloader no aloja ni almacena ningún medio con derechos de autor y solo indexa transmisiones públicas.'
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
    },
    guide: {
      howToTitle: '💡 Como baixar vídeos e áudio',
      step1Title: 'Passo 1',
      step1Desc: 'Copie a URL da sua mídia do YouTube, TikTok, Facebook ou Instagram.',
      step2Title: 'Passo 2',
      step2Desc: 'Cole o link copiado na nossa caixa de pesquisa acima e clique no botão Get.',
      step3Title: 'Passo 3',
      step3Desc: 'Escolha a qualidade e o formato preferidos e inicie o download sem complicações.',
      featuresTitle: '⚡ Principais recursos do eAzy Downloader',
      feature1Title: 'MP3 de alta qualidade',
      feature1Desc: 'Converta qualquer playlist ou vídeo do YouTube diretamente em música de alta fidelidade com incorporação automática de capa.',
      feature2Title: 'Reprodução universal',
      feature2Desc: 'Recodifica downloads do TikTok no formato padrão H.264/AAC para reproduzir perfeitamente em celulares, web e leitores de mídia.',
      feature3Title: 'Sem marcas d\'água',
      feature3Desc: 'Baixe vídeos limpos de redes sociais instantaneamente sem marcas d\'água ou textos sobrepostos.',
      feature4Title: 'Site gratuito e limpo',
      feature4Desc: 'Seguro, privado e incrivelmente rápido. Sem necessidade de registro, com limpeza automática do espaço em disco.',
      faqTitle: '🙋 Perguntas frequentes (FAQ)',
      faq1Q: 'Existe algum limite ou cobrança para downloads?',
      faq1A: 'Não, o eAzy Downloader é 100% gratuito e não possui limites diários de busca ou taxas. Não é necessário registro ou software.',
      faq2Q: 'Por que alguns vídeos do TikTok falham ao reproduzir?',
      faq2A: 'Vídeos do TikTok costumam usar codecs de áudio/pixel não compatíveis com players padrão. O eAzy Downloader resolve isso convertendo-os para MP4 H.264 padrão com áudio AAC.',
      faq3Q: 'Quais opções de áudio estão disponíveis?',
      faq3A: 'Os downloads de áudio (MP3, M4A) son otimizados para o YouTube, enquanto as demais redes fornecem diretamente faixas de vídeo MP4 altamente compatíveis.',
      disclaimerTitle: 'Aviso legal',
      disclaimerDesc: 'Por favor, respeite os direitos autorais. O eAzy Downloader não hospeda nem armazena arquivos em seus servidores e apenas indexa links públicos.'
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
    },
    guide: {
      howToTitle: '💡 Comment télécharger des vidéos et audios',
      step1Title: 'Étape 1',
      step1Desc: 'Copiez l\'URL de votre média depuis YouTube, TikTok, Facebook ou Instagram.',
      step2Title: 'Étape 2',
      step2Desc: 'Collez le lien copié dans notre barre de recherche ci-dessus et cliquez sur le bouton Get.',
      step3Title: 'Étape 3',
      step3Desc: 'Choisissez votre qualité et votre format préférés et lancez votre téléchargement en toute fluidité.',
      featuresTitle: '⚡ Principales fonctionnalités d\'eAzy Downloader',
      feature1Title: 'MP3 haute qualité',
      feature1Desc: 'Convertissez n\'importe quelle playlist ou vidéo YouTube directement en musique haute fidélité avec intégration automatique de la pochette.',
      feature2Title: 'Lecture universelle sur appareil',
      feature2Desc: 'Ré-encode les vidéos TikTok au format standard H.264/AAC de sorte qu\'elles se lisent parfaitement sur mobile, web et Windows Media Player.',
      feature3Title: 'Sans filigrane',
      feature3Desc: 'Téléchargez des vidéos de réseaux sociaux propres instantanément, sans filigrane ni texte superposé.',
      feature4Title: 'Site gratuit et propre',
      feature4Desc: 'Sûr, privé et ultra-rapide. Aucune inscription requise, combiné avec un nettoyage automatique de l\'espace disque.',
      faqTitle: '🙋 Foire aux questions (FAQ)',
      faq1Q: 'Y a-t-il une limite ou un coût pour les téléchargements ?',
      faq1A: 'Non, eAzy Downloader est 100 % gratuit et sans aucune limite quotidienne. Aucune inscription ni aucun logiciel de tiers n\'est nécessaire.',
      faq2Q: 'Pourquoi les vidéos TikTok téléchargées échouent-elles parfois à la lecture ?',
      faq2A: 'Les vidéos de TikTok emballent souvent des codecs audio ou vidéo non compatibles avec certains lecteurs de bureau. eAzy Downloader convertit les téléchargements au standard vidéo H.264 MP4 et audio AAC.',
      faq3Q: 'Quelles options audio sont disponibles ?',
      faq3A: 'Les téléchargements audio (MP3, M4A) sont optimisés pour notre outil YouTube, alors que les autres plateformes fournissent directement des fichiers vidéo MP4 de haute compatibilité.',
      disclaimerTitle: 'Clause de non-responsabilité',
      disclaimerDesc: 'Veuillez respecter les règles de droit d\'auteur. eAzy Downloader ne stocke aucun média protégé et indexe uniquement les streams publics disponibles sur les réseaux sociaux.'
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
    },
    guide: {
      howToTitle: '💡 Wie man Videos & Audio herunterlädt',
      step1Title: 'Schritt 1',
      step1Desc: 'Kopieren Sie die URL Ihres Mediums von YouTube, TikTok, Facebook oder Instagram.',
      step2Title: 'Schritt 2',
      step2Desc: 'Fügen Sie den kopierten Link in das obige Suchfeld ein und klicken Sie auf Get.',
      step3Title: 'Schritt 3',
      step3Desc: 'Wählen Sie Ihr bevorzugtes Format und Ihre bevorzugte Qualität aus und starten Sie den Download.',
      featuresTitle: '⚡ Hauptmerkmale von eAzy Downloader',
      feature1Title: 'Hochwertiges MP3',
      feature1Desc: 'Konvertieren Sie jede YouTube-Wiedergabeliste oder jedes Video direkt in High-Fidelity-Musik mit automatischer Cover-Einbettung.',
      feature2Title: 'Universelle Wiedergabe',
      feature2Desc: 'Kodiert TikTok-Downloads automatisch in das H.264/AAC-Format um, sodass sie perfekt auf Mobilgeräten, im Web und im Windows Media Player laufen.',
      feature3Title: 'Keine Wasserzeichen',
      feature3Desc: 'Laden Sie saubere Social-Media-Videos ohne Wasserzeichen oder Textüberlagerungen sofort herunter.',
      feature4Title: 'Kostenlose & saubere Seite',
      feature4Desc: 'Sicher, privat und blitzschnell. Keine Registrierung erforderlich, gepaart mit automatischer Speicherbereinigung.',
      faqTitle: '🙋 Häufig gestellte Fragen (FAQ)',
      faq1Q: 'Gibt es ein Limit oder Gebühren für Downloads?',
      faq1A: 'Nein, eAzy Downloader ist zu 100 % kostenlos und hat keine Premium-Einschränkungen oder täglichen Limits. Keine Registrierung notwendig.',
      faq2Q: 'Warum lassen sich TikTok-Videos manchmal nicht abspielen?',
      faq2A: 'TikTok-Dateien nutzen oft spezielle Codecs. eAzy Downloader konvertiert die Downloads automatisch in Standard H.264 MP4 mit AAC-Audio für maximale Kompatibilität.',
      faq3Q: 'Welche Audiooptionen sind verfügbar?',
      faq3A: 'Audio-Downloads (MP3, M4A) sind voll für YouTube optimiert, während Videoplattformen direkt hochkompatible MP4-Videodateien bereitstellen.',
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerDesc: 'Bitte respektieren Sie das Urheberrecht. eAzy Downloader speichert keinerlei urheberrechtlich geschützte Medien und indexiert nur öffentlich zugängliche Streams.'
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
    },
    guide: {
      howToTitle: '💡 वीडियो और ऑडियो कैसे डाउनलोड करें',
      step1Title: 'चरण 1',
      step1Desc: 'YouTube, TikTok, Facebook, या Instagram से अपने मीडिया का URL कॉपी करें।',
      step2Title: 'चरण 2',
      step2Desc: 'कॉपी किए गए लिंक को ऊपर दिए गए सर्च बॉक्स में पेस्ट करें और Get बटन दबाएं।',
      step3Title: 'चरण 3',
      step3Desc: 'अपना पसंदीदा प्रारूप और गुणवत्ता चुनें और अपना डाउनलोड शुरू करें।',
      featuresTitle: '⚡ eAzy डाउनलोडर की मुख्य विशेषताएं',
      feature1Title: 'उच्च गुणवत्ता वाला MP3',
      feature1Desc: 'किसी भी YouTube प्लेलिस्ट या वीडियो को स्वचालित एल्बम कला एम्बेडिंग के साथ सीधे संगीत में बदलें।',
      feature2Title: 'सार्वभौमिक डिवाइस प्लेबैक',
      feature2Desc: 'TikTok डाउनलोड को स्वचालित रूप से H.264/AAC मानक प्रारूप में बदलें ताकि वे मोबाइल, वेब और Windows मीडिया प्लेयर पर पूरी तरह से चलें।',
      feature3Title: 'कोई वॉटरमार्क नहीं',
      feature3Desc: 'बिना किसी वॉटरमार्क या टेक्स्ट ओवरले के तुरंत स्वच्छ सोशल मीडिया वीडियो डाउनलोड करें।',
      feature4Title: 'मुफ़्त और सुरक्षित साइट',
      feature4Desc: 'सुरक्षित, निजी और बेहद तेज़। डिस्क स्थान की स्वचालित सफाई के साथ, किसी पंजीकरण की आवश्यकता नहीं है।',
      faqTitle: '🙋 अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      faq1Q: 'क्या डाउनलोड के लिए कोई सीमा या शुल्क है?',
      faq1A: 'नहीं, eAzy डाउनलोडर 100% मुफ़्त है और इसमें कोई दैनिक खोज सीमा या प्रीमियम कैप नहीं है। किसी सॉफ़्टवेयर डाउनलोड की आवश्यकता नहीं है।',
      faq2Q: 'TikTok से डाउनलोड किए गए वीडियो कभी-कभी चलने में विफल क्यों होते हैं?',
      faq2A: 'TikTok वीडियो अक्सर ऐसे कोडेक्स का उपयोग करते हैं जो मानक प्लेयर पर नहीं चलते। eAzy डाउनलोडर इन्हें मानक H.264 MP4 और AAC ऑडियो में कनवर्ट कर इस समस्या को हल करता है।',
      faq3Q: 'कौन से ऑडियो विकल्प उपलब्ध हैं?',
      faq3A: 'ऑडियो डाउनलोड (MP3, M4A) YouTube डाउनलोडर के लिए पूरी तरह से अनुकूलित हैं, जबकि वीडियो प्लेटफॉर्म सीधे संगत MP4 ट्रैक डाउनलोड करते हैं।',
      disclaimerTitle: 'अस्वीकरण',
      disclaimerDesc: 'कृपया कॉपीराइट नीतियों का सम्मान करें। eAzy डाउनलोडर अपने सर्वर पर किसी भी कॉपीराइट-प्रतिबंधित मीडिया को होस्ट नहीं करता है।'
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
    },
    guide: {
      howToTitle: '💡 भिडियो र अडियो कसरी डाउनलोड गर्ने',
      step1Title: 'चरण १',
      step1Desc: 'YouTube, TikTok, Facebook, वा Instagram बाट आफ्नो मिडियाको URL कपि गर्नुहोस्।',
      step2Title: 'चरण २',
      step2Desc: 'कपि गरिएको लिङ्कलाई माथिको खोज बाकसमा टाँस्नुहोस् र Get बटन थिच्नुहोस्।',
      step3Title: 'चरण ३',
      step3Desc: 'आफ्नो मनपर्ने ढाँचा र गुणस्तर छनोट गर्नुहोस् र बिना कुनै झन्झट डाउनलोड सुरु गर्नुहोस्।',
      featuresTitle: '⚡ eAzy डाउनलोडरका मुख्य विशेषताहरू',
      feature1Title: 'उच्च गुणस्तरको MP3',
      feature1Desc: 'कुनै पनि YouTube प्लेलिस्ट वा भिडियोलाई स्वचालित एल्बम कभर आर्ट एम्बेडिङका साथ उच्च गुणस्तरको संगीतमा परिणत गर्नुहोस्।',
      feature2Title: 'सार्वभौमिक यन्त्र प्लेब्याक',
      feature2Desc: 'TikTok डाउनलोडहरूलाई स्वचालित रूपमा H.264/AAC मानक ढाँचामा पुनः इन्कोड गर्नुहोस् ता कि ती मोबाइल, वेब र विन्डोज मिडिया प्लेयरमा सहजै प्ले हुन्।',
      feature3Title: 'कुनै वाटरमार्क छैन',
      feature3Desc: 'बिना वाटरमार्क वा टेक्स्ट विज्ञापनहरू तत्काल सफा सामाजिक मिडिया भिडियोहरू डाउनलोड गर्नुहोस्।',
      feature4Title: 'नि:शुल्क र सुरक्षित साइट',
      feature4Desc: 'सुरक्षित, निजी र अत्यन्तै छिटो। कुनै दर्ता आवश्यक छैन, साथै स्वचालित डिस्क स्पेस सफाइको सुविधा।',
      faqTitle: '🙋 बारम्बार सोधिने प्रश्नहरू (FAQ)',
      faq1Q: 'के डाउनलोडका लागि कुनै सीमा वा शुल्क छ?',
      faq1A: 'छैन, eAzy डाउनलोडर १००% नि:शुल्क छ र यसमा कुनै दैनिक खोज सीमा वा प्रिमियम प्रतिबन्धहरू छैनन्। कुनै सफ्टवेयर डाउनलोड आवश्यक पर्दैन।',
      faq2Q: 'TikTok बाट डाउनलोड गरिएका भिडियोहरू कहिलेकाहीं किन प्ले हुन सक्दैनन्?',
      faq2A: 'TikTok भिडियोहरू प्रायः मानक मिडिया प्लेयरहरूमा नचल्ने कोडेक्समा हुन सक्छन्। eAzy डाउनलोडरले यस्ता भिडियोहरूलाई मानक H.264 MP4 र AAC अडियोमा परिणत गरेर समाधान गर्छ।',
      faq3Q: 'कुन-कुन अडियो विकल्पहरू उपलब्ध छन्?',
      faq3A: 'अडियो डाउनलोडहरू (MP3, M4A) YouTube को लागि पूर्ण रूपमा अनुकूलित छन्, जबकि अन्य सामाजिक प्लेटफर्महरूले सिधै उपयुक्त MP4 भिडियो डाउनलोड प्रदान गर्दछन्।',
      disclaimerTitle: 'अस्विकृति',
      disclaimerDesc: 'कृपया प्रतिलिपि अधिकार नीतिहरूको सम्मान गर्नुहोस्। eAzy डाउनलोडरले आफ्नो सर्भरमा कुनै पनि प्रतिलिपि अधिकार-प्रतिबन्धित मिडिया होस्ट वा भण्डारण गर्दैन।'
    }
  }
};
