// components/navbar.js
function renderNavbar(lang = 'en', pageKey = 'home') {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  const isTR = lang === 'tr';

  const texts = {
    home: isTR ? 'Ana Sayfa' : 'Home',
    about: isTR ? 'Hakkımızda' : 'About Us',
    services: isTR ? 'Hizmetlerimiz' : 'Our Services',
    forPatients: isTR ? 'Hastalar İçin' : 'For Patients',
    forAgencies: isTR ? 'Medikal Turizm Acenteleri İçin' : 'For Medical Tourism Agencies',
    forCompanies: isTR ? 'Şirketler İçin' : 'For Companies',
    popularTreatments: isTR ? 'Popüler Tedaviler' : 'Popular Treatments',
    hairTransplant: isTR ? 'Saç Ekimi' : 'Hair Transplant',
    dentalTreatment: isTR ? 'Diş Tedavisi' : 'Dental Treatment',
    cancerTreatment: isTR ? 'Kanser Tedavisi' : 'Cancer Treatment',
    contact: isTR ? 'İletişime Geçin' : 'Contact Us'
  };

  // Clean (extension-less) slugs per language, keyed by a stable page identifier.
  // '' means that language's homepage, served at /en/ or /tr/.
  const slugs = {
    en: {
      home: '',
      about: 'about-us',
      forPatients: 'for-patients',
      forAgencies: 'for-agencies',
      forCompanies: 'for-companies',
      contact: 'contact-us',
      contactForPatients: 'contact-for-patients',
      contactForAgencies: 'contact-for-agencies',
      contactForCompanies: 'contact-for-companies',
      privacy: 'aydinlatmametni',
      hairTransplant: 'hair-transplant',
      dentalTreatment: 'dental-treatment',
      cancerTreatment: 'cancer-treatment'
    },
    tr: {
      home: '',
      about: 'hakkımızda',
      forPatients: 'hastalar-için',
      forAgencies: 'sağlık-turizmi-acenteleri-için',
      forCompanies: 'şirketler-için',
      contact: 'iletişime-geçin',
      contactForPatients: 'hastalar-için-iletişim',
      contactForAgencies: 'acenteler-için-iletişim',
      contactForCompanies: 'şirketler-için-iletişim',
      privacy: 'aydinlatmametni_tr',
      hairTransplant: 'saç-ekimi',
      dentalTreatment: 'diş-tedavisi',
      cancerTreatment: 'kanser-tedavisi'
    }
  };

  // Build a relative href to `key` in `targetLang`, from a page rendered in `lang`.
  // Every page lives one level deep (either /en/... or /tr/...), so this stays simple.
  const hrefTo = (targetLang, key) => {
    const slug = slugs[targetLang][key] ?? '';
    if (targetLang === lang) return slug === '' ? './' : slug;
    return '../' + targetLang + '/' + slug;
  };

  const links = {
    home: hrefTo(lang, 'home'),
    about: hrefTo(lang, 'about'),
    forPatients: hrefTo(lang, 'forPatients'),
    forAgencies: hrefTo(lang, 'forAgencies'),
    forCompanies: hrefTo(lang, 'forCompanies'),
    hairTransplant: hrefTo(lang, 'hairTransplant'),
    dentalTreatment: hrefTo(lang, 'dentalTreatment'),
    cancerTreatment: hrefTo(lang, 'cancerTreatment'),
    contact: hrefTo(lang, 'contact')
  };

  const linkEN = hrefTo('en', pageKey);
  const linkTR = hrefTo('tr', pageKey);

  const html = `
<header class="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <a href="${links.home}">
      <img src="../img/${isTR ? 'ArtuntrW' : 'artun2'}.png" alt="${isTR ? 'Artun Sağlık Danışmanlığı Logosu' : 'Artun Consultancy Logo'}" class="h-7 w-auto md:h-8">
    </a>
    <nav class="hidden md:flex items-center space-x-6">
      <a href="${links.home}" class="text-gray-300 hover:text-white transition-colors duration-300">${texts.home}</a>
      <a href="${links.about}" class="text-gray-300 hover:text-white transition-colors duration-300">${texts.about}</a>
      <div class="dropdown relative">
        <button class="dropdown-toggle text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
          ${texts.services} <i class="fas fa-chevron-down ml-1 text-xs"></i>
        </button>
        <div class="dropdown-panel hidden absolute top-full left-0 mt-2 p-2 rounded-lg shadow-lg min-w-[240px] glassmorphism">
          <a href="${links.forPatients}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forPatients}</a>
          <a href="${links.forAgencies}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forAgencies}</a>
          <a href="${links.forCompanies}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forCompanies}</a>
        </div>
      </div>
      <div class="dropdown relative">
        <button class="dropdown-toggle text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
          ${texts.popularTreatments} <i class="fas fa-chevron-down ml-1 text-xs"></i>
        </button>
        <div class="dropdown-panel hidden absolute top-full left-0 mt-2 p-2 rounded-lg shadow-lg min-w-[240px] glassmorphism">
          <a href="${links.hairTransplant}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.hairTransplant}</a>
          <a href="${links.dentalTreatment}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.dentalTreatment}</a>
          <a href="${links.cancerTreatment}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.cancerTreatment}</a>
        </div>
      </div>
      <a href="${links.contact}" class="heartbeat-cta bg-[#59CDD1] bg-opacity-70 text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-md">${texts.contact}</a>
      <div class="lang-switcher text-gray-300 font-semibold space-x-2">
        <a href="${linkEN}" class="${!isTR ? 'text-[#59CDD1]' : ''}">ENG</a>
        <span>/</span>
        <a href="${linkTR}" class="${isTR ? 'text-[#59CDD1]' : ''}">TR</a>
      </div>
    </nav>
    <button id="mobile-menu-btn" class="menu-icon-pulse md:hidden text-2xl text-gray-400">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</header>
<nav id="mobile-menu" class="hidden md:hidden fixed top-16 left-0 w-full p-4 z-40 glassmorphism">
  <div class="flex flex-col space-y-2">
    <a href="${links.home}" class="text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.home}</a>
    <a href="${links.about}" class="text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.about}</a>
    <div>
      <button class="mobile-dropdown-toggle w-full text-white text-center py-2 hover:bg-gray-700/50 rounded-md flex items-center justify-center">
        ${texts.services} <i class="fas fa-chevron-down ml-1 text-xs"></i>
      </button>
      <div class="mobile-dropdown-panel hidden flex flex-col space-y-2 mt-2 px-4">
        <a href="${links.forPatients}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forPatients}</a>
        <a href="${links.forAgencies}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forAgencies}</a>
        <a href="${links.forCompanies}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forCompanies}</a>
      </div>
    </div>
    <div>
      <button class="mobile-dropdown-toggle w-full text-white text-center py-2 hover:bg-gray-700/50 rounded-md flex items-center justify-center">
        ${texts.popularTreatments} <i class="fas fa-chevron-down ml-1 text-xs"></i>
      </button>
      <div class="mobile-dropdown-panel hidden flex flex-col space-y-2 mt-2 px-4">
        <a href="${links.hairTransplant}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.hairTransplant}</a>
        <a href="${links.dentalTreatment}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.dentalTreatment}</a>
        <a href="${links.cancerTreatment}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.cancerTreatment}</a>
      </div>
    </div>
    <a href="${links.contact}" class="heartbeat-cta bg-[#59CDD1] bg-opacity-70 text-white text-center py-2 rounded-full hover:bg-opacity-90">${texts.contact}</a>
    <div class="flex justify-center space-x-2 pt-4 border-t border-gray-600/50 mt-2">
      <a href="${linkEN}" class="${!isTR ? 'text-[#59CDD1]' : 'text-gray-300 hover:text-white'}">ENG</a>
      <span class="text-gray-500">/</span>
      <a href="${linkTR}" class="${isTR ? 'text-[#59CDD1]' : 'text-gray-300 hover:text-white'}">TR</a>
    </div>
  </div>
</nav>
`;

  root.innerHTML = html;
}
