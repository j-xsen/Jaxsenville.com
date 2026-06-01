import './Page.css'
import MenuButtons from './components/MenuButtons';
import {useMetadata} from 'vike-metadata-react';

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Jaxsenville",
        "url": "https://jaxsenville.com/",
        "description": "Step into Jaxsenville, the digital town created by Jaxsen Honeycutt. Explore original artwork, creative projects, blog posts, and ways to get in touch.",
        "author": {
            "@type": "Person",
            "@id": "https://jaxsenville.com/#jaxsen"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://jaxsenville.com/#jaxsen",
        "name": "Jaxsen Honeycutt",
        "url": "https://jaxsenville.com/",
        "sameAs": [
            "https://www.jxsen.com/"
        ],
        "jobTitle": "Artist",
        "knowsAbout": ["Music", "Digital Art", "Electronic Music"],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://jaxsenville.com/"
        }
    }
];

export default function Page() {
    useMetadata({
        title: "Jaxsenville | The Digital Town of Artist Jaxsen Honeycutt",
        description: "Step into Jaxsenville, the digital town created by Jaxsen Honeycutt. Explore original artwork, creative projects, blog posts, and ways to get in touch.",
        openGraph: { url: "https://jaxsenville.com/" },
    })
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <nav role={"navigation"}>
                <MenuButtons/>
            </nav>
        </>
    );
}
