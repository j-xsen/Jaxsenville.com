import instagramUrl from "/icon/instagram.svg"
import blueskyUrl from "/icon/bluesky.svg"

export default function ContactComponent() {
    return (
        <>
            <div className="Frame Frame0" id="contact">
                <h1>Reach the Mayor</h1>
                <p>jaxsen (at) jxsen (dot) com</p>

                <a style={{display: "inline"}} href={"https://www.instagram.com/j_xsen/"}>
                    <img src={instagramUrl} style={{
                        display: "inline",
                        width: "1.5rem",
                        height: "1.5rem",
                        marginRight: "0.5rem",
                    }} alt={"Instagram"}/>
                    <span className={"handle"}>j_xsen</span>
                </a>
                <br/>
                <a href={"https://bsky.app/profile/jaxsen.bsky.social"} style={{display: "inline"}}>
                    <img src={blueskyUrl} className={"icon"} alt={"Bluesky"}/>
                    <span className={"handle"}>jaxsen.bsky.social</span>
                </a>

            </div>
        </>
    )
}
