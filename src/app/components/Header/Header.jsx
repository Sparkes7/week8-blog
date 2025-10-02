"use client";
import "./Header.css";
import NavBar from "./NavBar/NavBar";

export default function Header() {
  return (
    <header className="bg-zinc-800 flex flex-col items-center">
      <NavBar />
    </header>
  );
}
