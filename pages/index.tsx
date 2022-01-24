import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="instagram clone by Ashish" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
