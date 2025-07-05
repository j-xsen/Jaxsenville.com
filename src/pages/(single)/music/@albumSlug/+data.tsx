import type { PageContext } from "vike/types";
import { contentfulService } from "../../../../services/contentful-service";
import { 
  findReleaseBySlug, 
  createAlbumMap, 
  transformReleaseData 
} from "../../../../utils/transformers";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
  const albumSlug = pageContext.routeParams.albumSlug;

  // Fetch all releases and bandcamp albums
  const [releasesResponse, bandcampAlbumsResponse] = await Promise.all([
    contentfulService.getReleases(),
    contentfulService.getBandcampAlbums()
  ]);

  // Find the release that matches the slug
  const release = findReleaseBySlug(releasesResponse.items, albumSlug);

  if (!release) {
    return {
      release: null
    };
  }

  // Create album map for track transformation
  const albumMap = createAlbumMap(bandcampAlbumsResponse.items);

  // Transform the release data
  const transformedRelease = transformReleaseData(release, albumMap);

  return {
    path: "music",
    release: transformedRelease
  };
} 