// google analytics
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
