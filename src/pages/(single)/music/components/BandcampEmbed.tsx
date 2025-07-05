export interface IBandcampAlbum {
    id: number,
    url: string
}

export interface IBandcampEmbed {
    track_id: number,
    name?: string,
    album?: IBandcampAlbum
}

export default function BandcampEmbed({embed}: { embed: IBandcampEmbed }) {
    const GetSrc = () => {
        if (embed.album) {
            return `https://bandcamp.com/EmbeddedPlayer/album=${embed.album.id}/size=small/bgcol=ffffff/linkcol=0687f5/track=${embed.track_id}/transparent=true`;
        } else {
            return `https://bandcamp.com/EmbeddedPlayer/track=${embed.track_id}/size=small/bgcol=ffffff/linkcol=7137dc/transparent=true`;
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
            <iframe style={{border: 0, height: '42px'}} src={GetSrc()} seamless>
                <a href={GetHref()} title={`Open ${embed.name} on Bandcamp`}>{embed.name} by jaxsen</a>
            </iframe>
        </>
    )
}
