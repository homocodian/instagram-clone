import Post from "./Post";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import UploadPostModal from "./UploadPostModal";
import Loader from "../Loader";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";

function Posts() {
  const [realtimePosts, setRealtimePosts] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setRealtimePosts(snapshot);
        }
      ),
    []
  );

  return (
    <>
      <div>
        {realtimePosts && realtimePosts.docs.length > 0 ? (
          realtimePosts.docs.map((doc) => {
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
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <UploadPostModal />
    </>
  );
}

export default Posts;
