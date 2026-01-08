import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data.tsx";
import {format} from "date-fns";
import {urlize} from "../../../utils/urlize";

export default function Page() {
    useMetadata({
        title: "Art | Visual Works from Jaxsenville",
        description: "Browse a collection of Jaxsen's visual art. Explore paintings, digital art, and mixed media pieces that capture the essence of Jaxsenville's vibrant culture."
    })
    const data = useData<Data>();
    
    return (
        <>
            <div className="instagram-link-container" onMouseDown={()=>window.open("https://www.instagram.com/j_xsen/", "_blank")}>
                <a href="https://www.instagram.com/j_xsen/" target="_blank" className="instagram-link">
                    <img src="/icon/instagram.svg" className="icon" alt="Instagram logo"/>
                    @j_xsen
                </a>
            </div>
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
        </>
    )
}