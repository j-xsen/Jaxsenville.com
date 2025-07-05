import client from "../../../../../utils/contentful";

export {onBeforePrerenderStart};

async function onBeforePrerenderStart() {
    const releases = await client.getEntries({
        content_type: "release",
        include: 2,
    });
    
    const songURLs: string[] = [];
    
    releases.items?.forEach((release: any) => {
        const albumName = release.fields?.name;
        if (!albumName) return;
        
        const albumSlug = albumName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
        const tracks = release.fields?.tracks as any[] || [];
        
        tracks.forEach((track: any) => {
            const trackName = track.fields?.name;
            if (!trackName) return;
            
            const songSlug = trackName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
            songURLs.push(`/music/${albumSlug}/${songSlug}`);
        });
    });
    
    return songURLs;
} 