import { supabase } from "../../../../utils/supabase"

export { onBeforePrerenderStart }

async function onBeforePrerenderStart() {
    const blogPosts = await supabase.from('Blahg').select('ID')
    const blogPostURLs = blogPosts.data?.map(post => `/blahg/${post.ID}`)
    return blogPostURLs
}