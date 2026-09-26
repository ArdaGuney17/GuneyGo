// components/footer.js
function renderFooter(lang = 'en') {
  const root = document.getElementById('footer-root');
  if (!root) return;

  const isTR = lang === 'tr';

  const texts = {
    rights: isTR ? '© 2025 Artun Sağlık Hizmetleri Danışmanlığı. Tüm hakları saklıdır.' : '© 2025 Artun Healthcare Consultancy. All rights reserved.'
  };

  const html = `
<footer id="page-footer" class="bg-gray-900 text-white mt-auto border-t border-gray-800">
  <div class="container mx-auto px-4 py-5 flex flex-col sm:grid sm:grid-cols-3 items-center gap-3">
    <img src="../img/${isTR ? 'ArtuntrW' : 'artun2'}.png" alt="${isTR ? 'Artun Sağlık Danışmanlığı Logosu' : 'Artun Consultancy Logo'}" class="h-6 w-auto sm:justify-self-start">
    <a href="mailto:info@artunhealthcare.com" class="heartbeat-cta flex items-center gap-2 text-sm bg-[#59CDD1]/15 hover:bg-[#59CDD1] text-[#59CDD1] hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 hover:scale-105 sm:justify-self-center">
      <i class="fas fa-envelope"></i>
      <span>info@artunhealthcare.com</span>
    </a>
    <p class="text-xs text-gray-500 text-center sm:justify-self-end">${texts.rights}</p>
  </div>
</footer>
`;
  root.innerHTML = html;
}
