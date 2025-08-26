"use client";
import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaRegBookmark,
  FaSearch,
  FaFilter,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

import CodeBlock from "@/Components/Shared/CodeBlock";

export default function ComponentsClient({ initialComponents }) {
  const [components, setComponents] = useState(initialComponents);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const router = useRouter();

  const categories = ["Button", "Card", "Navbar", "Footer"];
  const types = ["Free", "Premium", "Latest", "Most Downloaded"];

  useEffect(() => {
    let filtered = initialComponents;

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
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
  }, [search, filterType, selectedCategory, initialComponents]);

  return (
    <div className="flex max-h-screen relative">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col min-h-screen bg-white/90 backdrop-blur-lg shadow-2xl transition-all duration-300 p-4 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              FrostUI
            </h2>
          )}
          <button
            className="text-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] text-gray-700 ${
                selectedCategory === cat ? "bg-blue-200" : ""
              }`}
            >
              <FaFilter className="text-gray-600" />
              {!collapsed && <span>{cat}</span>}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory("")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] text-gray-700"
          >
            <FaFilter className="text-gray-600" />
            {!collapsed && <span>All Categories</span>}
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-lg shadow-xl transform transition-transform duration-300 z-50 w-64 p-4 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">FrostUI</h2>
          <button className="text-gray-700" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] text-gray-700 ${
                selectedCategory === cat ? "bg-blue-200" : ""
              }`}
            >
              <FaFilter className="text-gray-600" />
              <span>{cat}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedCategory("");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] text-gray-700"
          >
            <FaFilter className="text-gray-600" />
            <span>All Categories</span>
          </button>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto w-full">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Components</h1>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <FaBars size={22} />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
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

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">Sort / Filter</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 gap-6">
          {components.map((comp) => (
            <ComponentCard key={comp._id} comp={comp} router={router} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Import ComponentPreview directly instead of lazy loading to avoid React import issues
import ComponentPreview from "@/Components/Shared/ComponentPreview";

function ComponentCard({ comp, router }) {
  const [activeTab, setActiveTab] = useState("preview");

  const handleTabChange = (tab) => {
    if (tab === "code" && comp.price > 0) {
      router.push(`/payment/${comp._id}`);
    } else {
      setActiveTab(tab);
    }
  };

  // Preprocess the preview code to ensure proper className handling
  const processedPreviewCode = comp.previewCode?.replace(/class=/g, 'className=') || '';

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition bg-white">
      {/* Tabs */}
      <div className="flex justify-between mb-4 border-b">
        <div className="flex gap-5">
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
            Code {comp.price > 0 && <FaLock className="text-gray-400 text-sm" />}
          </button>
        </div>

        <div>
          <button className="pb-2 flex items-center gap-2 text-gray-400">
            <FaRegBookmark className="text-lg" />
          </button>
        </div>
      </div>

      {activeTab === "preview" ? (
        <ComponentPreview previewCode={processedPreviewCode} />
      ) : (
        <CodeBlock code={comp.previewCode} />
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
