"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const handleRegister = async (payload) => {
  const userCursor = await dbConnect("userCollection");

  const isPreviousUser = await userCursor.findOne({ email: payload.email });
  if (isPreviousUser) {
    return { isCreated: false, reason: "Email already registered" };
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  payload.role = "user";
  payload.status = "active";
  payload.createdAt = new Date();
  payload.provider = "credentials";
  payload.isProfileOk = true;
  payload.age = new Date().getFullYear() - new Date(payload.dob).getFullYear();

  const user = await userCursor.insertOne(payload);

  console.log("Inserted user:", payload, user);

  if (user.acknowledged) {
    return {
      insertedId: user.insertedId.toString(), // ✅ Fix serialization error
      isCreated: true,
    };
  }

  return { isCreated: false };
};

export default handleRegister;
