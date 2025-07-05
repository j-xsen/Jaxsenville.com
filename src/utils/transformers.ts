import type { IRelease } from "../pages/(single)/music/components/Release";
import type { ContentfulRelease, ContentfulTrack, ContentfulBandcampAlbum } from "../types/contentful-response";

export function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
}

export function createAlbumMap(bandcampAlbums: ContentfulBandcampAlbum[]): Map<string, { id: number; url: string }> {
  const albumMap = new Map();
  bandcampAlbums.forEach((album) => {
    albumMap.set(album.sys.id, {
      id: album.fields.id,
      url: album.fields.url
    });
  });
  return albumMap;
}

export function transformTrack(track: ContentfulTrack, albumMap: Map<string, { id: number; url: string }>) {
  const embed = track.fields.embed?.fields;
  const albumRef = embed?.album?.sys?.id;
  const albumData = albumRef ? albumMap.get(albumRef) : null;
  
  return {
    pos: track.fields.pos,
    name: track.fields.name || "Unknown Track",
    embed: embed ? {
      track_id: embed.trackId,
      name: embed.name || track.fields.name || "Unknown Track",
      album: albumData ? {
        id: albumData.id,
        url: albumData.url
      } : undefined
    } : undefined
  };
}

export function transformReleaseData(
  release: ContentfulRelease, 
  albumMap: Map<string, { id: number; url: string }>
): IRelease {
  const coverUrl = release.fields.cover.fields.file.url;
  const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";
  
  const tracks = release.fields.tracks?.map((track) => 
    transformTrack(track, albumMap)
  ) || [];
  
  return {
    name: release.fields.name,
    date: new Date(release.fields.date),
    cover: coverImageUrl,
    spotify: release.fields.spotify,
    tracks: tracks
  };
}

export function findReleaseBySlug(releases: ContentfulRelease[], albumSlug: string): ContentfulRelease | undefined {
  return releases.find((release) => {
    const slug = createSlug(release.fields.name);
    const exactMatch = release.fields.name.toLowerCase() === albumSlug;
    return slug === albumSlug || exactMatch;
  });
}

export function findTrackBySlug(tracks: ContentfulTrack[], songSlug: string): ContentfulTrack | undefined {
  return tracks.find((track) => {
    const slug = createSlug(track.fields.name);
    return slug === songSlug;
  });
} 