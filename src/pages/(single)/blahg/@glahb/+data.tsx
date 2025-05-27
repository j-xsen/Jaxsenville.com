import {PageContext} from "vike/types";
import client from "../../../../utils/contentful";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data(pageContext: PageContext) {
    const post = await client.getEntries({
        content_type: "blahg",
        "fields.url": pageContext.routeParams.glahb,
    });

    return {path: "blahg", post};
}
