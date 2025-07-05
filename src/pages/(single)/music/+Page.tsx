import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import './Page.css';

export default function Page() {
    useMetadata({
        title: "Music | Listen to the Jaxsenville EP",
        description: "Experience the sonic soul of Jaxsenville. Stream Jaxsen's indie-electronic EP and explore the sounds behind the city's digital landscape."
    });

    const data = useData<Data>();

    // Transform releases to album gallery format
    const transformAlbum = (release: any) => {
        // Extract cover image URL from Contentful
        const coverUrl = release.fields?.cover?.fields?.file?.url;
        const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";
        
        // Create URL-friendly slug from album name
        const slug = release.fields?.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';

        
        return {
            id: release.sys.id,
            name: String(release.fields?.name || "Unknown Release"),
            date: new Date(release.fields?.date || Date.now()),
            cover: coverImageUrl,
            spotify: String(release.fields?.spotify || ""),
            slug: slug
        };
    };

    return (
        <div className={"inner"}>
            <div className="album-gallery">
                {data.releases.items.map((release, index) => {
                    const album = transformAlbum(release);
                    return (
                        <a 
                            key={album.id} 
                            href={`/music/${album.slug}`}
                            className="album-card"
                            title={`View ${album.name} tracklist`}
                        >
                            <div className="album-cover">
                                <img src={album.cover} alt={`${album.name} cover art`} />
                            </div>
                            <div className="album-info">
                                <h2>{album.name}</h2>
                                <p className="album-date">{album.date.toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}