import ListedBlahgPost from "./components/ListedBlahgPost"
import { useMetadata } from 'vike-metadata-react';
import '../../../css/Gallery.css'
import './Page.css'
import { useData } from "vike-react/useData"
import type { Data } from "./+data"

export default function Page() {
    useMetadata({title: "Blahg | Jaxsenville"})
    
    const data = useData<Data>()

    return (
        <>
        <div className="Gallery">
            {data.posts?.map((post, index) => (
                <ListedBlahgPost key={post.ID} data={post} top={index == 0} />
            ))}
        </div>
        </>
    )
}