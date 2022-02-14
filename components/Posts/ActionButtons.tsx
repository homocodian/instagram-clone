import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { errorMessage } from "../../utils/atoms/errorMessage";
import { db } from "../../utils/firebase";
import getErrorMessage from "../../utils/firebaseErrors";
import {
  BookmarkIcon as BookmarkIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

interface IProps {
  user: User | null;
  id: string;
}

function ActionButtons({ user, id }: IProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const setLikeError = useSetRecoilState(errorMessage);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const handlePostSave = () => setHasSaved((prev) => !prev);

  // get likes of post
  useEffect(
    () =>
      onSnapshot(query(collection(db, `posts/${id}/likes`)), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [id]
  );

  // check if user has liked this post
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes, user]);

  const handleLike = async () => {
    try {
      if (!hasLiked) {
        await setDoc(doc(db, `posts/${id}/likes/${user?.uid}`), {
          displayName: user?.displayName,
          uid: user?.uid,
          email: user?.email,
        });
      } else {
        await deleteDoc(doc(db, `posts/${id}/likes/${user?.uid}`));
      }
    } catch (error) {
      setLikeError(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-4">
          {/* like */}
          <button onClick={handleLike}>
            {hasLiked ? (
              <HeartIconFilled className="h-7 text-red-500" />
            ) : (
              <HeartIcon className="h-7 text-gray-900" />
            )}
          </button>
          {/* comments */}
          <button>
            <ChatIcon className="h-7 text-gray-900" />
          </button>
          {/* share */}
          <button>
            <PaperAirplaneIcon className="h-6 rotate-45 text-gray-900" />
          </button>
        </div>
        <div>
          {/* save post */}
          <button onClick={handlePostSave}>
            {hasSaved ? (
              <BookmarkIconFilled className="h-6 text-gray-900" />
            ) : (
              <BookmarkIcon className="h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>
      {/* number of likes */}
      <div>
        {likes.length > 0 && (
          <p className="font-semibold text-sm">{`${likes.length} likes`}</p>
        )}
      </div>
    </>
  );
}

export default ActionButtons;
