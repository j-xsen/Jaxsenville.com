function MenuButton({text}: { text: string }) {
    const title = text.charAt(0).toUpperCase() + text.slice(1);
    return (
        <li id={`${text}-button`} className={"menu-button"}>
            <a href={`/${text}`} title={`${title} page`}>
                <img draggable="false"
                     src={`./menu/${text}_outline.svg`}
                     alt={title}
                     title={`${title} page`}/>
            </a>
        </li>
    );
}

export default function MenuButtons() {
    return (
        <ul>
            <MenuButton text="art"/>
            <MenuButton text="blahg"/>
            <MenuButton text="music"/>
            <MenuButton text="contact"/>
        </ul>
    )
}
