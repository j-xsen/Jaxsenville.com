import { format } from "date-fns";
import PostListing from "../../types/PostListing";

export default function BlahgPost({ data }: { data: PostListing }) {
	return (
		<>
			<div className={`Frame Frame0 Blahg open`}>
				<h3>{data.title}</h3>
				<p className="date">{format(data.created_at, "d MMMM u")}</p>
				<p className="content">{data.content}</p>
			</div>
		</>
	);
}
