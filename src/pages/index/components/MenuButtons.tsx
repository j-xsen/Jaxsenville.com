function MenuButton({text}: { text: string }) {
    const title = text.charAt(0).toUpperCase() + text.slice(1);
    return (
        <>
            <a href={`/${text}`} title={`${title} page`}>
                <img id={`${text}-button`}
                     className="menu-button"
                     draggable="false"
                     src={`./${text}_outline.svg`}
                     alt={title}
                     title={`${title} page`}/>
            </a>
        </>
    );
}

export default function MenuButtons() {
    return (
        <>
            <MenuButton text="art"/>
            <MenuButton text="blahg"/>
            <MenuButton text="music"/>
            <MenuButton text="contact"/>
        </>
    )
}
