import client from "../../../utils/contentful";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data() {
    // Fetch all releases
    const releases = await client.getEntries({
        content_type: "release",
        order: ["-fields.date"] as never,
        include: 2, // Include nested references
    });

    // Fetch all songs
    const songs = await client.getEntries({
        content_type: "song",
        include: 2,
    });

    // Fetch all bandcamp embeds
    const bandcampEmbeds = await client.getEntries({
        content_type: "bandcampEmbed",
        include: 2,
    });

    // Fetch all bandcamp albums
    const bandcampAlbums = await client.getEntries({
        content_type: "bandcampAlbum",
        include: 2,
    });

    return {
        path: "music",
        releases,
        songs,
        bandcampEmbeds,
        bandcampAlbums,
    };
} 