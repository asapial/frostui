import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthProvider = ({ children }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>L
    </div>
  );
};

export default NextAuthProvider;
