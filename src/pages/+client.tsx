// Umami analytics
const script = document.createElement("script");
script.defer = true;
script.src = "https://umami-psi-inky.vercel.app/script.js";
script.setAttribute("data-website-id", "1fc07c3f-0220-4e23-aaba-d8d50f371a47");
document.head.appendChild(script);

// Preload critical fonts for mobile
const preloadFonts = () => {
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.href = "/Monotony-Regular.woff2";
    fontLink.as = "font";
    fontLink.type = "font/woff2";
    fontLink.crossOrigin = "anonymous";
    document.head.appendChild(fontLink);
};

// Preload fonts immediately
preloadFonts();

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
