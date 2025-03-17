import { format } from 'date-fns'
import PostListing from '../types/PostListing'

export default function ListedBlahgPost({ data, top = false }: { data: PostListing, top: boolean }) {
    return (
        <>
        <a href={`/blahg/${data.ID}`} title={data.title} className={`Frame Blahg${ top ? " Frame0" : "" }`}>
            <h3>{data.title}</h3>
            <p className="date">{format(data.created_at, "d MMMM u")}</p>
        </a>
        </>
    )
}