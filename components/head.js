// components/head.js
document.addEventListener("DOMContentLoaded", () => {
    // Add Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-T8JV8K0B72";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T8JV8K0B72');

    // Sitewide Organization structured data (Schema.org), for search engines.
    // We are a consultancy that coordinates care, not a clinic performing
    // procedures ourselves — "Organization" keeps that distinction accurate.
    if (!document.getElementById('org-structured-data')) {
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'org-structured-data';
        ld.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Artun Healthcare Consultancy",
            "alternateName": "Artun Sağlık Hizmetleri Danışmanlığı",
            "url": "https://artunhealthcare.com",
            "logo": "https://artunhealthcare.com/img/artun2.png",
            "description": "Independent healthcare consultancy coordinating medical tourism, hospital access and treatment planning in Turkey for international and domestic patients.",
            "founder": {
                "@type": "Person",
                "name": "Tahsin Güney"
            },
            "areaServed": "Turkey",
            "email": "info@artunhealthcare.com"
        });
        document.head.appendChild(ld);
    }
});
