import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import {ArtPiece} from '../components/ArtPiece.tsx';
import {IArt} from "../../../../types/contentful";
import {urlize} from "../../../../utils/urlize";

export default function Page() {
    const data = useData<Data>();
    
    const artPiece = data.art.items[0];
    
    // Always call useMetadata before any early returns
    const fields = artPiece?.fields as {
        title: string;
        date: string | Date;
        media: string;
        lowRez: { fields?: { file?: { url?: string } } };
    } | undefined;
    
    const date = fields ? (typeof fields.date === 'string' ? fields.date : String(fields.date)) : '';
    const imageUrl = fields?.lowRez?.fields?.file?.url;
    const currentUrl = fields ? `https://jaxsenville.com/art/${urlize(fields.title)}` : '';
    
    useMetadata({
        title: fields ? `${fields.title} by Jaxsen Honeycutt | Jaxsenville` : 'Art | Jaxsenville',
        description: fields ? `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.` : 'Art by Jaxsen',
        openGraph: {
            type: "article",
            title: fields ? `${fields.title} | Art | Jaxsenville` : 'Art | Jaxsenville',
            description: fields ? `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.` : 'Art by Jaxsen',
            images: imageUrl ? `https:${imageUrl}` : undefined,
            url: currentUrl || undefined,
        }
    })
    
    if (!artPiece?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Art piece not found.</h1>;
    }
    
    const schema = fields ? {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "name": fields.title,
        "description": `${fields.title} by Jaxsen Honeycutt - ${fields.media} created in ${new Date(date).getFullYear()}.`,
        "creator": { "@type": "Person", "@id": "https://jaxsenville.com/#jaxsen", "name": "Jaxsen Honeycutt" },
        "dateCreated": date,
        "artMedium": fields.media,
        ...(imageUrl && { "image": `https:${imageUrl}` }),
        "url": currentUrl,
    } : null;

    const breadcrumbs = fields ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Jaxsenville", "item": "https://jaxsenville.com/" },
            { "@type": "ListItem", "position": 2, "name": "Art", "item": "https://jaxsenville.com/art" },
            { "@type": "ListItem", "position": 3, "name": fields.title, "item": currentUrl }
        ]
    } : null;

    return (
        <>
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
            {breadcrumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />}
            <div className={"inner"}>
                <ArtPiece piece={artPiece as unknown as IArt} spot={0}/>
            </div>
        </>
    )
} 