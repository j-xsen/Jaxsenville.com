import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import {useState, useEffect, useRef} from "react";
import '../../Page.css';
import {ClientOnly} from "vike-react/ClientOnly";
import BandcampEmbed from "../../components/BandcampEmbed.tsx";

export default function Page() {
    const data = useData<Data>();
    const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false);
    const embedRef = useRef<HTMLDivElement>(null);

    // Always call useMetadata before any early returns
    const song = data.song;
    const album = data.album;

    useEffect(() => {
        if (!embedRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoadEmbed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(embedRef.current);
        return () => observer.disconnect();
    }, []);

    useMetadata({
        title: song && album ? `${song.name} from ${album.name} | Jaxsenville` : 'Error | Music | Jaxsenville',
        description: song && album ? `Listen to ${song.name} from ${album.name} by Jaxsen. Stream the track on Bandcamp.` : 'Listen to music by Jaxsen. Stream tracks on Bandcamp.'
    });

    if (!data.song) {
        return (
            <div className="inner">
                <h1>Song not found</h1>
                <p>The song you're looking for doesn't exist.</p>
            </div>
        );
    }

    // Add JSON-LD schema
    const schemaData = song && album ? {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        "name": song.name,
        "artist": {
            "@type": "MusicGroup",
            "name": "Jaxsen"
        },
        "inAlbum": {
            "@type": "MusicAlbum",
            "name": album.name,
            "image": album.cover,
            "url": `/music/${album.slug}`
        },
        "position": song.pos,
        "image": album.cover,
        "url": `/music/${album.slug}/${song.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
        ...(album.spotify && {
            "potentialAction": {
                "@type": "ListenAction",
                "target": song.spotify
            }
        }),
        ...(song.lyrics && {
            "lyrics": {
                "@type": "CreativeWork",
                "text": song.lyrics.replace(/<br\s*\/?>/gi, '')
            }
        })
    } : null;

    return (
        <>
            {schemaData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaData)
                    }}
                />
            )}
            <div className="inner">
                {song && album && (
                    <div className="album-panel song-page">

                            <a href={`/music/${album.slug}`} className="back-to-album">
                                ← Back to {album.name}
                            </a>
                        <div className="album-content">
                            <div style={{marginBottom:"2rem"}} className="album-cover-section">
                                <img src={album.cover} alt={`${album.name} cover art`} className="album-cover-large" />
                                <h1>{song.name}</h1>
                                <h2 style={{fontWeight:"normal"}}>from {album.name}</h2>
                                {album.spotify && (
                                    <a href={song.spotify} target="_blank" title={`Open ${album.name} on Spotify`} className="spotify-link">
                                        <img src="/icon/spotify.svg" className="icon" title="Spotify logo" alt="Spotify logo"/>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="song-player-section" ref={embedRef}>
                            <ClientOnly fallback={<div className="embed-placeholder">
                                <p>Loading player...</p>
                            </div>}>
                            {song.embed && shouldLoadEmbed && <BandcampEmbed embed={song.embed} />}
                            </ClientOnly>
                        </div>
                        <div style={{marginTop:"2rem"}}>
                            <p style={{whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{ __html: song.lyrics }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 