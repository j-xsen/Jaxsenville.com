/// <reference types="vite/client" />
import type { Config } from '@react-router/dev/config'
import { supabase } from './utils/supabase';

export default {    
    async prerender() {
        let posts = await supabase.from('Blahg').select()
        return [
            "/",
            "/art",
            "/contact",
            "/music",
            "/blahg",
            ...posts.data?.map((post) => `/blahg/${post.ID}`) ?? []
        ]
    }
} satisfies Config