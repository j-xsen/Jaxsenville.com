import { supabase } from "../../../../utils/supabase"

export { data }
export type Data = Awaited<ReturnType<typeof data>>

import type { PageContextServer } from 'vike/types'

async function data(pageContext: PageContextServer) {
    const { data: post } = await supabase.from('Blahg').select('ID, created_at, title, content').eq('ID', pageContext.routeParams.id)
    let path = "blahg"

    return { path, post }
}
