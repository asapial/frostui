"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaImage,
  FaCode,
  FaLink,
  FaTags,
  FaDollarSign,
  FaHeading,
  FaEdit,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import SectionContainer from "@/Utils/SectionContainer";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { getComponentById, updateComponent } from "./updatecomponent";

export default function UpdateComponentClient() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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
    privacy: "",
    existingPreviewImage: "",
  });

  // Fetch component data
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getComponentById(id);

        if (Array.isArray(data) && data.length > 0) {
          const component = data[0];

          setFormData({
            title: component.title || "",
            category: component.category || "",
            description: component.description || "",
            tags: component.tags ? component.tags.join(", ") : "",
            type: component.type || "free",
            price: component.price || 0,
            previewCode: component.previewCode || "",
            previewIframe: component.previewIframe || "",
            privacy: component.privacy || "",
            previewImage: null,
            existingPreviewImage: component.previewImage || "",
          });
        }
      } catch (err) {
        toast.error("Failed to fetch component data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl = formData.existingPreviewImage || "";

    if (formData.previewImage) {
      const form = new FormData();
      form.append("image", formData.previewImage);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=b127cf48e5d98246a87aeaa307000c3b`,
          { method: "POST", body: form }
        );
        const data = await res.json();
        imageUrl = data.data.url;
      } catch (err) {
        toast.error("Image upload failed");
        return;
      }
    }

    const updatedComponent = {
      ...formData,
      previewImage: imageUrl,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      price: parseFloat(formData.price),
      updatedAt: new Date(),
    };

    try {
      const res = await updateComponent(id, updatedComponent);
      if (res.success) {
        toast.success("Component updated successfully!");
        router.push("/dashboard/user/myComponent");
      } else {
        toast.error("Failed to update component.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

// Skeleton Loader Component
const FormSkeleton = () => {
  return (
    <div className="customGradiant2 rounded-2xl p-8 w-full max-w-2xl boxStyle space-y-4 animate-pulse">
      {/* Header */}
      <div className="h-8 w-1/3 bg-gray-300 rounded-lg"></div>

      {/* Title Input */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Category Select */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Description */}
      <div className="w-full h-24 rounded-lg bg-gray-300"></div>

      {/* Tags */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Type & Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-300 rounded-lg"></div>
        <div className="h-12 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Preview Image */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Privacy */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Preview Code */}
      <div className="w-full h-24 rounded-lg bg-gray-300"></div>

      {/* Preview Iframe */}
      <div className="w-full h-12 rounded-lg bg-gray-300"></div>

      {/* Submit Button */}
      <div className="w-full h-12 rounded-lg bg-gray-400"></div>
    </div>
  );
};

  return (
    <SectionContainer className="customGradiant1">
      <div className="min-h-screen flex items-center justify-center p-6">
        <ToastContainer />
        {loading ? (
  <FormSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="customGradiant2 rounded-2xl p-8 w-full max-w-2xl boxStyle space-y-4"
          >
            <h2 className="headerStyle flex items-center gap-2">
              <FaEdit className="text-primary" />
              Update Component
            </h2>

            {/* Title */}
            <div className="relative">
              <FaHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="text"
                name="title"
                placeholder="Component Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary border-2 border-primary"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary text-secondary"
              >
                <option value="">Select Category</option>
                <option value="button">Button</option>
                <option value="card">Card</option>
                <option value="navbar">Navbar</option>
                <option value="footer">Footer</option>
              </select>
            </div>

            {/* Description */}
            <div className="relative">
              <FaCode className="absolute left-3 top-5 text-secondary" />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
              />
            </div>

            {/* Tags */}
            <div className="relative">
              <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
              />
            </div>

            {/* Type & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
                  step="0.01"
                />
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="file"
                name="previewImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
              />
              {formData.existingPreviewImage && (
                <img
                  src={formData.existingPreviewImage}
                  alt="Preview"
                  className="mt-2 rounded-lg max-h-40 object-contain"
                />
              )}
            </div>

            {/* Privacy */}
            <div className="relative">
              {formData.privacy === "private" ? (
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              ) : (
                <FaLockOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              )}
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
              >
                <option value="">Select Privacy</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Preview Code */}
            <div className="relative">
              <FaCode className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <textarea
                name="previewCode"
                placeholder="Component Code"
                value={formData.previewCode}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
                rows={4}
              />
            </div>

            {/* Preview Iframe Link */}
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="url"
                name="previewIframe"
                placeholder="Live Preview Iframe URL"
                value={formData.previewIframe}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg border-2 border-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full buttonStyle text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Update Component
            </button>
          </form>
        )}
      </div>
    </SectionContainer>
  );
}
