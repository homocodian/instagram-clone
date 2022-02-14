import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import useOutsideAlerter from "../../utils/hooks/useOutsideAlerter";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { errorMessage } from "../../utils/atoms/errorMessage";
import { useSetRecoilState } from "recoil";
import { User } from "firebase/auth";
import getErrorMessage from "../../utils/firebaseErrors";
import autoSize from "autosize";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface IProps {
  id: string;
  user: User | null;
}

function CommentBox({ id, user }: IProps) {
  const {
    elementRef,
    setVisible: setShowEmojiPicker,
    visible: showEmojiPicker,
  } = useOutsideAlerter(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const setCommentError = useSetRecoilState(errorMessage);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const onEmojiClick = (_: any, emojiObject: any) => {
    setInput((prev) => prev + emojiObject.emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isPostingComment) return;
    setIsPostingComment(true);
    try {
      await addDoc(collection(db, `posts/${id}/comments`), {
        displayName: user?.displayName,
        profile: user?.photoURL,
        email: user?.email,
        uid: user?.uid,
        comment: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      setCommentError(getErrorMessage(error));
    } finally {
      setInput("");
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      autoSize(inputRef.current);
    }
  }, []);

  return (
    <div className="mt-2 px-4 py-3 border-t relative">
      {/* emoji picker */}
      {showEmojiPicker && (
        <div ref={elementRef}>
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              position: "absolute",
              bottom: "100%",
              left: "4px",
              zIndex: "10",
            }}
            disableSearchBar
            disableSkinTonePicker
            disableAutoFocus
            native
          />
        </div>
      )}
      <form
        className="flex items-center justify-between max-h-20"
        onSubmit={postComment}
      >
        {/* emoji picker */}
        <button onClick={handleEmojiPicker} type="button">
          <EmojiHappyIcon className="h-7 text-gray-900" />
        </button>
        {/* write comment */}
        <div className="flex-1 mx-4">
          <textarea
            ref={inputRef}
            value={input}
            maxLength={500}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            className="outline-none placeholder-gray-400 text-sm w-full 
              resize-none min-h-[20px] max-h-20"
            placeholder="Add a comment..."
          />
        </div>
        {/* post comment */}
        <button
          className={`capitalize text-sm font-semibold text-blue-500 ${
            !input ? "opacity-40" : "opacity-100"
          }`}
          disabled={!input ? true : false}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentBox;
