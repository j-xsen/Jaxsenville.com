import { IBandcampEmbed, BandcampEmbed } from "./BandcampEmbed"

export interface ISong {
    pos: number,
    name?: string,
    embed?: IBandcampEmbed
}

export function Song({ song }: { song: ISong }) {
    return (
        <>
        <div className={`TrackFrame`}>
            <p>{song.pos}. {song.embed?.name ?? song.name}</p>
            {song.embed && <BandcampEmbed embed={song.embed}/>}
        </div>
        </>
    )
}
