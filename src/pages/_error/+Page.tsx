import {usePageContext} from "vike-react/usePageContext"

export {Page}

function Page() {
    const pageContext = usePageContext()

    let msg: string
    const {abortReason} = pageContext
    if (typeof (abortReason) === "string") {
        msg = abortReason
    } else {
        msg = pageContext.is404 ? "Page not found" : "An error occurred"
    }

    return <p>{msg}</p>
}
