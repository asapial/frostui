"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Hardcoded testimonials data (replace with DB fetch later)
const testimonialsData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "UI Designer",
    photo: "/assets/images/testimonials/alice.jpg",
    feedback:
      "FrostUI has completely transformed the way I build UI components. The library is intuitive and the designs are stunning!",
    rating: 5,
  },
  {
    id: 2,
    name: "Brian Lee",
    role: "Front-End Developer",
    photo: "/assets/images/testimonials/brian.jpg",
    feedback:
      "I love the flexibility FrostUI offers. Saving and buying components is seamless, and the live preview is amazing.",
    rating: 4,
  },
  {
    id: 3,
    name: "Clara Smith",
    role: "UX/UI Designer",
    photo: "/assets/images/testimonials/clara.jpg",
    feedback:
      "The creator dashboard is fantastic. I can manage my components, get feedback, and even earn from premium components!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
<SectionContainer>
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">What Our Users Say</h2>
        <p className="text-blue-700 mb-12 max-w-xl mx-auto">
          Hear from the creators and developers who are building amazing projects with FrostUI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testi, i) => (
            <motion.div
              key={testi.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition border border-blue-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-blue-500 mb-4 text-3xl">
                <FaQuoteLeft />
              </div>
              <p className="text-blue-700 mb-4">{testi.feedback}</p>
              <div className="flex items-center mb-4">
                {Array.from({ length: testi.rating }).map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={testi.photo}
                  alt={testi.name}
                  fill
                  className="object-cover rounded-full border-2 border-blue-200"
                />
              </div>
              <h4 className="text-blue-900 font-semibold">{testi.name}</h4>
              <p className="text-blue-700 text-sm">{testi.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    
</SectionContainer>
  );
}
