import dynamic from "next/dynamic";
import { useState } from "react";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  BookmarkIcon as BookmarkIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import TimeAgo, { Unit, Suffix } from "react-timeago";
import { Timestamp } from "firebase/firestore";

interface IProps {
  date: Timestamp;
  username: string;
  likes?: number;
  caption: string;
  numberOfComments?: number;
}

function Footer({ username, likes, date, caption, numberOfComments }: IProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [input, setInput] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handlePostLike = () => setHasLiked((prev) => !prev);
  const handlePostSave = () => setHasSaved((prev) => !prev);

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

  const onEmojiClick = (_: any, emojiObject: any) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="m-4 flex flex-col gap-2">
        {/* action buttons */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <button onClick={handlePostLike}>
              {hasLiked ? (
                <HeartIconFilled className="h-7 text-red-500" />
              ) : (
                <HeartIcon className="h-7 text-gray-900" />
              )}
            </button>
            <button>
              <ChatIcon className="h-7 text-gray-900" />
            </button>
            <button>
              <PaperAirplaneIcon className="h-6 rotate-45 text-gray-900" />
            </button>
          </div>
          <div>
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
          {likes && <p className="font-semibold text-sm">{`${likes} likes`}</p>}
        </div>
        {/* commets */}
        <div>
          {caption && (
            <p className="text-sm truncate max-w-[90%]">
              <span className="font-semibold text-sm">{username}</span>
              {` ${caption}`}
            </p>
          )}
        </div>
        <div>
          {numberOfComments && (
            <p className="text-sm text-gray-400 cursor-pointer">
              {`view all ${numberOfComments} comments`}
            </p>
          )}
        </div>
        <p className="uppercase text-xs text-gray-400 cursor-pointer">
          {/* @ts-ignore */}
          <TimeAgo date={date?.toDate()} minPeriod={60} formatter={formatter} />
        </p>
      </div>
      <div className="mt-2 px-4 py-3 border-t relative">
        <div className="flex">
          {showEmojiPicker && (
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{
                position: "absolute",
                bottom: "100%",
                left: "4px",
              }}
              disableSearchBar
              disableSkinTonePicker
              disableAutoFocus
              native
            />
          )}
          <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <EmojiHappyIcon className="h-7 text-gray-900" />
          </button>
          <form className="flex-1 mx-4" onSubmit={postComment}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="outline-none placeholder-gray-400 text-sm w-full
              max-h-[40px]"
              placeholder="Add a comment..."
            />
          </form>
          <button
            className={`capitalize text-sm font-semibold text-blue-500 ${
              !input ? "opacity-40" : "opacity-100"
            }`}
            disabled={!input ? true : false}
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
