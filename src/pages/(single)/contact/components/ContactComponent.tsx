import instagramUrl from "../../../../../public/icon/instagram.webp"

export default function ContactComponent() {
    return (
        <>
        <div className="Frame Frame0" id="contact">
            <h1>Reach the Mayor</h1>
            <p>jaxsen (at) jxsen (dot) com</p>
            <p style={{display:"inline"}}>
                <img src={instagramUrl} style={{
                    display:"inline",
                    width:"1.5rem",
                    height:"1.5rem",
                    marginRight: "0.5rem",}} alt={"Instagram"}/>
                <a style={{position:"relative",top:"-0.25rem"}} href={"https://www.instagram.com/j_xsen/"}>j_xsen</a>
            </p>
        </div>
        </>
    )
}
