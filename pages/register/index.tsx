import type { NextPage } from "next";
import { Register } from "../../containers/Register";
import { useEffect } from "react";
import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);

  return <Register />;
};

export default RegisterPage;
