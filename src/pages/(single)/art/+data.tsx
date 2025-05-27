import client from "../../../utils/contentful";
import {ArtSkeleton} from "./types/ArtSkeleton.tsx";

export {data};
export type Data = Awaited<ReturnType<typeof data>>;

async function data() {
    const arts = await client.getEntries<ArtSkeleton>({
        content_type: "art",
        order: ["-fields.date"] as never,
    });

    return {path: "art", arts};
}
