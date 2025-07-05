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
        title: fields ? `${fields.title} | Art | Jaxsenville` : 'Art | Jaxsenville',
        description: fields ? `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.` : 'Art by Jaxsen',
        openGraph: {
            type: "article",
            title: fields ? `${fields.title} | Art | Jaxsenville` : 'Art | Jaxsenville',
            description: fields ? `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.` : 'Art by Jaxsen',
            images: imageUrl ? [imageUrl] : undefined,
        }
    })
    
    if (!artPiece?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Art piece not found.</h1>;
    }
    
    // JSON-LD Schema for the art piece
    const schema = fields ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": fields.title,
        "description": `${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.`,
        "creator": {
            "@type": "Person",
            "name": "Jaxsen Honeycutt"
        },
        "dateCreated": date,
        "genre": fields.media,
        "image": imageUrl,
        "url": currentUrl,
        "publisher": {
            "@type": "Organization",
            "name": "Jaxsenville",
            "url": "https://jaxsenville.com"
        }
    } : null;
    
    return (
        <>
            {schema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            )}
            <div className={"inner"}>
                <ArtPiece piece={artPiece as IArt} spot={0}/>
            </div>
        </>
    )
} 