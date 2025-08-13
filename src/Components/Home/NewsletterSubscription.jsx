"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import NamePlate from "../UI/NamePlate";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <section className="relative py-24 bg-gray-900  overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>

      <div className="container relative mx-auto px-6 lg:px-12 text-center text-white">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
          Subscribe to <NamePlate />
        </h2>
        <p className="mb-10 text-blue-100 max-w-xl mx-auto text-lg">
          Stay ahead with exclusive UI components, design tips, and premium
          releases straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20"
        >
          <div className="relative w-full sm:w-auto flex-1">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200 text-lg" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-80 px-12 py-3 rounded-xl 
               bg-white/15 text-white placeholder-white/60 
               shadow-inner focus:outline-none focus:ring-4 
               focus:ring-white/30 transition"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-bold rounded-xl shadow-lg hover:from-blue-50 hover:to-white transition-all duration-300 hover:scale-105"
          >
            Subscribe
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-6 text-blue-200 text-lg animate-fadeIn">{message}</p>
        )}
      </div>
    </section>
  );
}

// bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-500
