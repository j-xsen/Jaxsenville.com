import {format} from "date-fns";
import Post from "../../types/Post";

export default function BlahgPost({data}: { data: Post }) {
    if (!data) {
        return (
            <>
                <h1>Blahg not found</h1>
            </>
        );
    }

    console.log()

    return (
        <>
            <div className={`Frame Frame0 Blahg open`}>
                {data.heroImage && (
                    <img src={data.heroImage.fields.file.url} alt={data.heroImage.fields.description}/>
                )}
                <h2>{data.title}</h2>
                <p className="date">{format(data.created_at, "d MMMM u")}</p>
                <div className="content" dangerouslySetInnerHTML={{__html:data.content}}/>
            </div>
        </>
    );
}
