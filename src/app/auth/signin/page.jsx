"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import {
  handleGoogleSignIN,
  handleSignIN,
} from "@/actions/authentication/signin";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }

    // TODO: Backend login logic
    console.log("Logging in with:", formData);

    const res = await handleSignIN(formData);

    if (res.code === "ERROR") {
      toast.error(res.message);
    } else {
      toast.success("Signed in successfully!");
      window.location.href = res.url;
    }
  };

  return (
    <SectionContainer className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500">
      <div className="min-h-screen flex items-center justify-center p-6">
        <ToastContainer />
        <div className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/40">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>
          <p className="text-blue-100 text-center mb-8">
            Sign in to continue to{" "}
            <span className="font-semibold">FrostUI</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 mb-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full  pl-10 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 mb-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
              {" "}
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full  pl-10 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-blue-300/30" />
            <span className="px-4 text-blue-200 text-sm">OR</span>
            <hr className="flex-1 border-blue-300/30" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIN}
            className="w-full flex items-center justify-center gap-3 bg-white text-blue-600 p-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
          >
            <FaGoogle className="text-red-500" /> Sign in with Google
          </button>

          {/* Footer */}
          <p className="text-center text-blue-100 mt-6 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-white font-semibold hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
