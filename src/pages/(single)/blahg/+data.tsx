import { supabase } from "../../../utils/supabase"

export { data }
export type Data = Awaited<ReturnType<typeof data>>

async function data() {
    const { data: posts } = await supabase.from('Blahg').select('ID, created_at, title, content, url')
    let path = "blahg"

    return { path, posts }
}
