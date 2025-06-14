import {Data} from "./+data";
import {useData} from "vike-react/useData";
import BlahgPost from "./components/BlahgPost";
import "./Page.css";
import {useMetadata} from "vike-metadata-react";
import Post from "../types/Post";

export default function Page() {
    const data = useData<Data>();

    useMetadata({
        title: `${data.post.items[0].fields.title} | Blahg | Jaxsenville`,
    });

    const thisItem = data.post.items[0];

    if (!thisItem) {
        return <h1 style={{marginTop: "7rem"}}>Blog not found.</h1>;
    }
    const blahg: Post = {
        content: String(thisItem.fields.content),
        ID: thisItem.sys.id,
        title: String(thisItem.fields.title),
        created_at: String(thisItem.fields.createdAt),
        url: String(thisItem.fields.url),
    };

    return (
        <>
            <div className="Gallery">
                <div className={"inner"}>
                {data.post && <BlahgPost data={blahg}/>}
                </div>
            </div>
        </>
    );
}
