import type { NextPage } from "next";
import { Login } from "../../containers/Login";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);

  return <Login />;
};

export default LoginPage;
