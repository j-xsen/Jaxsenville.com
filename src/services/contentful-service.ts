import client from "../utils/contentful";
import type { 
  ContentfulRelease, 
  ContentfulBandcampAlbum, 
  ContentfulArt, 
  ContentfulBlahg,
  ContentfulResponse 
} from "../types/contentful-response";
import { handleContentfulError, logError } from "../utils/error-handler";

export class ContentfulService {
  async getReleases(): Promise<ContentfulResponse<ContentfulRelease>> {
    try {
      const response = await client.getEntries({
        content_type: "release",
        include: 2,
      });
      return response as unknown as ContentfulResponse<ContentfulRelease>;
    } catch (error) {
      logError(error, "releases");
      handleContentfulError(error, "releases");
    }
  }

  async getBandcampAlbums(): Promise<ContentfulResponse<ContentfulBandcampAlbum>> {
    try {
      const response = await client.getEntries({
        content_type: "bandcampAlbum",
        include: 2,
      });
      return response as unknown as ContentfulResponse<ContentfulBandcampAlbum>;
    } catch (error) {
      logError(error, "bandcamp albums");
      handleContentfulError(error, "bandcamp albums");
    }
  }

  async getArtPieces(): Promise<ContentfulResponse<ContentfulArt>> {
    try {
      const response = await client.getEntries({
        content_type: "art",
      });
      return response as unknown as ContentfulResponse<ContentfulArt>;
    } catch (error) {
      logError(error, "art pieces");
      handleContentfulError(error, "art pieces");
    }
  }

  async getBlahgPosts(): Promise<ContentfulResponse<ContentfulBlahg>> {
    try {
      const response = await client.getEntries({
        content_type: "blahg",
      });
      return response as unknown as ContentfulResponse<ContentfulBlahg>;
    } catch (error) {
      logError(error, "blahg posts");
      handleContentfulError(error, "blahg posts");
    }
  }
}

export const contentfulService = new ContentfulService(); 