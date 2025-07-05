// Defer Google Analytics loading to improve initial page load
const loadGoogleAnalytics = () => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-7V244LMYNT";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-7V244LMYNT");
    `;
    document.head.appendChild(script2);
};

// Load analytics after user interaction or after a delay
const loadAnalyticsOnInteraction = () => {
    // Load analytics after user scrolls or interacts
    const loadAnalytics = () => {
        loadGoogleAnalytics();
        document.removeEventListener('scroll', loadAnalytics);
        document.removeEventListener('click', loadAnalytics);
        document.removeEventListener('keydown', loadAnalytics);
    };
    
    document.addEventListener('scroll', loadAnalytics, { once: true, passive: true });
    document.addEventListener('click', loadAnalytics, { once: true, passive: true });
    document.addEventListener('keydown', loadAnalytics, { once: true, passive: true });
    
    // Fallback: load after 3 seconds if no interaction
    setTimeout(loadAnalytics, 3000);
};

// Start the analytics loading process
loadAnalyticsOnInteraction();

// favicon
const faviconLinks = [
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
    },
    {rel: "manifest", href: "/favicon/site.webmanifest"},
];

faviconLinks.forEach((linkData) => {
    const link = document.createElement("link");
    Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
    });
    document.head.appendChild(link);
});
