import {useMetadata} from 'vike-metadata-react';
import ContactComponent from "./components/ContactComponent.tsx"
import './Page.css'

const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Reach the Mayor | Jaxsenville",
    "description": "Got ideas, collabs, or praise? Write to Mayor Jaxsen - the founder of Jaxsenville - and connect with the heart of this digital city.",
    "url": "https://jaxsenville.com/contact",
    "mainEntity": {
        "@type": "Person",
        "@id": "https://jaxsenville.com/#jaxsen",
        "name": "Jaxsen Honeycutt",
        "url": "https://jaxsenville.com/"
    }
};

export default function Page() {
    useMetadata({
        title: "Reach the Mayor | Jaxsenville",
        description: "Got ideas, collabs, or praise? Write to Mayor Jaxsen - the founder of Jaxsenville - and connect with the heart of this digital city.",
        openGraph: {
            type: "profile",
            firstName: "Jaxsen",
            lastName: "Honeycutt",
            gender: "male",
            url: "https://jaxsenville.com/contact",
            title: "Reach the Mayor | Jaxsenville",
            description: "Got ideas, collabs, or praise? Write to Mayor Jaxsen - the founder of Jaxsenville - and connect with the heart of this digital city.",
            images: "https://jaxsenville.com/images/jaxsenvillesign-608x.webp",
        }
    })
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className={"inner"}>
                <ContactComponent/>
            </div>
        </>
    )
}
