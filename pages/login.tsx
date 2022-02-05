import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import InstagramLogo from "../public/instagram.png";

const login: NextPage = () => {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-16 h-screen">
        <Image
          src={InstagramLogo}
          alt="instagram logo"
          width={150}
          height={150}
          placeholder="blur"
        />
        <button
          className="px-8 py-2 text-lg tracking-wider rounded-md 
          bg-gradient-to-bl from-fuchsia-600 to-yellow-500 text-white"
          onClick={login}
        >
          login
        </button>
      </div>
    </main>
  );
};

export default login;
