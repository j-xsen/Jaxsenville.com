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
    return (
        <>
            <div className={`Frame Frame0 Blahg open`}>
                <h3>{data.title}</h3>
                <p className="date">{format(data.created_at, "d MMMM u")}</p>
                <p className="content">{data.content}</p>
            </div>
        </>
    );
}
