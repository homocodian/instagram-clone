import Post from "./Post";
import Skeleton from "../Skeleton";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import UploadPostModal from "./UploadPostModal";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";

function Posts() {
  const [realtimePosts, setRealtimePosts] = useState<
    QueryDocumentSnapshot<DocumentData>[] | null
  >(null);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setRealtimePosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <>
      <div>
        {realtimePosts && realtimePosts.length > 0 ? (
          realtimePosts.map((doc) => {
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
          <Skeleton />
        )}
      </div>
      <UploadPostModal />
    </>
  );
}

export default Posts;
