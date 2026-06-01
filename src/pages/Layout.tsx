export {Layout};

import React, {StrictMode, useState} from "react";
import {useMetadata} from "vike-metadata-react";
import "./Layout.css";
import "../css/Gallery.css";
import HeaderImage from "../components/HeaderImage";
import WorldMap from "../components/WorldMap";

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
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <>
            <StrictMode>
                <header role={"banner"}>
                    <HeaderImage/>
                </header>
                <button
                    className="map-trigger"
                    onClick={() => setMapOpen(true)}
                    aria-label="Open world map"
                >
                    <img src="/map/map_closed.avif" alt="" draggable={false}/>
                </button>
                <main role={"main"}>
                    {children}
                </main>
                <nav aria-label="Jaxsenville locations" className="visually-hidden">
                    <a href="https://noise.jaxsenville.com">Noise Emporium</a>
                    <a href="https://museum.jaxsenville.com">Museum of Jaxsen</a>
                    <a href="https://clinic.jaxsenville.com">Philanthropy Clinic</a>
                </nav>
                <WorldMap open={mapOpen} onClose={() => setMapOpen(false)}/>
            </StrictMode>
        </>
    );
}
