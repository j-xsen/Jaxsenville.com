import {useMetadata} from 'vike-metadata-react';
import './Page.css'
import {useData} from "vike-react/useData";
import type {Data} from "./+data.tsx";
import {ArtPiece} from './components/ArtPiece.tsx';
import {IArt} from "../../../types/contentful";

export default function Page() {
    useMetadata({
        title: "Art | Jaxsenville",
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