"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Icons
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGlobe,
  FaCalendarAlt,
  FaImage,
} from "react-icons/fa";
import handleRegister from "@/actions/authentication/register";
import { redirect } from "next/navigation";

// ✅ Input component
const InputField = ({ icon: Icon, ...props }) => (
  <div className="flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 mb-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
    <Icon className="text-blue-600 mr-3" />
    <input
      {...props}
      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
    />
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    dob: "",
    photo: null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (files && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
      handleImageUpload(files[0]);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    setUploaded(false);

    const form = new FormData();
    form.append("image", file);
    const apiKey = "b127cf48e5d98246a87aeaa307000c3b";

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      if (data?.data?.url) {
        setFormData((prev) => ({ ...prev, photo: data.data.url }));
        setUploaded(true);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = { ...formData };
    delete userData.confirmPassword;

    const res = await handleRegister(userData);
    if (res.isCreated) {
      toast.success("Registration successful!");
      redirect("/");
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <SectionContainer className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500">
      <div className="min-h-screen flex items-center justify-center p-4">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/40"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
            Create Your Account
          </h2>
                      {/* Upload State */}
            <div className="mt-4 flex justify-center">
              {uploading ? (
                <div className="text-center text-gray-700">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2">Uploading...</p>
                </div>
              ) : uploaded && imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <p className="text-gray-400"></p>
              )}
            </div>

          <InputField
            icon={FaUser}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            icon={FaPhone}
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            icon={FaLock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <InputField
            icon={FaLock}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="mb-3 flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 shadow-sm">
            <FaUser className="text-blue-600 mr-3" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <InputField
            icon={FaGlobe}
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <InputField
            icon={FaCalendarAlt}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div className="mb-5">
            <label className="flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 shadow-sm cursor-pointer">
              <FaImage className="text-blue-600 mr-3" />
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="bg-transparent outline-none text-gray-700"
              />
            </label>



          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!uploaded}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-transform duration-200 ${
              uploaded
                ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
