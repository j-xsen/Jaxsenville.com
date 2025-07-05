import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import {ArtPiece} from '../components/ArtPiece.tsx';
import {IArt} from "../../../../types/contentful";

export default function Page() {
    const data = useData<Data>();
    
    const artPiece = data.art.items[0];
    
    if (!artPiece?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Art piece not found.</h1>;
    }
    
    const fields = artPiece.fields as {
        title: string;
        date: string | Date;
        media: string;
        lowRez: any;
    };
    
    const date = typeof fields.date === 'string' ? fields.date : String(fields.date);
    const imageUrl = fields.lowRez?.fields?.file?.url;
    
    useMetadata({
        title: `${fields.title} | Art | Jaxsenville`,
        description: `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.`,
        openGraph: {
            type: "article",
            title: `${fields.title} | Art | Jaxsenville`,
            description: `View ${fields.title} by Jaxsen - ${fields.media} created in ${new Date(date).getFullYear()}.`,
            images: imageUrl ? [imageUrl] : undefined,
        }
    })
    
    // JSON-LD Schema for the art piece
    const schema = {
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
        "url": typeof window !== 'undefined' ? window.location.href : undefined,
        "publisher": {
            "@type": "Organization",
            "name": "Jaxsenville",
            "url": "https://jaxsenville.com"
        }
    };
    
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className={"inner"}>
                <ArtPiece piece={artPiece as IArt} spot={0}/>
            </div>
        </>
    )
} 