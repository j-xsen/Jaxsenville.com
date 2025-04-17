import client from "../../../../utils/contentful";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

import BlahgContextPage from "../types/BlahgContextPage";

async function data(pageContext: BlahgContextPage) {
	// const { data: post } = await supabase
	// 	.from("Blahg")
	// 	.select("ID, created_at, title, content, url")
	// 	.eq("ID", pageContext.routeParams.id);
	const post = await client.getEntries({
		content_type: "blahg",
		"fields.url": pageContext.routeParams.glahb,
	});

	return { path: "blahg", post };
}
