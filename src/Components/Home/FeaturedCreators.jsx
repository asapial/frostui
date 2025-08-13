"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";
import Image from "next/image";

// Hardcoded data (replace with DB fetch later)
const creatorsData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "UI Designer",
    photo: "/assets/images/creators/alice.jpg",
    components: 45,
  },
  {
    id: 2,
    name: "Brian Lee",
    role: "Front-End Developer",
    photo: "/assets/images/creators/brian.jpg",
    components: 32,
  },
  {
    id: 3,
    name: "Clara Smith",
    role: "UX/UI Designer",
    photo: "/assets/images/creators/clara.jpg",
    components: 58,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Full Stack Developer",
    photo: "/assets/images/creators/david.jpg",
    components: 29,
  },
  {
    id: 5,
    name: "Ella Brown",
    role: "UI/UX Specialist",
    photo: "/assets/images/creators/ella.jpg",
    components: 38,
  },
];

export default function FeaturedCreators() {
  return (
<SectionContainer className=" bg-amber-50">

      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">
          Featured Creators
        </h2>
        <p className="text-blue-700 mb-12 text-center max-w-xl mx-auto">
          Meet the talented creators contributing amazing UI components to FrostUI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {creatorsData.map((creator, i) => (
            <motion.div
              key={creator.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={creator.photo}
                  alt={creator.name}
                  fill
                  className="object-cover rounded-full border-4 border-blue-200"
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">{creator.name}</h3>
              <p className="text-blue-700 text-sm">{creator.role}</p>
              <p className="text-blue-600 text-sm mt-1">
                {creator.components} Components
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    
</SectionContainer>
  );
}
