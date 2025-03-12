import '../css/SinglePage.css'
import '../css/MusicPage.css'
import { format } from "date-fns"

interface IBandcampAlbum {
    id: number,
    url: string
}

interface IBandcampEmbed {
    track_id: number,
    name?: string,
    album?: IBandcampAlbum
}

function BandcampEmbed({ embed }: { embed: IBandcampEmbed }) {
    const GetSrc = () => {
        if (embed.album) {
            return `https://bandcamp.com/EmbeddedPlayer/album=${embed.album.id}/size=small/bgcol=ffffff/linkcol=0687f5/track=${embed.track_id}/transparent=true/`;
        } else {
            return `https://bandcamp.com/EmbeddedPlayer/track=${embed.track_id}/size=small/bgcol=ffffff/linkcol=7137dc/transparent=true/`;
        }
    }
    const GetHref = () => {
        if (embed.album) {
            return `https://jaxsen.bandcamp.com/album/${embed.album.url}`;
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
    name?: string,
    embed?: IBandcampEmbed
}

function Song({ song }: { song: ISong }) {
    return (
        <>
        <div className={`TrackFrame`}>
            <p>{song.pos}. {song.embed?.name ?? song.name}</p>
            {song.embed && <BandcampEmbed embed={song.embed}/>}
        </div>
        </>
    )
}

interface IRelease {
    name: string,
    date: Date,
    cover: string,
    spotify: string,
    tracks: ISong[]
}

function Release({ release, top = false }: { release: IRelease, top?: boolean }) {
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
        <div className={`ReleaseFrame${ top ? " Frame0" : "" }`}>
        <img src={`./covers/${release.cover}.jpg`}/>
        <h1>{release.name}</h1>
        <img src="./icon/spotify.svg" onClick={openSpotify} className="icon"/>
        <p><i>{format(release.date, "d MMMM u")}</i></p>
            {renderTracks()}
        </div>
        </>
    )
}

function MusicPage() {
    const snowballgray_BCAlbum: IBandcampAlbum = {
        id: 895249410,
        url: "snowball-gray"
    }
    const jaxsenville: IRelease = {
        name: "Jaxsenville",
        date: new Date("2025-03-12 00:00"),
        cover: "jaxsenville",
        spotify: "https://open.spotify.com/album/1KNp1aqMrN0tTKJ1XAXW73?si=ACgFINEpR4u8fh7UOA8yjQ",
        tracks: [
            {pos:1, name: "Alcraam"},
            {pos:2, embed:{track_id:58503408, name:"Daydream"}},
            {pos:3, embed:{track_id:3720036677, name: "Snowball", album:snowballgray_BCAlbum}},
            {pos:4, name: "Even at my Worst"},
            {pos:5, name: "Jaxsenology"},
            {pos:6, embed:{track_id:3949460403, name: "Gray", album:snowballgray_BCAlbum}},
            {pos:7, name: "You've Been There"}
        ]
    }
    const the_play_BCAlbum: IBandcampAlbum = {
        id: 340078928,
        url: "the-play"
    }
    const the_play: IRelease = {
        name: "THE PLAY",
        date: new Date("2022-09-16 00:00"),
        cover: "the_play",
        spotify: "https://open.spotify.com/album/6V5GhYESfg0xRbqdcimg4m?si=-4DidGt-SPO7Ma8RAyfhjQ",
        tracks: [
            {pos:1, name: "you gave me light", embed:{track_id:449102977, album: the_play_BCAlbum}},
            {pos:2, name: "impose", embed:{track_id:3264406368, album: the_play_BCAlbum}},
            {pos:3, name: "shackles", embed:{track_id:3618544941, album: the_play_BCAlbum}},
            {pos:4, name: "i gave you my heart", embed:{track_id:820391138, album: the_play_BCAlbum}},
            {pos:5, name: "i'd rather be alone", embed:{track_id:3529285487, album: the_play_BCAlbum}}
        ]
    }
    const drywall_BCAlbum: IBandcampAlbum = {
        id: 1910877188,
        url: "drywall"
    }
    const drywall: IRelease = {
        name: "drywall",
        date: new Date("2020-08-03 00:00"),
        cover: "drywall",
        spotify: "https://open.spotify.com/album/11EsKlTOW3rC92UwcPUkte?si=B2B_zNC2ScS1367AirsNWA",
        tracks: [
            {pos:1, name:"clock", embed:{track_id:2777273294, album: drywall_BCAlbum}},
            {pos:2, name:"creek", embed:{track_id:904049715, album: drywall_BCAlbum}},
            {pos:3, name:"earthquake", embed:{track_id:2454405647, album: drywall_BCAlbum}},
            {pos:4, name:"i keep losing everyone", embed:{track_id:4176638993, album: drywall_BCAlbum}},
            {pos:5, name:"soaked", embed:{track_id:3602910173, album: drywall_BCAlbum}},
            {pos:6, name:"harry", embed:{track_id:4086286714, album: drywall_BCAlbum}}
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