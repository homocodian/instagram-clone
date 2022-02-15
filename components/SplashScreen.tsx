import Image from "next/image";
import InstagramLogo from "../public/splash_screen_logo.png";

function SplashScreen() {
  return (
    <div className="grid place-items-center h-screen">
      <Image
        src={InstagramLogo}
        alt="instgram logo"
        width={40}
        height={40}
        placeholder="blur"
      />
    </div>
  );
}

export default SplashScreen;
