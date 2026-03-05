export {Layout};

import React, {StrictMode, Suspense} from "react";
import {useMetadata} from "vike-metadata-react";
import "./Layout.css";
import "../css/Gallery.css";
import HeaderImage from "../components/HeaderImage";

useMetadata.setGlobalDefaults({
    title: "Jaxsenville",
    description:
        "Step into Jaxsenville, the digital town created by Jaxsen Honeycutt. Explore original artwork, creative projects, blog posts, and ways to get in touch.",
    authors: {name: "Jaxsen Honeycutt", url: "https://www.jxsen.com/"},
    keywords: [
        "jaxsenville",
        "jaxsen",
        "blahg",
        "louisville artist"
    ],
    robots: "index, follow",
    applicationName: "Jaxsenville",
    openGraph: {
        type: "website",
        url: "https://jaxsenville.com/",
        siteName: "Jaxsenville",
        locale: "en_US",
        images: "https://jaxsenville.com/images/jaxsenvillesign-608x.webp",
        description:
            "Step into Jaxsenville, the digital town created by Jaxsen Honeycutt. Explore original artwork, creative projects, blog posts, and ways to get in touch.",
    },
    publisher: "Jaxsen Honeycutt",
    viewport: {
        width: "device-width",
        initialScale: 1,
    }
});

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <StrictMode>
                <Suspense fallback={<p>Loading...</p>}>
                    <header role={"banner"}>
                        <HeaderImage/>
                    </header>
                    <main role={"main"}>
                    {children}
                    </main>
                </Suspense>
            </StrictMode>
        </>
    );
}
