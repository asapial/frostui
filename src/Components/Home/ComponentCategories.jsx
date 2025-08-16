"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Hardcoded data for now (replace with DB data later)
const categoryData = [
  {
    id: 1,
    name: "Buttons",
    description: "A variety of stylish and responsive buttons.",
    icon: "🔘",
  },
  {
    id: 2,
    name: "Cards",
    description: "Beautiful card layouts for any project.",
    icon: "🃏",
  },
  {
    id: 3,
    name: "Navbars",
    description: "Navigation bars for every type of website.",
    icon: "📑",
  },
  {
    id: 4,
    name: "Footers",
    description: "Professional and minimal website footers.",
    icon: "📉",
  },
  {
    id: 5,
    name: "Forms",
    description: "User-friendly forms for signups and logins.",
    icon: "📝",
  },
  {
    id: 6,
    name: "Modals",
    description: "Interactive pop-up modals for engagement.",
    icon: "💬",
  },
];

export default function ComponentCategories() {
  const [categories, setCategories] = useState(categoryData);

  // Later: Replace with DB fetch
  // useEffect(() => {
  //   fetch("/api/categories")
  //     .then(res => res.json())
  //     .then(data => setCategories(data));
  // }, []);

  return (
<SectionContainer className="customGradient3">

      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="headerStyle">
          Explore Component Categories
        </h2>
        <p className="descriptionStyle">
          Browse from a variety of pre-built UI components for your projects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="boxStyle customGradiant2 flex flex-col items-centertransition cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-semibold text-primary">{cat.name}</h3>
              <p className="text-secondary text-sm mt-2">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    
</SectionContainer>
  );
}
