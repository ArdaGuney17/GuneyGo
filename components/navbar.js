// components/navbar.js
function renderNavbar(lang = 'en', pageKey = 'home') {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  const LANGS = [
    { code: 'en', label: 'ENG' },
    { code: 'tr', label: 'TR' },
    { code: 'ru', label: 'RU' },
    { code: 'az', label: 'AZ' }
  ];

  const allTexts = {
    en: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      forPatients: 'For Patients',
      forAgencies: 'For Medical Tourism Agencies',
      forCompanies: 'For Companies',
      popularTreatments: 'Popular Treatments',
      hairTransplant: 'Hair Transplant',
      dentalTreatment: 'Dental Treatment',
      cancerTreatment: 'Cancer Treatment',
      contact: 'Contact Us',
      logoAlt: 'Artun Consultancy Logo'
    },
    tr: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      services: 'Hizmetlerimiz',
      forPatients: 'Hastalar İçin',
      forAgencies: 'Medikal Turizm Acenteleri İçin',
      forCompanies: 'Şirketler İçin',
      popularTreatments: 'Popüler Tedaviler',
      hairTransplant: 'Saç Ekimi',
      dentalTreatment: 'Diş Tedavisi',
      cancerTreatment: 'Kanser Tedavisi',
      contact: 'İletişime Geçin',
      logoAlt: 'Artun Sağlık Danışmanlığı Logosu'
    },
    ru: {
      home: 'Главная',
      about: 'О нас',
      services: 'Наши услуги',
      forPatients: 'Для пациентов',
      forAgencies: 'Для агентств медицинского туризма',
      forCompanies: 'Для компаний',
      popularTreatments: 'Популярные виды лечения',
      hairTransplant: 'Пересадка волос',
      dentalTreatment: 'Лечение зубов',
      cancerTreatment: 'Лечение рака',
      contact: 'Связаться с нами',
      logoAlt: 'Логотип Artun Healthcare Consultancy'
    },
    az: {
      home: 'Ana səhifə',
      about: 'Haqqımızda',
      services: 'Xidmətlərimiz',
      forPatients: 'Xəstələr üçün',
      forAgencies: 'Tibbi turizm agentlikləri üçün',
      forCompanies: 'Şirkətlər üçün',
      popularTreatments: 'Populyar müalicələr',
      hairTransplant: 'Saç əkimi',
      dentalTreatment: 'Diş müalicəsi',
      cancerTreatment: 'Xərçəng müalicəsi',
      contact: 'Bizimlə əlaqə',
      logoAlt: 'Artun Healthcare Consultancy loqosu'
    }
  };
  const texts = allTexts[lang] || allTexts.en;

  // Clean (extension-less) slugs per language, keyed by a stable page identifier.
  // '' means that language's homepage, served at /en/, /tr/, /ru/ or /az/.
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
    },
    ru: {
      home: '',
      about: 'o-nas',
      forPatients: 'dlya-patsientov',
      forAgencies: 'dlya-agentstv-meditsinskogo-turizma',
      forCompanies: 'dlya-kompaniy',
      contact: 'svyazatsya-s-nami',
      contactForPatients: 'kontakty-dlya-patsientov',
      contactForAgencies: 'kontakty-dlya-agentstv',
      contactForCompanies: 'kontakty-dlya-kompaniy',
      privacy: 'uvedomlenie-o-personalnyh-dannyh',
      hairTransplant: 'peresadka-volos',
      dentalTreatment: 'stomatologiya',
      cancerTreatment: 'lechenie-raka'
    },
    az: {
      home: '',
      about: 'haqqimizda',
      forPatients: 'xestelar-ucun',
      forAgencies: 'tibbi-turizm-agentlikleri-ucun',
      forCompanies: 'sirketler-ucun',
      contact: 'bizimle-elaqe',
      contactForPatients: 'xestelar-ucun-elaqe',
      contactForAgencies: 'agentlikler-ucun-elaqe',
      contactForCompanies: 'sirketler-ucun-elaqe',
      privacy: 'sexsi-melumatlar-bildirisi',
      hairTransplant: 'sac-ekimi',
      dentalTreatment: 'dis-mualicesi',
      cancerTreatment: 'xerceng-mualicesi'
    }
  };

  // Build a relative href to `key` in `targetLang`, from a page rendered in `lang`.
  // Every page lives one level deep (/en/..., /tr/..., /ru/... or /az/...), so this stays simple.
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

  // Each language has its own logo wording (tr / ru / az); anything else uses the English one.
  const logoFile = { tr: 'ArtuntrW', ru: 'artun_ru', az: 'artun_az' }[lang] || 'artun2';

  // Russian and Azerbaijani labels (and logos) are longer, so the full desktop menu only kicks in from
  // the xl breakpoint (1280px); below that those languages use the hamburger menu instead of squeezing the logo.
  // (Full class names are spelled out so Tailwind's scanner picks them up.)
  const wide = lang === 'ru' || lang === 'az';
  const desktopNavClass = wide
    ? 'hidden xl:flex items-center space-x-5 whitespace-nowrap'
    : 'hidden md:flex items-center space-x-6';
  const menuBtnClass = wide
    ? 'menu-icon-pulse xl:hidden text-2xl text-gray-400'
    : 'menu-icon-pulse md:hidden text-2xl text-gray-400';
  const mobileNavClass = wide
    ? 'hidden xl:hidden fixed top-16 left-0 w-full p-4 z-40 glassmorphism'
    : 'hidden md:hidden fixed top-16 left-0 w-full p-4 z-40 glassmorphism';

  const desktopLangSwitcher = LANGS
    .map((l) => `<a href="${hrefTo(l.code, pageKey)}" hreflang="${l.code}" class="${l.code === lang ? 'text-[#59CDD1]' : ''}">${l.label}</a>`)
    .join('\n        <span>/</span>\n        ');
  const mobileLangSwitcher = LANGS
    .map((l) => `<a href="${hrefTo(l.code, pageKey)}" hreflang="${l.code}" class="${l.code === lang ? 'text-[#59CDD1]' : 'text-gray-300 hover:text-white'}">${l.label}</a>`)
    .join('\n      <span class="text-gray-500">/</span>\n      ');

  const html = `
<header class="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <a href="${links.home}" class="${wide ? 'shrink min-w-0 mr-4' : ''}">
      <img src="../img/${logoFile}.png" alt="${texts.logoAlt}" class="h-7 w-auto md:h-8">
    </a>
    <nav class="${desktopNavClass}">
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
        ${desktopLangSwitcher}
      </div>
    </nav>
    <button id="mobile-menu-btn" class="${menuBtnClass}">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</header>
<nav id="mobile-menu" class="${mobileNavClass}">
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
      ${mobileLangSwitcher}
    </div>
  </div>
</nav>
`;

  root.innerHTML = html;
}
