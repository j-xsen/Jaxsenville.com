import {Data} from "./+data";
import {useData} from "vike-react/useData";
import BlahgPost from "./components/BlahgPost";
import "./Page.css";
import {useMetadata} from "vike-metadata-react";
import Post from "../types/Post";

export default function Page() {
    const data = useData<Data>();

    const thisItem = data.post.items[0];

    // Always call useMetadata before any early returns
    const title = thisItem?.fields?.title ? String(thisItem.fields.title) : 'Blog | Jaxsenville';
    const content = thisItem?.fields?.content ? String(thisItem.fields.content) : '';
    const createdAt = thisItem?.fields?.createdAt ? String(thisItem.fields.createdAt) : '';
    const url = thisItem?.fields?.url ? String(thisItem.fields.url) : '';
    const currentUrl = url ? `https://jaxsenville.com/blahg/${url}` : 'https://jaxsenville.com/blahg';

    useMetadata({
        title: `${title} | Blahg | Jaxsenville`,
        description: "Jaxsen unpacks the synth-layered emotions behind the EP. Introspective notes from the digital city's mayoral journal.",
        openGraph: {
            type: "article",
            authors: "Jaxsen Honeycutt",
            locale: "en_US",
            siteName: "Jaxsenville",
            url: currentUrl,
            title: `${title} | Blahg | Jaxsenville`,
            description: "Jaxsen unpacks the synth-layered emotions behind the EP.",
            publishedTime: createdAt,
        }
    });

    if (!thisItem?.fields) {
        return <h1 style={{marginTop: "7rem"}}>Blog not found.</h1>;
    }

    const blahg: Post = {
        content: content,
        ID: thisItem.sys.id,
        title: title,
        created_at: createdAt,
        url: url,
    };

    // JSON-LD Schema for the blog post
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": "Jaxsen unpacks the synth-layered emotions behind the EP. Introspective notes from the digital city's mayoral journal.",
        "author": {
            "@type": "Person",
            "name": "Jaxsen Honeycutt",
            "url": "https://www.jxsen.com/"
        },
        "datePublished": createdAt,
        "dateModified": createdAt,
        "publisher": {
            "@type": "Organization",
            "name": "Jaxsenville",
            "url": "https://jaxsenville.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://jaxsenville.com/icon.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
        },
        "url": currentUrl,
        "articleBody": content,
        "genre": "Music Blog",
        "keywords": "synthpop, electronic music, EP, digital art, Jaxsenville"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className="Gallery">
                <div className={"inner"}>
                {data.post && <BlahgPost data={blahg}/>}
                </div>
            </div>
        </>
    );
}
