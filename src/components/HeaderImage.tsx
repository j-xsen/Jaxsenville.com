export default function HeaderImage() {
    return (
        <>
            <a href="/" title="Home page">
                <div id="header-flex" className={"home"}>
                    <img id="header-image"
                         width="304"
                         height="160"
                         srcSet="/images/jaxsenvillesign-2050x.webp 2050w,
                         /images/jaxsenvillesign-912x.webp 912w,
                         /images/jaxsenvillesign-608x.webp 608w,
                         /images/jaxsenvillesign-304x.webp 304w"
                         src="/images/jaxsenvillesign-304x.webp"
                         sizes="304px"
                         draggable="false"
                         title="Home page"
                         alt="Jaxsenville Sign"/>
                </div>
            </a>
        </>
    )
}
