import {createClient} from "contentful";

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE as string,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string,
});

export default client;
