export {data}
export type Data = Awaited<ReturnType<typeof data>>

import type {PageContextServer} from 'vike/types'

async function data(pageContext: PageContextServer) {
    const pathname = pageContext.urlParsed.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    // For dynamic routes like /music/jaxsenville, we want to extract the base path
    // For static routes like /music, /art, /blahg, we use the first segment
    let path;
    if (segments.length >= 2 && segments[0] === 'music') {
        // For music album pages, use 'music' as the path
        path = 'music';
    } else if (segments.length >= 1) {
        // For other pages, use the first segment
        path = segments[0];
    } else {
        // Fallback
        path = '';
    }
    
    return {path}
}