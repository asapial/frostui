import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { toast } from "react-toastify";
import bcrypt from "bcrypt";

const handler = NextAuth({
providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "Please enter the email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

    console.log("Credentials",credentials);

    const userCursor= await dbConnect('userCollection');
    const userData=await userCursor.findOne({email:credentials.email});
    console.log("User Data from route:", userData);
    const isValid= await bcrypt.compare(credentials.password, userData.password);


    if(userData && isValid){
        // toast.success("Login successful!");
        return {...userData}
    }
    else{
        // toast.error("Invalid email or password");
    }

      return null
    }
  })
],
  pages: {
    signIn: '/auth/signin',
  }

})

export { handler as GET, handler as POST }