"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";
import { FaPlusCircle, FaBullhorn, FaStar } from "react-icons/fa";

// Hardcoded updates data (replace with DB fetch later)
const updatesData = [
  {
    id: 1,
    type: "new-component",
    title: "New Frost Button Added",
    description: "A stylish gradient button component is now available for all users.",
    date: "Aug 10, 2025",
  },
  {
    id: 2,
    type: "announcement",
    title: "FrostUI v2.1 Released",
    description: "Improved performance, added dark mode toggle, and better component previews.",
    date: "Aug 9, 2025",
  },
  {
    id: 3,
    type: "featured",
    title: "Clara Smith Featured Creator",
    description: "Clara’s card collection has been highlighted as trending this week.",
    date: "Aug 8, 2025",
  },
  {
    id: 4,
    type: "new-component",
    title: "Login Form Component Added",
    description: "A clean and responsive login form component is now available.",
    date: "Aug 7, 2025",
  },
];

export default function RecentUpdates() {
  // Function to choose icon based on update type
  const getIcon = (type) => {
    switch (type) {
      case "new-component":
        return <FaPlusCircle className="text-blue-500 w-6 h-6" />;
      case "announcement":
        return <FaBullhorn className="text-yellow-500 w-6 h-6" />;
      case "featured":
        return <FaStar className="text-pink-500 w-6 h-6" />;
      default:
        return <FaPlusCircle className="text-blue-500 w-6 h-6" />;
    }
  };

  return (
<SectionContainer className="py-20 bg-gradient-to-b from-blue-50 to-white">

      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">
          Recent Updates
        </h2>
        <p className="text-blue-700 mb-12 text-center max-w-xl mx-auto">
          Stay up-to-date with the latest additions and announcements from FrostUI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {updatesData.map((update, i) => (
            <motion.div
              key={update.id}
              className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-xl transition cursor-pointer border border-blue-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-shrink-0">{getIcon(update.type)}</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">{update.title}</h3>
                <p className="text-blue-700 text-sm mt-1">{update.description}</p>
                <span className="text-blue-400 text-xs mt-2 block">{update.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    
</SectionContainer>
  );
}
