"use client";
import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/NavBar";
import NextAuthProvider from "@/Provider/NextAuthProvider";
import React from "react";
import { ToastContainer } from "react-toastify";

const LayoutClient = ({ children }) => {
  return (
    <div>
      <NextAuthProvider>
        <Navbar></Navbar>
        <div className="min-h-screen ">{children}</div>
        <Footer></Footer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </NextAuthProvider>
    </div>
  );
};

export default LayoutClient;
