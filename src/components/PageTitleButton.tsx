import React from "react";

export default function PageTitleButton({text, style}: { text?: string; style?: React.CSSProperties }) {
    if (!text) {
        return null;
    }

    const title = text.charAt(0).toUpperCase() + text.slice(1);
    return (
        <li id={"single-page-header-image"} style={style}>
            <a href={`/${text}`} title={`${title} page`}>
                <img draggable="false"
                    title={`${title} page`}
                    src={`/menu/${text}_outline.svg`}
                    alt={title}/>
            </a>
        </li>
    )
}