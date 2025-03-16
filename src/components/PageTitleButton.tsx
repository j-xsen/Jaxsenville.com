export default function PageTitleButton({ text }: { text: string } ) {
    return (
        <>
        <a href={`/${text}`}>
            <img
            id="single-page-header-image"
            draggable="false"
            src={`/${text}_outline.svg`}/>
            </a>
        </>
    )
}