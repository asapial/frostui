"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaImage, FaCode, FaLink, FaTags, FaDollarSign, FaHeading } from "react-icons/fa";
import SectionContainer from "@/Utils/SectionContainer";

export default function CreateComponent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    type: "free",
    price: 0,
    previewImage: null,
    previewCode: "",
    previewIframe: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl = "";
    if (formData.previewImage) {
      const form = new FormData();
      form.append("image", formData.previewImage);

      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_KEY`, {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        imageUrl = data.data.url;
      } catch (err) {
        toast.error("Image upload failed");
        return;
      }
    }

    const componentData = {
      ...formData,
      previewImage: imageUrl,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      price: parseFloat(formData.price),
      type: formData.type,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Submitting component:", componentData);
    toast.success("Component submitted for review!");
    // TODO: Send to backend
  };

  return (
    <SectionContainer>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-6">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-white/20 space-y-4"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Create New Component
          </h2>

          {/* Title */}
          <div className="relative">
            <FaHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              name="title"
              placeholder="Component Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            <option value="button">Button</option>
            <option value="card">Card</option>
            <option value="navbar">Navbar</option>
            <option value="footer">Footer</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Tags */}
          <div className="relative">
            <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-blue-200"
            />
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>

            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-blue-200"
                step="0.01"
              />
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative">
            <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="file"
              name="previewImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white"
            />
          </div>

          {/* Preview Code */}
          <div className="relative">
            <FaCode className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <textarea
              name="previewCode"
              placeholder="Component HTML/CSS/JS code"
              value={formData.previewCode}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-blue-200"
              rows={4}
            />
          </div>

          {/* Preview Iframe Link */}
          <div className="relative">
            <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="url"
              name="previewIframe"
              placeholder="Live Preview Iframe URL"
              value={formData.previewIframe}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-blue-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg"
          >
            Submit Component
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
