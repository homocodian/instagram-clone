import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../utils/AuthProvider";
import { useEffect } from "react";
import Header from "../components/header/Header";
import MainComponent from "../components/MainComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { errorMessage } from "../utils/atoms/errorMessage";

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  const [toastMessage, setToastMessage] = useRecoilState(errorMessage);
  useEffect(() => {
    if (!toastMessage) return;
    toast.warn(toastMessage, {
      onClose: () => {
        setToastMessage(null);
      },
    });
  }, [toastMessage]);

  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="instagram clone by Ashish" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header />
      <MainComponent />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Home;
