"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";
import Image from "next/image";

// Hardcoded data (replace with DB fetch later)
const trendingData = [
  {
    id: 1,
    name: "Gradient Button",
    category: "Buttons",
    image: "/assets/images/components/button1.png",
    premium: false,
  },
  {
    id: 2,
    name: "Card UI Kit",
    category: "Cards",
    image: "/assets/images/components/card1.png",
    premium: true,
  },
  {
    id: 3,
    name: "Minimal Navbar",
    category: "Navbars",
    image: "/assets/images/components/navbar1.png",
    premium: false,
  },
  {
    id: 4,
    name: "Frost Footer",
    category: "Footers",
    image: "/assets/images/components/footer1.png",
    premium: true,
  },
  {
    id: 5,
    name: "Login Form",
    category: "Forms",
    image: "/assets/images/components/form1.png",
    premium: false,
  },
];

export default function TrendingComponents() {
  return (
<SectionContainer className="py-20 bg-white">
   
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">
          Trending Components
        </h2>
        <p className="text-blue-700 mb-12 text-center max-w-xl mx-auto">
          Check out the most popular UI components used by our community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingData.map((comp, i) => (
            <motion.div
              key={comp.id}
              className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={comp.image}
                  alt={comp.name}
                  fill
                  className="object-cover"
                />
                {comp.premium && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-blue-900 px-2 py-1 text-xs rounded font-semibold">
                    Premium
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900">{comp.name}</h3>
                <p className="text-blue-700 text-sm mt-1">{comp.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    
</SectionContainer>
  );
}
