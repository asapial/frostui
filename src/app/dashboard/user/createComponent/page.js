"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaImage,
  FaCode,
  FaLink,
  FaTags,
  FaDollarSign,
  FaHeading,
  FaPlusCircle,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import SectionContainer from "@/Utils/SectionContainer";
import { useSession } from "next-auth/react";
import handleCreateComponent from "@/actions/dashboard/user/createComponent";

export default function CreateComponent() {
  const session = useSession();
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
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=b127cf48e5d98246a87aeaa307000c3b`,
          {
            method: "POST",
            body: form,
          }
        );
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

    componentData.creatorId = session?.data?.user?.id;
    componentData.creatorName = session?.data?.user?.name;
    componentData.creatorEmail = session?.data?.user?.email;
    componentData.status = "pending";
    componentData.downloads = 0;
    componentData.likes = 0;
    componentData.purchase = 0;

    console.log("Submitting component:", componentData);
    const res=await handleCreateComponent(componentData);

    if(res.isCreated){
      toast.success("Component is created successfully!!");

    }
    // TODO: Send to backend
  };

  return (
    <SectionContainer className="customGradiant1">
      <div className="min-h-screen flex items-center justify-center  p-6">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="customGradiant2 rounded-2xl p-8 w-full max-w-2xl boxStyle space-y-4"
        >
          <h2 className="headerStyle flex items-center gap-2">
            <FaPlusCircle className="text-primary" />
            Create New Component
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
              className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
            />
          </div>

          {/* Category */}
          <div className="relative">
            <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg text-secondary bg-transparent placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
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
              className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
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
              className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
            />
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-transparent text-secondary placeholder-secondary focus:outline-solid
         focus:ring-2 focus:ring-secondary border-primary border-2 "
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
                className="w-full pl-10 p-3 rounded-lg bg-transparent text-secondary placeholder-secondary focus:outline-solid
         focus:ring-2 focus:ring-secondary border-primary border-2 "
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Preview Image */}
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="file"
                name="previewImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-transparent text-secondary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
              />
            </div>
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
                className="w-full pl-10 p-3 rounded-lg text-secondary bg-transparent placeholder-secondary focus:outline-solid
     focus:ring-2 focus:ring-secondary border-primary border-2 "
              >
                <option value="">Select Privacy</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Preview Code */}
          <div className="relative">
            <FaCode className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <textarea
              name="previewCode"
              placeholder="Component HTML/CSS/JS code"
              value={formData.previewCode}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
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
              className="w-full pl-10 p-3 rounded-lg bg-transparent text-primary placeholder-secondary focus:outline-solid
       focus:ring-2 focus:ring-secondary border-primary border-2 "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full buttonStyle text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg"
          >
            Submit Component
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
