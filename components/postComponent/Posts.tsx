import { useEffect, useState } from "react";

import {
	collection,
	DocumentData,
	limit,
	orderBy,
	QueryDocumentSnapshot,
	getDocs,
	query,
	startAfter,
	QuerySnapshot,
	onSnapshot,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import Skeleton from "../Skeleton";
import { db } from "@utils/firebase";
import UploadPostModal from "./UploadPostModal";
import getErrorMessage from "@utils/firebaseErrors";
import { errorMessage } from "@utils/atoms/errorMessage";

function Posts() {
	const postRef = collection(db, "posts");
	const [hasMore, setHasMore] = useState(true);
	const setPostfetchError = useSetRecoilState(errorMessage);
	const [cursor, setCursor] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null);
	const [realtimePosts, setRealtimePosts] = useState<
		QueryDocumentSnapshot<DocumentData>[]
	>([]);

	const updatePostsState = (
		snapshot: QuerySnapshot<DocumentData>,
		isNewPost = false
	) => {
		if (snapshot.size === 0) {
			setHasMore(false);
			return;
		} else {
			setRealtimePosts((prev) => {
				if (!isNewPost) return [...prev, ...snapshot.docs];
				else return snapshot.docs;
			});
			setCursor(snapshot.docs[snapshot.docs.length - 1]);
			setHasMore(true);
		}
	};

	useEffect(
		() =>
			onSnapshot(
				query(postRef, orderBy("timestamp", "desc"), limit(5)),
				(snapshot) => {
					updatePostsState(snapshot, true);
				}
			),
		[]
	);

	async function fetchPosts() {
		try {
			const snapshot = await getDocs(
				query(
					postRef,
					orderBy("timestamp", "desc"),
					startAfter(cursor),
					limit(5)
				)
			);
			updatePostsState(snapshot);
		} catch (error) {
			setPostfetchError(getErrorMessage(error));
		}
	}

	function deleteRealtimePost(id: string) {
		setRealtimePosts((prev) => prev.filter((prevPost) => prevPost.id !== id));
	}

	return (
		<>
			<InfiniteScroll
				dataLength={realtimePosts.length}
				hasMore={hasMore}
				loader={<Skeleton />}
				next={fetchPosts}
				endMessage={<EndMessage />}
			>
				{realtimePosts.map((doc) => {
					const { email, caption, timestamp, images, profile } = doc.data();
					return (
						<Post
							key={doc.id}
							id={doc.id}
							username={email}
							profile={profile}
							caption={caption}
							timestamp={timestamp}
							images={images}
							deleteRealtimePost={deleteRealtimePost}
						/>
					);
				})}
			</InfiniteScroll>
			<UploadPostModal />
		</>
	);
}

export default Posts;

function EndMessage() {
	return (
		<p className="text-gray-400 text-center">You have reached the end 🥳.</p>
	);
}
