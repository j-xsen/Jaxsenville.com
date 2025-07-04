export {Layout};

import React, {StrictMode, Suspense} from "react";
import {useMetadata} from "vike-metadata-react";
import "./Layout.css";
import HeaderImage from "../components/HeaderImage";
import { BlahgPostProvider, useBlahgPost } from "../context/BlahgPostContext";

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
        <BlahgPostProvider>
            <LayoutContent children={children} />
        </BlahgPostProvider>
    );
}

function LayoutContent({children}: { children: React.ReactNode }) {
    const { blahgPost } = useBlahgPost();
    return (
        <>
            <StrictMode>
                <script type="application/ld+json">
                    {JSON.stringify(
                        blahgPost ? {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": blahgPost.title,
                            "datePublished": blahgPost.created_at,
                            "url": `https://jaxsenville.com/blahg/${blahgPost.url}`,
                            "author": {
                                "@type": "Person",
                                "name": "Jaxsen Honeycutt",
                                "url": "https://www.jxsen.com/"
                            },
                            "publisher": {
                                "@type": "Person",
                                "name": "Jaxsen Honeycutt",
                                "url": "https://www.jxsen.com/"
                            },
                            "description": blahgPost.content.substring(0, 150) + "...",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `https://jaxsenville.com/blahg/${blahgPost.url}`
                            }
                        } : {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "Jaxsenville",
                            "url": "https://jaxsenville.com/",
                            "author": {
                                "@type": "Person",
                                "name": "Jaxsen Honeycutt",
                                "url": "https://www.jxsen.com/"
                            },
                            "description": "Jaxsenville – An artistic haven by Jaxsen Honeycutt. Explore 7 experimental electronic tracks about love & happiness."
                        }
                    )}
                </script>
                <Suspense fallback={<p>Loading...</p>}>
                    <HeaderImage/>
                    <div>{children}</div>
                </Suspense>
            </StrictMode>
        </>
    );
}
