import ListedBlahgPost from "./components/ListedBlahgPost";
import {useMetadata} from "vike-metadata-react";
import "../../../css/Gallery.css";
import "./Page.css";
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import PostListing from "./types/PostListing";

export default function Page() {
    useMetadata({title: "Blahg | Jaxsenville"});

    const data = useData<Data>();

    return (
        <>
            {data.posts?.items.map((post, index) => {
                if (!post.fields) return null;
                const postListing: PostListing = {
                    ID: post.sys.id,
                    url: post.fields.url,
                    created_at: post.fields.createdAt,
                    title: post.fields.title,
                };

                return (
                    <ListedBlahgPost
                        key={post.sys.id}
                        data={postListing}
                        top={index === 0}
                    />
                );
            })}
        </>
    );
}
