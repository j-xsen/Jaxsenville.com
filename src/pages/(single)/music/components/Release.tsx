import {format} from "date-fns"
import {ISong, Song} from "./Song"
import {Suspense} from "react";

export interface IRelease {
    name: string,
    date: Date,
    cover: string,
    spotify: string,
    tracks: ISong[]
}

export function Release({release, top = false}: { release: IRelease, top?: boolean }) {
    const renderTracks = () => {
        return release.tracks.map(track => {
            return <Song key={track.pos} song={track}/>
        });
    };

    const getAlt = () => {
        return `${release.name ? " c" : "c"}over art.`
    }

    return (
        <>
            <div className={`Frame ReleaseFrame${top ? " Frame0" : ""}`}>
                <Suspense fallback={<p>Loading...</p>}>
                <img src={`/images/covers/${release.cover}.avif`} title={getAlt()} alt={getAlt()}/>
                </Suspense>
                <h1>{release.name}</h1>
                <a href={release.spotify} target="_blank" title={`Open ${release.name} on Spotify`}>
                    <img src="/icon/spotify.svg" className="icon" title="Spotify logo" alt="Spotify logo"/>
                </a>
                <p><i>{format(release.date, "d MMMM u")}</i></p>
                {renderTracks()}
            </div>
        </>
    )
}
