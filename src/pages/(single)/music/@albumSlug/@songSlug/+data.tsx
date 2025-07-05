import client from "../../../../../utils/contentful";
import type {PageContext} from "vike/types";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
    const albumSlug = pageContext.routeParams.albumSlug;
    const songSlug = pageContext.routeParams.songSlug;
    

    
    // Fetch all releases to find the album
    const releases = await client.getEntries({
        content_type: "release",
        include: 2, // Include nested references
    });

    // Find the release that matches the album slug
    const release = releases.items.find((item: any) => {
        const name = item.fields?.name;
        if (!name) return false;
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
        return slug === albumSlug;
    });

    if (!release) {
        return {
            song: null,
            album: null
        };
    }

    // Find the song that matches the song slug
    const tracks = release.fields?.tracks as any[] || [];
    const song = tracks.find((track: any) => {
        const name = track.fields?.name;
        if (!name) return false;
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
        return slug === songSlug;
    });

    if (!song) {
        return {
            song: null,
            album: null
        };
    }

    // Fetch all bandcamp albums for ID mapping
    const bandcampAlbums = await client.getEntries({
        content_type: "bandcampAlbum",
        include: 2,
    });

    // Create a map of album IDs for quick lookup
    const albumMap = new Map();
    bandcampAlbums.items.forEach((album: any) => {
        albumMap.set(album.sys.id, {
            id: album.fields?.id || 0,
            url: album.fields?.url || "unknown"
        });
    });

    // Transform the album data
    const transformAlbum = (release: any) => {
        const coverUrl = release.fields?.cover?.fields?.file?.url;
        const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";
        
        return {
            name: String(release.fields?.name || "Unknown Release"),
            date: new Date(release.fields?.date || Date.now()),
            cover: coverImageUrl,
            spotify: String(release.fields?.spotify || ""),
            slug: albumSlug
        };
    };

    // Transform the song data
    const transformSong = (song: any) => {
        const embed = song.fields?.embed?.fields;
        const albumRef = embed?.album?.sys?.id;
        const albumData = albumRef ? albumMap.get(albumRef) : null;
        
        return {
            pos: song.fields?.pos || 0,
            name: song.fields?.name || "Unknown Track",
            embed: embed ? {
                track_id: embed.trackId || 0,
                name: embed.name || song.fields?.name || "Unknown Track",
                album: albumData ? {
                    id: albumData.id,
                    url: albumData.url
                } : undefined
            } : null
        };
    };

    return {
        path: "music",
        song: transformSong(song),
        album: transformAlbum(release)
    };
} 