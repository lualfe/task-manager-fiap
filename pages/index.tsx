import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Principal } from "../containers/Principal";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);

  return <Principal />;
};

export default Home;
