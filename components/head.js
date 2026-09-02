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
});
