export { guard }

import { redirect, render } from 'vike/abort'
import { supabase } from "../../../../utils/supabase"

const guard = async (pageContext) => {
    if (pageContext.routeParams.id) {
        console.log("id " + pageContext.routeParams.id)
        let url = await supabase.from('Blahg').select('url').eq('ID', pageContext.routeParams.id)
        if ( url.data && url.data[0]) {
            console.log("url " + url.data[0].url)
            if (!pageContext.routeParams.glahb) {
                throw redirect('/blahg/' + pageContext.routeParams.id + '/' + url.data[0].url, 301)
            } else if (pageContext.routeParams.glahb !== url.data[0].url) {
                throw redirect('/blahg/' + pageContext.routeParams.id + '/' + url.data[0].url, 302)
            }
        } else {
            throw render(404, "Blahg post " + pageContext.routeParams.id + " not found.")
        }
    }
}
