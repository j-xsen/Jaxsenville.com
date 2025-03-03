import '../css/SinglePage.css'
import '../css/MusicPage.css'
import { format } from "date-fns"

interface IBandcampEmbed {
    track_id: number,
    name: string,
    album_id?: number,
    album_url?: string
}

function BandcampEmbed({ embed }: { embed: IBandcampEmbed }) {
    const GetSrc = () => {
        if (embed.album_id) {
            return `https://bandcamp.com/EmbeddedPlayer/album=${embed.album_id}/size=small/bgcol=ffffff/linkcol=0687f5/track=${embed.track_id}/transparent=true/`;
        } else {
            return `https://bandcamp.com/EmbeddedPlayer/track=${embed.track_id}/size=small/bgcol=ffffff/linkcol=7137dc/transparent=true/`;
        }
    }
    const GetHref = () => {
        if (embed.album_url) {
            return `https://jaxsen.bandcamp.com/album/${embed.album_url}`;
        } else {
            return `https://jaxsen.bandcamp.com/track/${embed.name}`;
        }
    }
    return (
        <>
            <iframe style={{ border: 0, width: '100%', height: '42px' }} src={GetSrc()} seamless><a href={GetHref()}>{embed.name} by jaxsen</a></iframe>
        </>
    )
}

interface ISong {
    pos: number,
    name: string,
    embed?: IBandcampEmbed
}

function Song({ song }: { song: ISong }) {
    return (
        <>
        <div className={`TrackFrame`}>
            <p>{song.pos}. {song.name}</p>
            {song.embed && <BandcampEmbed embed={song.embed}/>}
        </div>
        </>
    )
}

interface IRelease {
    name: string,
    date: Date,
    cover: string,
    tracks: ISong[]
}

function Release({ release, top = false }: { release: IRelease, top?: boolean }) {
    const renderTracks = () => {
        return release.tracks.map(track => {
            return <Song song={track}/>
        });
    };
    return (
        <>
        <div className={`ReleaseFrame${ top ? " Frame0" : "" }`}>
        <img src={`./covers/${release.cover}.jpg`}/>
        <h1>{release.name}</h1>
        <p><i>{format(release.date, "d MMMM u")}</i></p>
            {renderTracks()}
        </div>
        </>
    )
}

function MusicPage() {
    const jaxsenville: IRelease = {
        name: "Jaxsenville",
        date: new Date("2025-03-12 00:00"),
        cover: "jaxsenville",
        tracks: [
            {pos:1, name: "???"},
            {pos:2, name: "Daydream", embed:{track_id:58503408, name:"Daydream"}},
            {pos:3, name: "Snowball", embed:{track_id:3720036677, album_id:895249410, name: "Snowball", album_url: "snowball-gray"}},
            {pos:4, name: "???"},
            {pos:5, name: "???"},
            {pos:6, name: "Gray", embed:{track_id:3949460403, album_id:895249410, name: "Gray", album_url:"snowball-gray"}},
            {pos:7, name: "???"}
        ]
    }
    const the_play: IRelease = {
        name: "THE PLAY",
        date: new Date("2022-09-16 00:00"),
        cover: "the_play",
        tracks: [
            {pos:1, name: "you gave me light"},
            {pos:2, name: "impose"},
            {pos:3, name: "shackles"},
            {pos:4, name: "i gave you my heart"},
            {pos:5, name: "i'd rather be alone"}
        ]
    }
    const drywall: IRelease = {
        name: "drywall",
        date: new Date("2020-08-03 00:00"),
        cover: "drywall",
        tracks: [
            {pos:1, name:"clock"},
            {pos:2, name:"creek"},
            {pos:3, name:"earthquake"},
            {pos:4, name:"i keep losing everyone"},
            {pos:5, name:"soaked"},
            {pos:6, name:"harry"}
        ]
    }
    return (
        <>
        <div id="MusicGallery">
            <Release release={jaxsenville} top={true}/>
            <Release release={the_play}/>
            <Release release={drywall}/>
        </div>
        </>
    )
}

export default MusicPage;