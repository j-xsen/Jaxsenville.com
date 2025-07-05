import type { PageContext } from "vike/types";
import { contentfulService } from "../../../../../services/contentful-service";
import { 
  findReleaseBySlug, 
  findTrackBySlug,
  createAlbumMap, 
  transformTrack 
} from "../../../../../utils/transformers";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
  const albumSlug = pageContext.routeParams.albumSlug;
  const songSlug = pageContext.routeParams.songSlug;

  // Fetch all releases and bandcamp albums
  const [releasesResponse, bandcampAlbumsResponse] = await Promise.all([
    contentfulService.getReleases(),
    contentfulService.getBandcampAlbums()
  ]);

  // Find the release that matches the album slug
  const release = findReleaseBySlug(releasesResponse.items, albumSlug);

  if (!release) {
    return {
      song: null,
      album: null
    };
  }

  // Find the song that matches the song slug
  const tracks = release.fields.tracks || [];
  const song = findTrackBySlug(tracks, songSlug);

  if (!song) {
    return {
      song: null,
      album: null
    };
  }

  // Create album map for track transformation
  const albumMap = createAlbumMap(bandcampAlbumsResponse.items);

  // Transform the album data
  const transformAlbum = (release: any) => {
    const coverUrl = release.fields.cover.fields.file.url;
    const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";
    
    return {
      name: release.fields.name,
      date: new Date(release.fields.date),
      cover: coverImageUrl,
      spotify: release.fields.spotify,
      slug: albumSlug
    };
  };

  // Transform the song data
  const transformSong = (song: any) => {
    return transformTrack(song, albumMap);
  };

  return {
    path: "music",
    song: transformSong(song),
    album: transformAlbum(release)
  };
} 