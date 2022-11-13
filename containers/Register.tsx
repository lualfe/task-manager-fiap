/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { executeRequest } from "../services/api";

export const Register: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);

  const doRegister = async () => {
    try {
      if (!email || !password) {
        return setError("Favor preencher os campos.");
      }

      setLoading(true);

      const body = {
        email,
        name,
        password,
      };

      const result = await executeRequest("user", "POST", body);
      if (result.status == 201) {
        const loginBody = {
          login: email,
          password,
        };
        const loginResult = await executeRequest("login", "POST", loginBody);
        if (loginResult && loginResult.data) {
          localStorage.setItem("accessToken", loginResult.data.token);
          localStorage.setItem("name", loginResult.data.name);
          localStorage.setItem("email", loginResult.data.email);
          router.push("/");
        }
      }
    } catch (e: any) {
      console.log("Ocorreu erro ao efetuar o cadastro:", e);
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
      } else {
        setError("Ocorreu erro ao efetuar o cadastro, tente novamente.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container-register">
      <div className="form">
        {error && <p>{error}</p>}
        <div>
          <img src="/mail.svg" alt="E-mail" />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <img src="/user.png" alt="Nome" />
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <img src="/lock.svg" alt="Senha" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={doRegister} disabled={loading}>
          {loading ? "...Carregando" : "Cadastrar"}
        </button>
        <Link href="/login">Já tenho uma conta</Link>
      </div>
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
    </div>
  );
};
