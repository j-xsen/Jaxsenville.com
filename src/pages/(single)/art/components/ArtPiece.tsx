import {format} from "date-fns";
import {Asset} from "contentful";
import qUrl from "/images/q.webp"
import {IArt} from "../../../../../@types/generated/contentful";
import {ArtSkeleton} from "../types/ArtSkeleton";

export function ArtPiece({piece, spot = 1}: { piece: IArt | ArtSkeleton, spot?: number }) {
    const getUrl = (asset: Asset | undefined): string => {
        if (asset && asset.fields && asset.fields.file) {
            return String(asset.fields.file.url);
        }
        return qUrl;
    }

    const fields = piece.fields as {
        title: string;
        date: string | Date;
        media: string;
        lowRez: Asset;
    };

    return (
        <>
            <div className={`Frame${spot == 0 ? " Frame0" : ""}`}>
                <img
                    alt={fields.title}
                    src={getUrl(fields.lowRez)}
                    className="ArtPiece "
                />
                <h1>{fields.title}</h1>
                <p>{format(fields.date, "MMMM yyyy")}</p>
                <p>{fields.media}</p>
            </div>
        </>
    )
}
