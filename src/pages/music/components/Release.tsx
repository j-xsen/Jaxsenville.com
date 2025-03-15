import { format } from "date-fns"
import { ISong, Song } from "./Song"

export interface IRelease {
    name: string,
    date: Date,
    cover: string,
    spotify: string,
    tracks: ISong[]
}

export function Release({ release, top = false }: { release: IRelease, top?: boolean }) {
    const renderTracks = () => {
        return release.tracks.map(track => {
            return <Song key={track.pos} song={track}/>
        });
    };
    const openSpotify = () => {
        window.open(release.spotify, "_blank");
    }
    return (
        <>
        <div className={`Frame ReleaseFrame${ top ? " Frame0" : "" }`}>
        <img src={`./covers/${release.cover}.jpg`}/>
        <h1>{release.name}</h1>
        <img src="./icon/spotify.svg" onClick={openSpotify} className="icon"/>
        <p><i>{format(release.date, "d MMMM u")}</i></p>
            {renderTracks()}
        </div>
        </>
    )
}
