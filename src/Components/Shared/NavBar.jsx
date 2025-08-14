import React from "react";
import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react"
import NamePlate from "../UI/NamePlate";

const Navbar = () => {
  const NavList = (
    <>
      {" "}
      <li>
        <Link href={'/components'}>Components</Link>
      </li>
      <li>
        <a>Dashboard</a>
      </li>
    </>
  );

//   const session = useSession();
//   console.log(session);
  return (
    <div>
      <div className="navbar bg-gray-900 shadow-sm text-white">
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
        <div className="navbar-end">
          {/* {session.status !== "authenticated" && (
            <div>
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
          )} */}

          {/* {session.status === "authenticated" && (
            <button
              className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              onClick={() => signOut()}
            >
              SignOut
            </button>
          )} */}


          <Link
                href="/auth/signin"
                className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="  btn bg-orange-500 rounded-xl text-white hover:bg-orange-600 btn-md shadow-orange-500 hover:shadow-2xs"
              >Register</Link>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
