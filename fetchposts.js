import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPosts() {
    const { data, error } = await supabase.from('Blahg').select();
    if (error) {
        console.error('Error fetching blahg posts:', error);
        process.exit(1);
    } else {
        const filePath = 'public/blahgPosts.json';
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Blahg posts cached successfully.');
    }
}

fetchPosts();