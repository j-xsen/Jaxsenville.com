import type { PageContext } from "vike/types";
import { contentfulService } from "../../../../services/contentful-service";
import { urlize } from "../../../../utils/urlize";
import { logError } from "../../../../utils/error-handler";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
  const artTitle = pageContext.routeParams.artId;

  try {
    // Get all art pieces and find the one with matching URLized title
    const artsResponse = await contentfulService.getArtPieces();
    
    const artPiece = artsResponse.items.find(piece => {
      const title = piece.fields.title;
      return urlize(title) === artTitle;
    });
    
    if (!artPiece) {
      throw new Error(`Art piece with title "${artTitle}" not found`);
    }
    
    return { art: { items: [artPiece] }, path: "art" };
  } catch (error) {
    logError(error, "art piece");
    throw new Error(`Art piece with title "${artTitle}" not found`);
  }
} 