import { Data } from "./+data"
import { useData } from "vike-react/useData"
import BlahgPost from "./components/BlahgPost"
import './Page.css'

export default function Page() {
    const data = useData<Data>()

    if ( data.post && data.post.length > 0) {
    return (
        <>
        <div className="Gallery">
        {data.post && <BlahgPost data={data.post[0]} />}
        </div>
        </>
    )}
    else {
        return (
            <>
            <h1 style={{marginTop: "7rem"}}>Blog not found.</h1>
            </>
        )
    }
}