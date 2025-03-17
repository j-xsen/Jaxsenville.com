import { useMetadata } from 'vike-metadata-react';
import ArtGallery from "./components/ArtGallery";
import './Page.css'

export default function Page() {
    useMetadata({
        title: "Art | Jaxsenville",
    })
    return (
        <>
        <ArtGallery/>
        </>
    )
}