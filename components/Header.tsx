/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState } from "react";

type HeaderProps = {
  sair(): void;
  showModal(): void;
};

export const Header: NextPage<HeaderProps> = ({ sair, showModal }) => {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullName = localStorage.getItem("name");
      setFirstName(fullName?.split(" ")[0] || "");
    }
  }, []);

  return (
    <div className="container-header">
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
      <button onClick={showModal}>
        <span>+</span> Adicionar tarefa
      </button>
      <div className="mobile">
        <span>Olá, {firstName}</span>
        <img src="/exit-mobile.svg" alt="Sair" onClick={sair} />
      </div>
      <div className="desktop">
        <span>Olá, {firstName}</span>
        <img src="/exit-desktop.svg" alt="Sair" onClick={sair} />
      </div>
    </div>
  );
};
