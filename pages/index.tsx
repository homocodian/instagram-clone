import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../utils/AuthProvider";
import { useEffect } from "react";
import Header from "../components/header";
import MainComponent from "../components/MainComponent";

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="instagram clone by Ashish" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header />
      <MainComponent />
    </div>
  );
};

export default Home;
