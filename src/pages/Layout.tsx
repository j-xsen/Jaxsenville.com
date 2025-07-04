export {Layout};

import React, {StrictMode, Suspense} from "react";
import {useMetadata} from "vike-metadata-react";
import "./Layout.css";
import HeaderImage from "../components/HeaderImage";

useMetadata.setGlobalDefaults({
    title: "Jaxsenville",
    description:
        "Jaxsenville – An artistic haven by Jaxsen Honeycutt. Explore 7 experimental electronic tracks about love & happiness.",
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
            "Jaxsenville – An artistic haven by Jaxsen Honeycutt. Explore 7 experimental electronic tracks about love & happiness.",
    },
    publisher: "Jaxsen Honeycutt",
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
});

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <StrictMode>
                <Suspense fallback={<p>Loading...</p>}>
                    <HeaderImage/>
                    <div>{children}</div>
                </Suspense>
            </StrictMode>
        </>
    );
}
