import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data.tsx";
import {ArtPiece} from './components/ArtPiece.tsx';
import {IArt} from "../../../types/contentful";

export default function Page() {
    useMetadata({
        title: "Art | Visual Works from Jaxsenville",
        description: "Stroll through a gallery of memory and mood. Jaxsen's visual art merges synthpop atmospheres with reflective color and texture."
    })
    const data = useData<Data>();
    return (
        <div className={"inner"}>
            {data.arts.items.map((piece, spot) => {
                return (
                    <ArtPiece key={piece.sys.id} piece={piece as IArt} spot={spot}/>
                )
            })}
        </div>
    )
}