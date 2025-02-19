function PageTitleButton({text, goHome}: {text: string, goHome: () => void}) {
    return (
        <>
        <img
        id="single-page-header-image"
        draggable="false"
        onClick={goHome}
        src={`/${text}_outline.svg`}/>
        </>
    )
}

export default PageTitleButton;