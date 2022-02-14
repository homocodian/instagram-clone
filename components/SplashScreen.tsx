import Image from "next/image";
import InstagramLogo from "../public/instagram.png";

function Loading() {
  return (
    <div className="grid place-items-center h-screen">
      <Image
        src={InstagramLogo}
        alt="instgram logo"
        width={50}
        height={50}
        placeholder="blur"
      />
    </div>
  );
}

export default Loading;
