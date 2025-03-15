import '../css/BlahgPage.css';

import { format } from 'date-fns';
import PageTitleButton from './PageTitleButton';
import { Link, Outlet, useParams } from 'react-router';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';

type PostListing = {
    ID: number;
    title: string;
    created_at: string;
    content: string;
}

export function PostNotFound() {
    return (
        <div className="Gallery">
            <div className="Frame Blahg Frame0 open">
                <h2>Post Not Found</h2>
                <p className="content">The post you are looking for does not exist.</p>
            </div>
        </div>
    )
}

export function BlahgPost() {
    let { postId } = useParams();

    const [post, setPost] = useState<PostListing>()

    useEffect(() => {
        async function getPost() {
            const { data: posts } = await supabase.from('Blahg').select().eq('ID', postId)
            if (posts) {
                setPost(posts[0])
            }
        }

        getPost()
    }, [])

    return (
        <>
        <div className="Gallery">
            <div className="Frame Blahg Frame0 open">
                <h2>{post?.title}</h2>
                <p className="date">{post?.created_at ? format(new Date(post.created_at), "d MMMM u") : ""}</p>
                <p className="content">{post?.content}</p>
            </div>
        </div>
        </>
    )
}

function ListedBlahgPost({ data }: { data: PostListing }) {
    return (
        <Link to={`/blahg/${data.ID}`}>
            <div className={`Frame Blahg${ top ? " Frame0" : "" }`}>
                <h2>{data.title}</h2>
                <p className="date">{format(data.created_at, "d MMMM u")}</p>
            </div>
        </Link>
    )
}

export function BlahgList() {
    const [postList, setPostList] = useState<PostListing[]>([])

    useEffect(() => {
        async function getPostList() {
            const { data: posts } = await supabase.from('Blahg').select()
            if (posts) {
                setPostList(posts)
            }
        }

        getPostList()
    }, [])

    return (
        <>
        <div className="Gallery">
            {postList.map((posts) => (
                <ListedBlahgPost key={posts.ID} data={posts} />
            ))}
        </div>
        </>
    )
}

export default function BlahgPage() {
    return (
        <>
        <PageTitleButton text="blahg"/>
        <Outlet />
        </>
    )
}
