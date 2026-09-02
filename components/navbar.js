// components/navbar.js
function renderNavbar(lang = 'en') {
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
    contact: isTR ? 'İletişime Geçin' : 'Contact Us'
  };

  const links = {
    home: isTR ? 'ana-sayfa.html' : 'index.html',
    about: isTR ? 'hakkımızda.html' : 'about-us.html',
    forPatients: isTR ? 'hastalar-için.html' : 'for-patients.html',
    forAgencies: isTR ? 'sağlık-turizmi-acenteleri-için.html' : 'for-agencies.html',
    forCompanies: isTR ? 'şirketler-için.html' : 'for-companies.html',
    contact: isTR ? 'iletişime-geçin.html' : 'contact-us.html'
  };

  const path = window.location.pathname;
  let currentPage = path.split('/').pop() || (isTR ? 'ana-sayfa.html' : 'index.html');
  
  const pageMap = {
    'index.html': 'ana-sayfa.html',
    'about-us.html': 'hakkımızda.html',
    'for-patients.html': 'hastalar-için.html',
    'for-agencies.html': 'sağlık-turizmi-acenteleri-için.html',
    'for-companies.html': 'şirketler-için.html',
    'contact-us.html': 'iletişime-geçin.html',
    'contact-for-patients.html': 'hastalar-için-iletişim.html',
    'contact-for-agencies.html': 'acenteler-için-iletişim.html',
    'contact-for-companies.html': 'şirketler-için-iletişim.html',
    'aydinlatmametni.html': 'aydinlatmametni_tr.html'
  };
  
  const reverseMap = {};
  for (const [en, tr] of Object.entries(pageMap)) {
    reverseMap[tr] = en;
  }
  
  const linkEN = isTR ? '../en/' + (reverseMap[currentPage] || 'index.html') : currentPage;
  const linkTR = isTR ? currentPage : '../tr/' + (pageMap[currentPage] || 'ana-sayfa.html');

  const html = `
<header class="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <a href="${links.home}">
      <img src="../img/artun2.png" alt="Artun Consultancy Logo" class="h-7 w-auto md:h-8">
    </a>
    <nav class="hidden md:flex items-center space-x-6">
      <a href="${links.home}" class="text-gray-300 hover:text-white transition-colors duration-300">${texts.home}</a>
      <a href="${links.about}" class="text-gray-300 hover:text-white transition-colors duration-300">${texts.about}</a>
      <div class="dropdown relative">
        <button id="services-toggle" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
          ${texts.services} <i class="fas fa-chevron-down ml-1 text-xs"></i>
        </button>
        <div id="services-menu" class="hidden absolute top-full left-0 mt-2 p-2 rounded-lg shadow-lg min-w-[240px] glassmorphism">
          <a href="${links.forPatients}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forPatients}</a>
          <a href="${links.forAgencies}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forAgencies}</a>
          <a href="${links.forCompanies}" class="block text-white px-4 py-2 hover:bg-gray-700/50 rounded-md">${texts.forCompanies}</a>
        </div>
      </div>
      <a href="${links.contact}" class="bg-[#59CDD1] bg-opacity-70 text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-md">${texts.contact}</a>
      <div class="lang-switcher text-gray-300 font-semibold space-x-2">
        <a href="${linkEN}" class="${!isTR ? 'text-[#59CDD1]' : ''}">ENG</a>
        <span>/</span>
        <a href="${linkTR}" class="${isTR ? 'text-[#59CDD1]' : ''}">TR</a>
      </div>
    </nav>
    <button id="mobile-menu-btn" class="md:hidden text-2xl text-gray-400">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</header>
<nav id="mobile-menu" class="hidden md:hidden fixed top-16 left-0 w-full p-4 z-40 glassmorphism">
  <div class="flex flex-col space-y-2">
    <a href="${links.home}" class="text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.home}</a>
    <a href="${links.about}" class="text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.about}</a>
    <div>
      <button id="mobile-services-toggle" class="w-full text-white text-center py-2 hover:bg-gray-700/50 rounded-md flex items-center justify-center">
        ${texts.services} <i class="fas fa-chevron-down ml-1 text-xs"></i>
      </button>
      <div id="mobile-services-dropdown" class="hidden flex-col space-y-2 mt-2 px-4">
        <a href="${links.forPatients}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forPatients}</a>
        <a href="${links.forAgencies}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forAgencies}</a>
        <a href="${links.forCompanies}" class="block text-sm text-gray-300 hover:text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.forCompanies}</a>
      </div>
    </div>
    <a href="${links.contact}" class="text-white text-center py-2 hover:bg-gray-700/50 rounded-md">${texts.contact}</a>
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
