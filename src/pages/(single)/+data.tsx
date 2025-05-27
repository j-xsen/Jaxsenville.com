export {data}
export type Data = Awaited<ReturnType<typeof data>>

import type {PageContextServer} from 'vike/types'

async function data(pageContext: PageContextServer) {
    let path = pageContext.urlParsed.pathname.split('/')[1]
    return {path}
}