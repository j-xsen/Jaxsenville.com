import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import BandcampEmbed from "../../components/BandcampEmbed";
import {clientOnly} from "vike-react/clientOnly";
import '../../Page.css';

const ClientBandcampEmbed = clientOnly(() => import("../../components/BandcampEmbed.tsx"));

export default function Page() {
    const data = useData<Data>();
    
    if (!data.song) {
        return (
            <div className="inner">
                <h1>Song not found</h1>
                <p>The song you're looking for doesn't exist.</p>
            </div>
        );
    }

    const song = data.song;
    const album = data.album;
    
    useMetadata({
        title: `${song.name} | ${album.name} | Music`,
        description: `Listen to ${song.name} from ${album.name} by Jaxsen. Stream the track on Bandcamp.`
    });

    // Add JSON-LD schema
    const schemaData = {
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
                "target": album.spotify
            }
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData)
                }}
            />
            <div className="song-page-container">
                <div className="song-layout">
                    <div className="song-info-section">
                        <a href={`/music/${album.slug}`} className="back-to-album">
                            ← Back to {album.name}
                        </a>
                        <div className="song-header">
                            <img src={album.cover} alt={`${album.name} cover art`} className="song-album-cover" />
                            <h1>{song.name}</h1>
                            <h2>from {album.name}</h2>
                            {album.spotify && (
                                <a href={album.spotify} target="_blank" title={`Open ${album.name} on Spotify`} className="spotify-link">
                                    <img src="/icon/spotify.svg" className="icon" title="Spotify logo" alt="Spotify logo"/>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="song-player-section">
                        {song.embed && <ClientBandcampEmbed embed={song.embed} />}
                    </div>
                </div>
            </div>
        </>
    );
} 