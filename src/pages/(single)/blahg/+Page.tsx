import ListedBlahgPost from "./components/ListedBlahgPost";
import {useMetadata} from "vike-metadata-react";
import "../../../css/Gallery.css";
import "./Page.css";
import {useData} from "vike-react/useData";
import type {Data} from "./+data";
import PostListing from "./types/PostListing";
import {parseLocalDate} from "../../../utils/transformers.ts";

export default function Page() {
    useMetadata({
        title: "Blahg | Notes from Jaxsenville",
        description: "Wander into the Blahg - Jaxsen's musings on sound, creativity, and town life. Dive into behind-the-scenes posts and experimental thoughts.",
        openGraph: { url: "https://jaxsenville.com/blahg" },
    });

    const data = useData<Data>();

    const thisItem = data.posts?.items?.[0];
    if(!thisItem?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Blog not found.</h1>
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blahg | Notes from Jaxsenville",
        "description": "Wander into the Blahg - Jaxsen's musings on sound, creativity, and town life. Dive into behind-the-scenes posts and experimental thoughts.",
        "url": "https://jaxsenville.com/blahg",
        "author": {
            "@type": "Person",
            "@id": "https://jaxsenville.com/#jaxsen",
            "name": "Jaxsen Honeycutt"
        },
        "blogPost": data.posts.items
            .filter(post => !!post.fields)
            .map(post => ({
                "@type": "BlogPosting",
                "headline": post.fields.title,
                "url": `https://jaxsenville.com/blahg/${post.fields.url}`,
                "datePublished": parseLocalDate(post.fields.createdAt).toISOString(),
            }))
    };

    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className={"inner"}>
            {data.posts?.items.map((post, index) => {
                if (!post.fields) return null;
                const postListing: PostListing = {
                    ID: post.sys.id,
                    url: post.fields.url,
                    created_at: parseLocalDate(post.fields.createdAt),
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
        </>
    );
}
