import { signIn } from "next-auth/react";

export const handleSignIN = async ({ email, password }) => {
  console.log("Email and password from action sign in page:", email, password);

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      return {
        code: "ERROR", // ❌ Failed login
        message: result.error,
      };
    }

    return {
      code: "SUCCESS", // ✅ Successful login
      url: result?.url || "/",
    };
  } catch (err) {
    return {
      code: "ERROR",
      message: err.message || "Something went wrong",
    };
  }
};


export const handleGoogleSignIN = async () => {
  return await signIn("google", { callbackUrl: "/" });
};
