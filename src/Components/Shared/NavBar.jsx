"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import NamePlate from "../UI/NamePlate";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    const [theme, setTheme] = useState(true);
  const NavList = (
    <>
      {" "}
      <li>
        <Link href={"/components"}>Components</Link>
      </li>
      <li>
        <a>Dashboard</a>
      </li>
    </>
  );

  const session = useSession();
  // console.log(session);
  // console.log(session.data.user.photo);

    const toggleTheme = () => {
    setTheme(!theme);
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    html.setAttribute(
      "data-theme",
      currentTheme === "frostUILight" ? "frostUIDark" : "frostUILight"
    );
  };

  return (
    <div className="customGradiant1">
      <div className="navbar  max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {NavList}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <NamePlate></NamePlate>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavList}</ul>
        </div>
        <div className="navbar-end flex gap-5">
            <button onClick={toggleTheme} className=" mr-5">
              {!theme ? <FaSun size={30} /> : <FaMoon size={30} />}
            </button>

          {session.status !== "authenticated" && (
            <div className=" flex gap-5">
              {" "}
              <Link
                href="/auth/signin"
                className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              >
                Register
              </Link>
            </div>
          )}

          {session.status === "authenticated" && (
            <button
              className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              onClick={() => signOut()}
            >
              SignOut
            </button>
          )}

          <div className="tooltip  tooltip-bottom">
            <div className="tooltip-content">
              <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
                {session?.data?.user?.name}
              </div>
            </div>
            <button className="">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img
                    src={`${
                      session?.data?.user?.photo ||
                      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }`}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
