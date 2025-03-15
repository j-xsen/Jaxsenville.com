import PageTitleButton from "../../components/PageTitleButton.";
import ArtGallery from "./components/ArtGallery";
import './Page.css'
import '../../components/Gallery.css'

export default function Page() {
    return (
        <>
        <PageTitleButton text="art"/>
        <ArtGallery/>
        </>
    )
}