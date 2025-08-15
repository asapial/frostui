"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { motion } from "framer-motion";

export default function SubscriptionModel() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        "Access free components",
        "Save up to 20 components",
        "Basic dashboard",
        "Dark mode support",
      ],
      button: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      features: [
        "Access premium components",
        "Save unlimited components",
        "Notifications board",
        "Payment history tracking",
      ],
      button: "Upgrade Now",
      highlighted: true,
    },
    {
      name: "Creator Pro",
      price: "$19",
      period: "/month",
      features: [
        "All Pro features",
        "Sell premium components",
        "Withdraw earnings",
        "Creator analytics",
      ],
      button: "Become a Creator",
      highlighted: false,
    },
  ];

  return (
    <SectionContainer className="relative customGradiant1">
      <div className="text-center mb-12">
        <h2 className="headerStyle">Choose Your Plan</h2>
        <p className="descriptionStyle">
          Flexible pricing for developers, designers, and creators.
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`boxStyle transition transform hover:-translate-y-2 ${
              plan.highlighted
                ? "bg-blue-600 text-white border-blue-700"
                : "customGradiant2"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            <div className="text-4xl font-bold mb-6">
              {plan.price} <span className="text-lg">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.highlighted
                  ? "bg-white text-blue-700 hover:bg-blue-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
