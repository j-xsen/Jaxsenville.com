export { guard }

import type { GuardAsync } from "vike/types"
import { redirect, render } from 'vike/abort'
import { supabase } from "../../../../utils/supabase"

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    if (pageContext.routeParams.id) {
        let url = await supabase.from('Blahg').select('url').eq('ID', pageContext.routeParams.id)
        if ( url.data && url.data[0]) {
            if (!pageContext.routeParams.glahb) {
                throw redirect('/blahg/' + pageContext.routeParams.id + '/' + url.data[0].url as string, 301)
            } else if (pageContext.routeParams.glahb !== url.data[0].url) {
                throw redirect('/blahg/' + pageContext.routeParams.id + '/' + url.data[0].url as string, 302)
            }
        } else {
            throw render(404, "Blahg post " + pageContext.routeParams.id + " not found.")
        }
    }
}
