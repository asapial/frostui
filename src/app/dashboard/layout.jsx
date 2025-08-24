"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  const { status } = useSession();

  const linkList = (
    <>
      <Link
        href="/dashboard/user"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
      >
        <FaHome className="text-gray-600" />
        {!collapsed && <span>Home</span>}
      </Link>

      <Link
        href="/dashboard/user/myComponent"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
      >
        <FaBox className="text-gray-600" />
        {!collapsed && <span>My Components</span>}
      </Link>

      <Link
        href="/dashboard/user/createComponent"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
      >
        <FaPlus className="text-gray-600" />
        {!collapsed && <span>Create Component</span>}
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#239eab] to-[#74deee]">
      {/* Sidebar (Desktop) */}
      <div
        className={`hidden lg:flex flex-col bg-white/90 backdrop-blur-lg shadow-2xl transition-all duration-300 p-4 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold text-gray-800">FrostUI</h2>
          )}
          <button
            className="text-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-8 flex-1 space-y-4">{linkList}</nav>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 mt-auto rounded-lg text-red-600 hover:bg-red-100 transition"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Sidebar (Mobile Drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-lg shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden z-50 p-4 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">FrostUI</h2>
          <button className="text-gray-700" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-8 flex-1 space-y-4">
          <Link
            href="/dashboard/user"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="text-gray-600" />
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard/user/my-components"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            <FaBox className="text-gray-600" />
            <span>My Components</span>
          </Link>

          <Link
            href="/dashboard/user/create"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#239eab] hover:to-[#74deee] transition text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            <FaPlus className="text-gray-600" />
            <span>Create Component</span>
          </Link>
        </nav>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 mt-auto rounded-lg text-red-600 hover:bg-red-100 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto w-full">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button onClick={() => setIsOpen(true)} className="text-gray-700">
            <FaBars size={22} />
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[85vh] bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6">
          {children || (
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Content
            </h1>
          )}
        </div>
      </main>
    </div>
  );
}
