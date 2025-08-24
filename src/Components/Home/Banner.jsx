"use client";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import robotWorker from '../../../public/animation/Man and robot with computers sitting together in workplace.json'

export default function Banner() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate all random positions and styles on client only
    const generated = Array.from({ length: 30 }, () => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex items-center justify-center overflow-hidden">
      {/* Snow Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Text */}
        <div className="text-white space-y-6">
          <span className="inline-block px-4 py-1 bg-blue-500/30 rounded-full border border-blue-300/30 backdrop-blur-sm text-sm">
            🚀 Build Faster, Look Better
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Craft Stunning UI Components <br /> in Seconds
          </h1>
          <p className="text-blue-100 text-lg max-w-md">
            FrostUI lets you browse, save, and create high-quality, responsive UI components. 
            Whether you’re a developer, designer, or creator – your toolkit just got supercharged.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition">
              🔍 Explore Components
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-lg shadow-lg transition backdrop-blur-sm">
              ✨ Become a Creator
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center">
          <motion.div
            className="relative w-80 h-56 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <img
              src="/assets/images/component-preview.png"
              alt="UI Component Preview"
              className="object-cover w-full h-full"
            /> */}
            <Lottie animationData={robotWorker} loop={true} />
          </motion.div>
          {["Buttons", "Cards", "Navbars", "Footers"].map((tag, idx) => (
            <motion.span
              key={tag}
              className="absolute px-3 py-1 bg-blue-500/40 text-white rounded-full text-sm backdrop-blur-sm border border-white/20"
              style={{
                top: `${20 + idx * 15}%`,
                right: idx % 2 === 0 ? "-3rem" : "auto",
                left: idx % 2 !== 0 ? "-3rem" : "auto",
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + idx,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center text-white opacity-70">
        <span className="text-sm">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
