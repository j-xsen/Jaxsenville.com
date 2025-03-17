export default function HeaderImage() {
  return (
    <>
    <a href="/" title="Home page">
    <div id="header-flex" className={"home"}>
      <img id="header-image"
      srcSet="/images/jaxsenvillesign-2050x.webp 2050w, /images/jaxsenvillesign-912x.webp 912w, /images/jaxsenvillesign-608x.webp 608w"
      sizes="(max-width: 1100px) 912px, (max-width: 600px) 608px, 2050px"
      draggable="false"
      title="Home page"
      alt="Jaxsenville Sign" />
    </div>
    </a>
    </>
  )
}
