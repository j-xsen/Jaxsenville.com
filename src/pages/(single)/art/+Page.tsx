import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data.tsx";
import {format} from "date-fns";
import {urlize} from "../../../utils/urlize";

export default function Page() {
    useMetadata({
        title: "Art Gallery | Visual Works from Jaxsenville",
        description: "Browse the complete collection of Jaxsen's visual art. Each piece merges synthpop atmospheres with reflective color and texture."
    })
    const data = useData<Data>();
    
    return (
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
                                <img
                                    alt={fields.title}
                                    src={fields.lowRez?.fields?.file?.url || "/images/q.webp"}
                                    className="ArtPiece"
                                />
                                <h2>{fields.title}</h2>
                                <p>{format(fields.date, "MMMM yyyy")}</p>
                                <p>{fields.media}</p>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}