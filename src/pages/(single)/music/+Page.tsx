import {useMetadata} from 'vike-metadata-react';
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import './Page.css';
import DSP from "./components/DSP";
import {format} from "date-fns";
import {parseLocalDate} from "../../../utils/transformers.ts";

export default function Page() {
    useMetadata({
        title: "Music | Listen to Jaxsenville",
        description: "Listen to the different EPs released by our mayor, Jaxsen Honeycutt."
    });

    const data = useData<Data>();

    // Transform releases to album gallery format
    const transformAlbum = (release: {
        sys: { id: string };
        fields?: { name?: string; date?: string; cover?: { fields?: { file?: { url?: string } } }; spotify?: string }
    }) => {
        // Extract cover image URL from Contentful
        const coverUrl = release.fields?.cover?.fields?.file?.url;
        const coverImageUrl = coverUrl ? `https:${coverUrl}` : "/images/covers/default.avif";

        // Create URL-friendly slug from album name
        const slug = release.fields?.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';

        return {
            id: release.sys.id,
            name: String(release.fields?.name || "Unknown Release"),
            date: release.fields?.date ? parseLocalDate(release.fields.date) : new Date(),
            cover: coverImageUrl,
            spotify: String(release.fields?.spotify || ""),
            slug: slug
        };
    };

    return (
        <>
            <div className="upper">
                <div className="dsp-gallery">
                    <DSP name={"Spotify"}
                         link={"https://open.spotify.com/artist/6Ly7gJrLmS2qrlbLe3cCKL?si=vzmPIzS8Ti2_0hWsuvY4XQ"}/>
                    <DSP name={"Apple"} link={"https://music.apple.com/us/artist/jaxsen/1497650230"}/>
                    <DSP name={"YouTube"} link={"https://www.youtube.com/@j_xsen"}/>
                </div>
            </div>
            <div className={"inner no-margin"}>
                <div className="album-gallery">
                    {data.releases.items.map((release) => {
                        const album = transformAlbum(release);
                        return (
                            <a
                                key={album.id}
                                href={`/music/${album.slug}`}
                                className="album-card"
                                title={`View ${album.name} tracklist`}
                            >
                                <div className="album-cover">
                                    <img src={album.cover} alt={`${album.name} cover art`}/>
                                </div>
                                <div className="album-info">
                                    <h2>{album.name}</h2>
                                    <p className="album-date">{format(album.date, "d MMMM u")}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
}