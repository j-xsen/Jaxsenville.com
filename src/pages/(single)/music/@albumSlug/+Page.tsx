import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import '../Page.css';

export default function Page() {
    const data = useData<Data>();
    
    if (!data.release) {
        return (
            <div className="inner">
                <h1>Album not found</h1>
                <p>The album you're looking for doesn't exist.</p>
            </div>
        );
    }

    const release = data.release;
    
    useMetadata({
        title: `${release.name} | Music`,
        description: `Listen to ${release.name} by Jaxsen. Stream the full album and explore the tracks.`
    });

    // Add JSON-LD schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        "name": release.name,
        "artist": {
            "@type": "MusicGroup",
            "name": "Jaxsen"
        },
        "datePublished": release.date.toISOString().split('T')[0],
        "image": release.cover,
        "track": release.tracks.map((track) => ({
            "@type": "MusicRecording",
            "name": track.name || `Track ${track.pos}`,
            "position": track.pos,
            "url": `/music/${release.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/${(track.name || `track-${track.pos}`).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
        })),
        "url": `/music/${release.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
        ...(release.spotify && {
            "potentialAction": {
                "@type": "ListenAction",
                "target": release.spotify
            }
        })
    };

    // Create URL-friendly slug from song name
    const createSongSlug = (songName: string) => {
        return songName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData)
                }}
            />
            <div className="inner">
                <div className="album-panel">
                    <div className="album-content">
                        <div className="album-cover-section">
                            <img src={release.cover} alt={`${release.name} cover art`} className="album-cover-large" />
                            <h1>{release.name}</h1>
                            <p className="album-date">{release.date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                            {release.spotify && (
                                <a href={release.spotify} target="_blank" title={`Open ${release.name} on Spotify`} className="spotify-link">
                                    <img src="/icon/spotify.svg" className="icon" title="Spotify logo" alt="Spotify logo"/>
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
            </div>
        </>
    );
} 