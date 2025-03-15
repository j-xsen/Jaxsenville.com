import { IBandcampAlbum } from "./components/BandcampEmbed"
import { IRelease, Release } from "./components/Release"
import PageTitleButton from "../../components/PageTitleButton."

import '../../components/Gallery.css'
import './Page.css'

export default function Page() {
    const jaxsenville_BCAlbum: IBandcampAlbum = {
        id: 1359740859,
        url: "jaxsenville"
    }
    const jaxsenville: IRelease = {
        name: "Jaxsenville",
        date: new Date("2025-03-12 00:00"),
        cover: "jaxsenville",
        spotify: "https://open.spotify.com/album/1KNp1aqMrN0tTKJ1XAXW73?si=ACgFINEpR4u8fh7UOA8yjQ",
        tracks: [
            {pos:1, embed: {track_id: 3773466243, name: "Alcraam", album:jaxsenville_BCAlbum}},
            {pos:2, embed: {track_id: 58503408, name:"Daydream", album:jaxsenville_BCAlbum}},
            {pos:3, embed: {track_id: 3720036677, name: "Snowball", album:jaxsenville_BCAlbum}},
            {pos:4, embed: {track_id: 2807671321, name: "Even at my Worst", album:jaxsenville_BCAlbum}},
            {pos:5, embed: {track_id: 2140179176, name: "Jaxsenology", album:jaxsenville_BCAlbum}},
            {pos:6, embed: {track_id: 3949460403, name: "Gray", album:jaxsenville_BCAlbum}},
            {pos:7, embed: {track_id: 1222075266, name: "You've Been There", album:jaxsenville_BCAlbum}}
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
        <PageTitleButton text="music"/>
        <div className="Gallery">
            <Release release={jaxsenville} top={true}/>
            <Release release={the_play}/>
            <Release release={drywall}/>
        </div>
        </>
    )
}