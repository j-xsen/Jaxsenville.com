import ListedBlahgPost from "./components/ListedBlahgPost";
import {useMetadata} from "vike-metadata-react";
import "../../../css/Gallery.css";
import "./Page.css";
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import PostListing from "./types/PostListing";

export default function Page() {
    useMetadata({title: "Blahg | Notes from Jaxsenville",
    description:"Wander into the Blahg - Jaxsen's musings on sound, creativity, and town life. Dive into behind-the-scenes posts and experimental thoughts."});

    const data = useData<Data>();

    const thisItem = data.posts?.items?.[0];
    if(!thisItem?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Blog not found.</h1>
    }

    return (
        <div className={"inner"}>
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
        </div>
    );
}
