import client from "../../../../utils/contentful";
import {urlize} from "../../../../utils/urlize";

export {onBeforePrerenderStart};

async function onBeforePrerenderStart() {
    const artPieces = await client.getEntries({
        content_type: "art",
    });
    const artURLs = artPieces.items?.map(
        (piece) => `/art/${urlize(piece.fields.title as string)}`
    );
    return artURLs;
} 