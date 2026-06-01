import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data.tsx";
import {format} from "date-fns";
import {urlize} from "../../../utils/urlize";
import {parseLocalDate} from "../../../utils/transformers.ts";

export default function Page() {
    useMetadata({
        title: "Visual Art by Jaxsen Honeycutt | Jaxsenville",
        description: "Browse a collection of Jaxsen's visual art. Explore paintings, digital art, and mixed media pieces that capture the essence of Jaxsenville's vibrant culture.",
        openGraph: { url: "https://jaxsenville.com/art" },
    })
    const data = useData<Data>();

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Visual Art by Jaxsen Honeycutt",
        "description": "Browse a collection of Jaxsen's visual art. Explore paintings, digital art, and mixed media pieces that capture the essence of Jaxsenville's vibrant culture.",
        "url": "https://jaxsenville.com/art",
        "author": {
            "@type": "Person",
            "@id": "https://jaxsenville.com/#jaxsen",
            "name": "Jaxsen Honeycutt"
        },
        "hasPart": data.arts.items.map((piece) => {
            const f = piece.fields as { title: string; date: string | Date; media: string; lowRez: { fields?: { file?: { url?: string } } } };
            const imgUrl = f.lowRez?.fields?.file?.url;
            return {
                "@type": "VisualArtwork",
                "name": f.title,
                "url": `https://jaxsenville.com/art/${urlize(f.title)}`,
                "artMedium": f.media,
                ...(imgUrl && { "image": `https:${imgUrl}` }),
                "creator": { "@type": "Person", "name": "Jaxsen Honeycutt" }
            };
        })
    };

    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="art-gallery">
            {data.arts.items.map((piece, spot) => {
                const fields = piece.fields as {
                    title: string;
                    date: string | Date;
                    media: string;
                    lowRez: { fields?: { file?: { url?: string } } };
                };
                
                return (
                    <div key={piece.sys.id} className="art-gallery-item">
                        <a href={`/art/${urlize(fields.title)}`} className="art-link">
                            <div className={`Frame${spot == 0 ? " Frame0" : ""}`}>
                                <img alt={fields.title}
                                    src={fields.lowRez?.fields?.file?.url || "/images/q.webp"}
                                    className="ArtPiece"
                                     loading={"lazy"}
                                />
                                <h2>{fields.title}</h2>
                                <p>{format(parseLocalDate(fields.date), "MMMM yyyy")}</p>
                                <p>{fields.media}</p>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
        </>
    )
}