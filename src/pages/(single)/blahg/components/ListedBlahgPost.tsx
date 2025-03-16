import { format } from 'date-fns'
import PostListing from '../types/PostListing'

export default function ListedBlahgPost({ data, top = false }: { data: PostListing, top: boolean }) {
    return (
        <>
        <div className={`Frame Blahg${ top ? " Frame0" : "" }`}>
            <h2>{data.title}</h2>
            <p className="date">{format(data.created_at, "d MMMM u")}</p>
        </div>
        </>
    )
}