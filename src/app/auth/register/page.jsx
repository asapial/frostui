"use client";
import SectionContainer from "@/Utils/SectionContainer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcrypt";

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
import { MdOutlineNumbers } from "react-icons/md";

// ✅ Moved outside so React doesn't recreate it on every render
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
    age: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    dob: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // update only changed field
    }));
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

    let photoUrl = "";
    if (formData.photo) {
      const form = new FormData();
      form.append("image", formData.photo);
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
        photoUrl = data.data.url;
      } catch (err) {
        toast.error("Photo upload failed");
        return;
      }
    }

    const hash = bcrypt.hashSync(formData.password, 10);
    formData.password=hash;

    const userData = { ...formData, photo: photoUrl };
    delete userData.confirmPassword;
    console.log(userData);
    toast.success("Registration successful!");
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

          {/* <InputField
            icon={MdOutlineNumbers}
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          /> */}

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

          <div className="mb-3 flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
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

          <div className="mb-5 flex items-center bg-white/80 border border-gray-300 rounded-lg p-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
            <FaImage className="text-blue-600 mr-3" />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="bg-transparent outline-none text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg hover:scale-105 focus:ring-4 focus:ring-blue-300 transition-transform duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
