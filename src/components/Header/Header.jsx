"use client";
import "./Header.css";
import NavBar from "./NavBar/NavBar";

export default function Header() {
  return (
    <header className="bg-zinc-800 flex flex-col items-center ">
      <h1 className="font-bold text-white pt-5 uppercase text-2xl">
        Hiking the Atlas
      </h1>
      <p className="text-white pb-5 uppercase text-sm">
        A Hiking Blog by Will Sparkes
      </p>
      <NavBar />
    </header>
  );
}
