export default function HeaderImage() {
    return (
        <>
            <h1 style={{width:"1px",
                height:"1px",
                position:"absolute",
                background:"#fff",
                color:"#000",
                opacity:"0",
                overflow:"hidden"}}>Jaxsenville - Jaxsen Honeycutt's Portfolio</h1>
            <a href="/" title="Home page" id={"header-flex"}>
                    <img id="header-image"
                         width="304"
                         height="160"
                         srcSet="/images/jaxsenvillesign-2050x.webp 2050w,
                         /images/jaxsenvillesign-912x.webp 912w,
                         /images/jaxsenvillesign-608x.webp 608w,
                         /images/jaxsenvillesign-304x.webp 304w"
                         src="/images/jaxsenvillesign-304x.webp"
                         sizes="304px"
                         fetchPriority="high"
                         draggable="false"
                         title="Home page"
                         alt="Jaxsenville Sign"/>
            </a>
        </>
    )
}
