import client from "../../../../utils/contentful";

export {onBeforePrerenderStart};

async function onBeforePrerenderStart() {
    const releases = await client.getEntries({
        content_type: "release",
        include: 2,
    });
    
    const albumURLs = releases.items?.map((release: { fields?: { name?: string } }) => {
        const name = release.fields?.name;
        if (!name) return null;
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
        return `/music/${slug}`;
    }).filter(Boolean);
    
    return albumURLs;
} 