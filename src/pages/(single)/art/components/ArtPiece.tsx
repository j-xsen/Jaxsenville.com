import {ArtSkeletonFields} from "../types/ArtSkeleton.tsx";
import {format} from "date-fns";

export function ArtPiece({ piece, spot = 1 }: { piece: ArtSkeletonFields, spot?: number }) {
    return(
        <>
            <div className={`Frame${ spot == 0 ? " Frame0" : "" }`}>
                <img alt={String(piece.fields.title)} src={String(piece.fields.lowRez.fields?.file?.url)} className="ArtPiece"/>
                <h1>{String(piece.fields.title)}</h1>
                <p>{format(String(piece.fields.date),"MMMM yyyy")}</p>
                <p>{String(piece.fields.media)}</p>
            </div>
        </>
    )
}
