import client from "../../../../utils/contentful";
import type {IRelease} from "../components/Release";
import type {PageContext} from "vike/types";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
    const albumSlug = pageContext.routeParams.albumSlug;
    

    
    // Fetch all releases to find the one matching the slug
    const releases = await client.getEntries({
        content_type: "release",
        include: 2, // Include nested references
    });

    // Find the release that matches the slug
    const release = releases.items.find((item: any) => {
        const name = item.fields?.name;
        if (!name) return false;
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
        
        // Also try exact name match as fallback
        const exactMatch = name.toLowerCase() === albumSlug;
        
        return slug === albumSlug || exactMatch;
    });

    if (!release) {
        return {
            release: null
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

    // Transform the release data
    const transformRelease = (release: any): IRelease => {
        // Extract cover image URL from Contentful
        const coverUrl = release.fields?.cover?.fields?.file?.url;
        const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";
        
        // Transform tracks if they exist
        const tracks = release.fields?.tracks?.map((track: any) => {
            const embed = track.fields?.embed?.fields;
            const albumRef = embed?.album?.sys?.id;
            const albumData = albumRef ? albumMap.get(albumRef) : null;
            
            return {
                pos: track.fields?.pos || 0,
                name: track.fields?.name || "Unknown Track",
                embed: embed ? {
                    track_id: embed.trackId || 0,
                    name: embed.name || track.fields?.name || "Unknown Track",
                    album: albumData ? {
                        id: albumData.id,
                        url: albumData.url
                    } : undefined
                } : null
            };
        }) || [];
        
        return {
            name: String(release.fields?.name || "Unknown Release"),
            date: new Date(release.fields?.date || Date.now()),
            cover: coverImageUrl,
            spotify: String(release.fields?.spotify || ""),
            tracks: tracks
        };
    };

    return {
        path: "music",
        release: transformRelease(release)
    };
} 