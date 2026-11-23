// components/head.js
document.addEventListener("DOMContentLoaded", () => {
    const measurementId = 'G-T8JV8K0B72';
    const preferenceKey = 'artun-analytics-choice';
    const trackingDisabled = 'ga-disable-' + measurementId;
    const isProduction = ['artunhealthcare.com', 'www.artunhealthcare.com'].includes(location.hostname);
    const translations = {
        en: ['Analytics preferences', 'Allow usage measurement? We use Google Analytics to understand visits and contact button clicks.', 'Allow analytics', 'Decline analytics'],
        tr: ['Analitik tercihleri', 'Site ziyaretlerini ve iletişim düğmesi tıklamalarını ölçmek için Google Analytics kullanımına izin veriyor musunuz?', 'Analitiğe izin ver', 'Analitiği reddet'],
        ru: ['Настройки аналитики', 'Разрешить Google Analytics измерять посещения сайта и нажатия на кнопки связи?', 'Разрешить аналитику', 'Отклонить аналитику'],
        az: ['Analitika seçimləri', 'Sayt ziyarətlərini və əlaqə düymələrinə klikləri ölçmək üçün Google Analytics istifadəsinə icazə verirsiniz?', 'Analitikaya icazə ver', 'Analitikanı rədd et']
    };
    const [title, explanation, allow, decline] = translations[document.documentElement.lang.split('-')[0]] || translations.en;
    const contactPaths = new Set([
        '/en/contact-us', '/en/contact-for-patients', '/en/contact-for-agencies', '/en/contact-for-companies',
        '/tr/iletişime-geçin', '/tr/hastalar-için-iletişim', '/tr/acenteler-için-iletişim', '/tr/şirketler-için-iletişim',
        '/ru/svyazatsya-s-nami', '/ru/kontakty-dlya-patsientov', '/ru/kontakty-dlya-agentstv', '/ru/kontakty-dlya-kompaniy',
        '/az/bizimle-elaqe', '/az/xestelar-ucun-elaqe', '/az/agentlikler-ucun-elaqe', '/az/sirketler-ucun-elaqe'
    ]);

    let choice = null;
    let started = false;
    try {
        choice = localStorage.getItem(preferenceKey);
    } catch {
        // The choice still applies to the current page when storage is unavailable.
    }

    function gtag() {
        window.dataLayer.push(arguments);
    }

    function startAnalytics() {
        if (!isProduction || choice !== 'allow') return;
        window[trackingDisabled] = false;
        if (started) return;
        started = true;
        window.dataLayer = window.dataLayer || [];
        gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
        gtag('js', new Date());
        const referrer = document.referrer ? new URL(document.referrer).origin : '';
        gtag('config', measurementId, {
            page_location: location.origin + location.pathname,
            page_referrer: referrer,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
        document.head.appendChild(script);
    }

    function stopAnalytics() {
        window[trackingDisabled] = true;
        if (!isProduction) return;
        // Remove this site's existing Analytics cookies when permission is declined.
        for (const cookie of document.cookie.split(';')) {
            const name = cookie.split('=')[0].trim();
            if (!/^_ga(?:_[A-Z0-9]+)?$/.test(name)) continue;
            const expired = name + '=; Max-Age=0; Path=/; Secure';
            document.cookie = expired;
            document.cookie = expired + '; Domain=artunhealthcare.com';
        }
    }

    const widget = document.createElement('div');
    widget.id = 'artun-analytics';
    const style = document.createElement('style');
    style.textContent = `
        #artun-analytics { position: fixed; bottom: 12px; left: 12px; z-index: 40; max-width: min(22rem, calc(100vw - 6.5rem)); color: #123339; font: 14px/1.4 system-ui, sans-serif; }
        #artun-analytics [hidden] { display: none !important; }
        #artun-analytics .analytics-panel { margin-bottom: 6px; padding: 10px 12px; border: 1px solid #9ac9cc; border-radius: 10px; background: #fff; box-shadow: 0 2px 10px #12333922; }
        #artun-analytics .analytics-panel p { margin: 0 0 8px; }
        #artun-analytics button { padding: 6px 9px; border: 1px solid #32747b; border-radius: 6px; background: #fff; color: #123339; cursor: pointer; }
        #artun-analytics .analytics-actions { display: flex; flex-wrap: wrap; gap: 6px; }
        #artun-analytics button:focus-visible { outline: 2px solid #123339; outline-offset: 2px; }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = title;
    toggle.setAttribute('aria-controls', 'artun-analytics-panel');
    const panel = document.createElement('section');
    panel.id = 'artun-analytics-panel';
    panel.className = 'analytics-panel';
    panel.setAttribute('aria-label', title);
    const message = document.createElement('p');
    message.textContent = explanation;
    const actions = document.createElement('div');
    actions.className = 'analytics-actions';

    function showPreferences(open) {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
    }

    function setChoice(value) {
        choice = value;
        try {
            localStorage.setItem(preferenceKey, value);
        } catch {
            // Storage failure does not grant consent on later pages.
        }
        if (choice === 'allow') startAnalytics();
        else stopAnalytics();
        showPreferences(false);
        toggle.focus();
    }

    for (const [label, value] of [[allow, 'allow'], [decline, 'decline']]) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => setChoice(value));
        actions.appendChild(button);
    }
    panel.append(message, actions);
    toggle.addEventListener('click', () => showPreferences(panel.hidden));
    widget.append(panel, toggle);
    document.body.appendChild(widget);
    showPreferences(choice !== 'allow' && choice !== 'decline');
    if (choice === 'allow') startAnalytics();
    else stopAnalytics();

    window.addEventListener('storage', (event) => {
        if (event.key !== preferenceKey && event.key !== null) return;
        choice = event.newValue;
        if (choice === 'allow') startAnalytics();
        else stopAnalytics();
        showPreferences(choice !== 'allow' && choice !== 'decline');
    });

    document.addEventListener('click', (event) => {
        if (!started || choice !== 'allow') return;
        const anchor = event.target.closest?.('a[href]');
        if (!anchor) return;
        const url = new URL(anchor.href);
        let name;
        if (url.protocol === 'tel:') name = 'contact_phone_click';
        else if (url.protocol === 'mailto:') name = 'contact_email_click';
        else if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) name = 'contact_whatsapp_click';
        else if (url.origin === location.origin) {
            let path;
            try {
                path = decodeURIComponent(url.pathname).replace(/(?:\.html|\/$)/, '');
            } catch {
                return;
            }
            if (contactPaths.has(path)) name = 'contact_page_click';
        }
        if (name) {
            gtag('event', name, {
                send_to: measurementId,
                page_location: location.origin + location.pathname
            });
        }
    });

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
