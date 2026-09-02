// components/footer.js
function renderFooter(lang = 'en') {
  const root = document.getElementById('footer-root');
  if (!root) return;

  const isTR = lang === 'tr';

  const texts = {
    contact: isTR ? 'Bize Ulaşın' : 'Contact Us',
    email: isTR ? 'E-posta' : 'Email',
    rights: isTR ? '© 2025 Artun Sağlık Hizmetleri Danışmanlığı. Tüm hakları saklıdır.' : '© 2025 Artun Healthcare Consultancy. All rights reserved.'
  };

  const html = `
<footer id="page-footer" class="bg-gray-900 text-white pt-8 mt-auto">
  <div class="container mx-auto px-4">
    <div class="bg-[#59CDD1] rounded-2xl shadow-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
        <h3 class="text-2xl font-bold tracking-wide">${texts.contact}</h3>
        <a href="mailto:artunhcc@gmail.com" class="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-3 rounded-xl shadow-md hover:scale-105 hover:bg-orange-500 hover:text-white transition">
          <i class="fas fa-envelope text-xl"></i><span class="font-semibold">${texts.email}</span>
        </a>
      </div>
    </div>
    <div class="border-b border-gray-700 pb-8 mb-6 flex justify-center items-center">
      <img src="../img/artun2.png" alt="Artun Consultancy Logo" class="h-7 w-auto md:h-10">
    </div>
    <div class="text-center text-gray-500 text-sm py-4">
      <p>${texts.rights}</p>
    </div>
  </div>
</footer>
`;
  root.innerHTML = html;
}
