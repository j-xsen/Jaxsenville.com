import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import '../Page.css';
import { format } from "date-fns";

export default function Page() {
    const data = useData<Data>();
    
    // Always call useMetadata before any early returns
    const release = data.release;
    
    useMetadata({
        title: release ? `${release.name} by jaxsen | Jaxsenville` : 'Music | Jaxsenville',
        description: release ? `Listen to ${release.name} by Jaxsen. Stream the full album and explore the tracks.` : 'Listen to music by Jaxsen. Stream albums and explore tracks.',
        openGraph: release ? {
            images: release.cover,
            url: `https://jaxsenville.com/music/${release.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
        } : undefined,
    });
    
    if (!data.release) {
        return (
            <div className="inner">
                <h1>Album not found</h1>
                <p>The album you're looking for doesn't exist.</p>
            </div>
        );
    }

    const albumSlug = release ? release.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : '';
    const albumUrl = release ? `https://jaxsenville.com/music/${albumSlug}` : '';

    const schemaData = release ? {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        "name": release.name,
        "artist": { "@type": "MusicGroup", "name": "Jaxsen" },
        "datePublished": release.date.toISOString().split('T')[0],
        "image": release.cover,
        "track": release.tracks.map((track) => ({
            "@type": "MusicRecording",
            "name": track.name || `Track ${track.pos}`,
            "position": track.pos,
            "url": `https://jaxsenville.com/music/${albumSlug}/${(track.name || `track-${track.pos}`).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
        })),
        "url": albumUrl,
        ...(release.spotify && { "potentialAction": { "@type": "ListenAction", "target": release.spotify } })
    } : null;

    const breadcrumbs = release ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Jaxsenville", "item": "https://jaxsenville.com/" },
            { "@type": "ListItem", "position": 2, "name": "Music", "item": "https://jaxsenville.com/music" },
            { "@type": "ListItem", "position": 3, "name": release.name, "item": albumUrl }
        ]
    } : null;

    // Create URL-friendly slug from song name
    const createSongSlug = (songName: string) => {
        return songName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    return (
        <>
            {breadcrumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />}
            {schemaData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaData)
                    }}
                />
            )}
            <div className="inner">
                {release && (
                    <div className="album-panel">
                        <div className="album-content">
                            <div className="album-cover-section">
                                <img src={release.cover} alt={`${release.name} cover art`} className="album-cover-large" />
                                <h1>{release.name}</h1>
                                <p className="album-date">{`${format(release.date, "d MMMM u")}`}</p>
                                {release.spotify && (
                                    <a href={release.spotify} target="_blank" rel="noopener noreferrer" title={`Open ${release.name} on Spotify`} className="spotify-link">
                                        <img src="/icon/spotify.svg" className="icon" alt="Spotify logo"/>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="track-list-overlay">
                            <h2>Track List</h2>
                            <div className="track-list">
                                {release.tracks.map((track) => {
                                    const songSlug = createSongSlug(track.name || `track-${track.pos}`);
                                    return (
                                        <a 
                                            key={track.pos} 
                                            href={`/music/${release.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/${songSlug}`}
                                            className="track-item"
                                            title={`Listen to ${track.name}`}
                                        >
                                            <span className="track-number">{track.pos}.</span>
                                            <span className="track-name">{track.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 