import { format } from "date-fns";
import { BlahgEntrySkeleton } from "../../types/BlahgEntrySkeleton";

export default function BlahgPost({ data }: { data: BlahgEntrySkeleton }) {
	return (
		<>
			<div className={`Frame Frame0 Blahg open`}>
				<h3>{data.fields.title.toString()}</h3>
				<p className="date">
					{format(data.fields.createdAt.toString(), "d MMMM u")}
				</p>
				<p className="content">{data.fields.content.toString()}</p>
			</div>
		</>
	);
}
