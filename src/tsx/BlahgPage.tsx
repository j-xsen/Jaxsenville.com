import '../css/BlahgPage.css';

import { format } from 'date-fns';
import { useState } from "react";
import cachedPosts from "../../public/blahgPosts.json";

type PostListing = {
    ID: number;
    title: string;
    created_at: string;
    content: string;
}

function BlahgPost({ data }: { data: PostListing }) {
    return (
        <>
        <p className="content">{data.content}</p>
        </>
    )
}

function ListedBlahgPost({ data }: { data: PostListing }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`Frame Blahg${ top ? " Frame0" : "" }${ isOpen ? " open" : "" }`} onClick={toggleOpen}>
            <h2>{data.title}</h2>
            <p className="date">{format(data.created_at, "d MMMM u")}</p>
            { isOpen && <BlahgPost data={data} /> }
        </div>
    )
}

function BlahgPage() {
    return (
        <>
        <div className="Gallery">
            {cachedPosts.map((post) => (
                <ListedBlahgPost key={post.ID} data={post} />
            ))}
        </div>
        </>
    )
}

export default BlahgPage;