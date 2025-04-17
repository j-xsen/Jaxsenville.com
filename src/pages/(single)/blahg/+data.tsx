import client from "../../../utils/contentful";
import { BlahgEntrySkeleton } from "./types/BlahgEntrySkeleton";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

async function data() {
	const posts = await client.getEntries<BlahgEntrySkeleton>({
		content_type: "blahg",
	});

	return { path: "blahg", posts };
}
