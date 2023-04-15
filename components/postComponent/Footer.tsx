import { useEffect, useState } from "react";

import {
	collection,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
	QueryDocumentSnapshot,
	Timestamp,
} from "firebase/firestore";
import TimeAgo, { Unit, Suffix } from "react-timeago";

import { db } from "@utils/firebase";
import CommentBox from "./CommentBox";
import ActionButtons from "./ActionButtons";
import replaceURLs from "@utils/replaceUrls";
import { useAuth } from "@utils/AuthProvider";

interface IProps {
	id: string;
	date: Timestamp;
	username: string;
	caption: string;
}

interface LastComments {
	id: string;
	comment: string;
	username: string;
}

function Footer({ id, username, date, caption }: IProps) {
	const { user } = useAuth();
	const [lastTwoComments, setLastTwoComments] = useState<LastComments[]>([]);

	const [comments, setComments] = useState<
		QueryDocumentSnapshot<DocumentData>[]
	>([]);

	function formatter(
		value: number,
		unit: Unit,
		suffix: Suffix,
		millis: number,
		defaultFormatter: (
			value: number,
			unit: Unit,
			suffix: Suffix,
			millis: number
		) => string
	) {
		if (unit === "second") {
			return "Just now";
		} else {
			return defaultFormatter(value, unit, suffix, millis);
		}
	}

	// get comments of post
	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, `posts/${id}/comments`),
					orderBy("timestamp", "desc")
				),
				(snapshot) => {
					setComments(snapshot.docs);
				}
			),
		[id]
	);

	useEffect(() => {
		setLastTwoComments(
			comments
				.slice(0, 2)
				.map((comment) => ({
					id: comment.id,
					comment: comment.data().comment,
					username: comment.data().email,
				}))
				.reverse()
		);
	}, [comments]);

	return (
		<>
			<div className="m-4 flex flex-col gap-2">
				{/* action buttons */}
				<ActionButtons id={id} user={user} />
				{/* caption */}
				<div>
					{caption && (
						<p className="text-sm max-w-[90%]">
							<span className="font-semibold text-sm">{username + " "}</span>
							<span dangerouslySetInnerHTML={replaceURLs(caption)} />
						</p>
					)}
				</div>
				<div>
					{comments.length > 0 && (
						<div>
							<p className="text-sm text-gray-400 cursor-pointer">
								{`View all ${
									comments.length > 2 ? comments.length : ""
								} comments`}
							</p>
							<div className="flex flex-col gap-[2px] mt-1">
								{lastTwoComments.map((comment) => (
									<p key={comment.id} className="text-sm truncate max-w-[90%]">
										<span className="font-semibold text-sm">
											{comment.username}
										</span>
										{` ${comment.comment}`}
									</p>
								))}
							</div>
						</div>
					)}
				</div>
				{/* post time */}
				<p className="uppercase text-xs text-gray-400 cursor-pointer">
					{/* @ts-ignore */}
					<TimeAgo date={date?.toDate()} minPeriod={60} formatter={formatter} />
				</p>
			</div>
			{/* write your comment */}
			<CommentBox id={id} user={user} />
		</>
	);
}

export default Footer;
