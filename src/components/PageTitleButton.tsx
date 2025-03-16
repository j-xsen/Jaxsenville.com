export default function PageTitleButton({ text }: { text: string } ) {
    const title = text.charAt(0).toUpperCase() + text.slice(1);
    return (
        <>
        <a href={`/${text}`} title={`${title} page`}>
            <img
            id="single-page-header-image"
            draggable="false"
            src={`/${text}_outline.svg`}
            alt={title}/>
            </a>
        </>
    )
}