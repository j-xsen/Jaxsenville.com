import client from "../../../../utils/contentful";
import {BlahgEntrySkeleton} from "../types/BlahgEntrySkeleton";

export {onBeforePrerenderStart};

async function onBeforePrerenderStart() {
    const blogPosts = await client.getEntries<BlahgEntrySkeleton>({
        content_type: "blahg",
    });
    const blogPostURLs = blogPosts.items?.map(
        (post) => `/blahg/${post.fields.url}`
    );
    return blogPostURLs;
}
