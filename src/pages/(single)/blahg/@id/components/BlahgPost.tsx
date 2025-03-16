import { format } from 'date-fns'
import PostListing from '../../types/PostListing'

export default function BlahgPost({ data }: { data: PostListing }) {
    return (
        <>
        <div className={`Frame Frame0 Blahg open`}>
            <h2>{data.title}</h2>
            <p className="date">{format(data.created_at, "d MMMM u")}</p>
            <p className="content">{data.content}</p>
        </div>
        </>
    )
}
