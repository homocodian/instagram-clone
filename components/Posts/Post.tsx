import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import PostCarousel from "./PostCarousel";
import Footer from "./Footer";
import { useState } from "react";
import PostOptions from "./PostOptions";

interface IProps {
  id: string;
  profile: string;
  username: string;
  likes: number;
  caption: string;
  timestamp: Date;
  numberOfComments: number;
  images: string[];
}

function Post({
  id,
  username,
  timestamp,
  profile,
  likes,
  caption,
  numberOfComments,
  images,
}: IProps) {
  const [isPostOptionOpen, setIsPostOptionsOpen] = useState(false);

  function closeModal() {
    setIsPostOptionsOpen(false);
  }

  function openModal() {
    setIsPostOptionsOpen(true);
  }

  return (
    <>
      <div className="border rounded-[3px] bg-white mb-6">
        <div>
          <header className="px-3 py-[10px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-[2px] rounded-full bg-gradient-to-bl 
              from-fuchsia-700 to-amber-500"
              >
                <div className="p-[2px] bg-white rounded-full">
                  <img
                    className="rounded-full object-cover h-[36px] w-[36px]"
                    src={profile}
                    alt=""
                  />
                </div>
              </div>
              <p className="font-semibold text-sm">{username}</p>
            </div>
            <div className="text-center cursor-pointer" onClick={openModal}>
              <DotsHorizontalIcon className="h-4 w-4 text-gray-900" />
            </div>
          </header>
          <PostCarousel>
            {images.map((image) => (
              <div key={id} className="relative w-full h-[450px] sm:h-[600px]">
                <Image
                  priority
                  layout="fill"
                  objectFit="cover"
                  src={image}
                  alt=""
                />
              </div>
            ))}
          </PostCarousel>
          <Footer
            username={username}
            date={timestamp}
            likes={likes}
            caption={caption}
            numberOfComments={numberOfComments}
          />
        </div>
      </div>
      <PostOptions isOpen={isPostOptionOpen} closeModal={closeModal} />
    </>
  );
}

export default Post;
