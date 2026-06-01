import {usePageContext} from "vike-react/usePageContext"
import {useMetadata} from "vike-metadata-react"

export {Page}

function Page() {
    const pageContext = usePageContext()

    useMetadata({
        title: "Not Found | Jaxsenville",
        description: "The page you're looking for doesn't exist in Jaxsenville.",
        robots: "noindex, nofollow",
        openGraph: {
            title: "Not Found | Jaxsenville",
            description: "The page you're looking for doesn't exist in Jaxsenville.",
        }
    })

    let msg: string
    const {abortReason} = pageContext
    if (typeof (abortReason) === "string") {
        msg = abortReason
    } else {
        msg = pageContext.is404 ? "Page not found" : "An error occurred"
    }

    return <h1 style={{marginTop: "7rem"}}>{msg}</h1>
}
