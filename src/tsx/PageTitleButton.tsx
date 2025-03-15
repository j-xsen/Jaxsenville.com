import { Link } from "react-router";

function PageTitleButton({ text }: { text: string } ) {
    return (
        <>
        <Link to={`/${text}`}>
            <img
            id="single-page-header-image"
            draggable="false"
            src={`/${text}_outline.svg`}/>
        </Link>
        </>
    )
}

export default PageTitleButton;