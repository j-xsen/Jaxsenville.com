import client from "../../../../utils/contentful";
import {ArtSkeleton} from "../types/ArtSkeleton.tsx";
import type {PageContext} from "vike/types";
import {urlize} from "../../../../utils/urlize";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
    const artTitle = pageContext.routeParams.artId;
    

    
    try {
        // Get all art pieces and find the one with matching URLized title
        const arts = await client.getEntries({
            content_type: "art",
        });
        
        const artPiece = arts.items.find(piece => {
            const title = piece.fields.title as string;
            return urlize(title) === artTitle;
        });
        
        if (!artPiece) {
            throw new Error(`Art piece with title "${artTitle}" not found`);
        }
        

        
        return {art: {items: [artPiece]}, path: "art"};
    } catch (error) {
        console.error('Error fetching art piece:', error);
        throw new Error(`Art piece with title "${artTitle}" not found`);
    }
} 