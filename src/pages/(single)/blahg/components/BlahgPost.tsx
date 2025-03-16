import PostListing from '../types/PostListing'

export default function BlahgPost(data: PostListing) {
    return (
        <>
            <p className="content">{data.content}</p>
        </>
    )
}