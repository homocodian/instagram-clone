import {
  HomeIcon,
  ChatIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  ChatIcon as ChatIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Icons from "./Icons";

function Right() {
  const [activeIcons, setActiveIcons] = useState({
    home: true,
    chat: false,
    activity: false,
  });
  const handleChangeChange = (title: string) => {
    switch (title) {
      case "home":
        setActiveIcons({
          home: true,
          chat: false,
          activity: false,
        });
        break;
      case "chat":
        setActiveIcons({
          home: false,
          chat: true,
          activity: false,
        });
        break;
      case "activity":
        setActiveIcons({
          home: false,
          chat: false,
          activity: true,
        });
        break;

      default:
        break;
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Icons
        Icon={activeIcons.home ? HomeIconFilled : HomeIcon}
        title="home"
        handleStateChange={handleChangeChange}
      />
      <Icons
        Icon={activeIcons.chat ? ChatIconFilled : ChatIcon}
        title="chat"
        handleStateChange={handleChangeChange}
      />
      <Icons
        Icon={PlusCircleIcon}
        title="post"
        handleStateChange={handleChangeChange}
      />
      <Icons
        Icon={activeIcons.activity ? HeartIconFilled : HeartIcon}
        title="activity"
        handleStateChange={handleChangeChange}
      />
      <div className="rounded-full flex items-start justify-center cursor-pointer">
        <Image
          priority
          layout="fixed"
          height={25}
          width={25}
          src={
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          }
          alt="profile"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Right;