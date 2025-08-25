"use client";
import { useState, useEffect } from "react";
import { FaLock, FaRegBookmark, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ComponentPreview from "@/Components/Shared/ComponentPreview";
import CodeBlock from "@/Components/Shared/CodeBlock";

export default function ComponentsClient({ initialComponents }) {
  const [components, setComponents] = useState(initialComponents);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const categories = ["Button", "Card", "Navbar", "Footer"];

  useEffect(() => {
    let filtered = initialComponents;

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (filterType === "Free") {
      filtered = filtered.filter((item) => item.price === 0);
    } else if (filterType === "Premium") {
      filtered = filtered.filter((item) => item.price > 0);
    } else if (filterType === "Latest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (filterType === "Most Downloaded") {
      filtered = [...filtered].sort((a, b) => b.downloads - a.downloads);
    }

    setComponents(filtered);
  }, [search, filterType, category, initialComponents]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse Components</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg overflow-hidden w-full md:w-1/3">
          <FaSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">Sort / Filter</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
          <option value="Latest">Latest</option>
          <option value="Most Downloaded">Most Downloaded</option>
        </select>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {components.map((comp) => (
          <ComponentCard key={comp._id} comp={comp} router={router} />
        ))}
      </div>
    </div>
  );
}

function ComponentCard({ comp, router }) {
  const [activeTab, setActiveTab] = useState("preview");

  const handleTabChange = (tab) => {
    if (tab === "code" && comp.price > 0) {
      router.push(`/payment/${comp._id}`); // redirect to payment page
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition ">
      {/* Tabs */}
      <div className=" flex justify-between  mb-4 border-b">
        <div className=" flex gap-5">
          <button
            onClick={() => handleTabChange("preview")}
            className={`pb-2 ${
              activeTab === "preview"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Preview
          </button>

          <button
            onClick={() => handleTabChange("code")}
            className={`pb-2 flex items-center gap-2 ${
              activeTab === "code"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Code
            {comp.price > 0 && (
              <FaLock className="text-gray-400 text-sm" />
            )}{" "}
            {/* ✅ Lock icon */}
          </button>
        </div>

        <div>
          <button
            onClick={() => handleTabChange("code")}
            className={`pb-2 flex items-center gap-2 ${
              activeTab === "code"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaRegBookmark className="text-gray-400 text-lg" />
          </button>
        </div>
      </div>

      {activeTab === "preview" ? (
        <ComponentPreview previewCode={comp.previewCode} />
      ) : (
        <CodeBlock code={comp.previewCode} /> // ✅ replaced inline syntax highlighter
      )}

      {/* Info */}
      <h3 className="font-semibold mt-4">{comp.title}</h3>
      <p className="text-sm text-gray-500">{comp.category}</p>
      <p className="text-sm text-gray-600">
        {comp.price === 0 ? "Free" : `$${comp.price}`}
      </p>
      <p className="text-xs text-gray-400">{comp.downloads} downloads</p>
    </div>
  );
}
