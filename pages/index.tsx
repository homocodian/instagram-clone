import Head from "next/head";
import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useAuth } from "../utils/AuthProvider";
import Header from "../components/header/Header";
import MainComponent from "../components/MainComponent";
import { errorMessage } from "../utils/atoms/errorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SplashScreen from "../components/SplashScreen";

const Home: NextPage = () => {
  const { user, loading } = useAuth();
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

  if (loading) {
    return <SplashScreen />;
  }

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
