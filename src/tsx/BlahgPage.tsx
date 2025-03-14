import '../css/BlahgPage.css';

import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { format } from 'date-fns';
import { useEffect, useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

type PostListing = {
    ID: number;
    title: string;
    created_at: string;
}

function ListedBlahgPost({ data }: { data: PostListing }) {
    return (
        <div className={`Frame Blahg${ top ? " Frame0" : "" }`}>
            <h2>{data.title}</h2>
            <p>{format(data.created_at, "d MMMM u")}</p>
        </div>
    )
}

function BlahgPage() {
    const [blahgPosts, setBlahgPosts] = useState<PostListing[]>([]);

    useEffect(() => {
        getBlahgPosts();
    }, []);

    async function getBlahgPosts() {
        const { data, error } = await supabase.from("Blahg").select();
        if (error) {
            console.error("Error fetching blahg posts:", error);
        } else {
            setBlahgPosts(data);
        }
    }

    return (
        <>
        <div className="Gallery">
            {blahgPosts.map((post) => (
                <ListedBlahgPost key={post.ID} data={post} />
            ))}
        </div>
        </>
    )
}

export default BlahgPage;