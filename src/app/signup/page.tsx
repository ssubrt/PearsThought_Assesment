// src/app/signup/page.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Link from "next/link";
import connectDB from "@/dbConfig";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import User from "@/model/userModel";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs";  
import { SignUpForm } from "@/components/signup/SignupForm";




const Page = async () => {
  const session = await auth();
  if (session?.user) return redirect('/dashboard');

  const handleSignUp = async (prevState: any, formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { message: "All fields are required.", errors: null };
    }

    await  connectDB();
    
    try {
      const user = await User.findOne({ email });
      if (user) {
        return { message: "User already exists", errors: { email: "This email is already registered" } };
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      redirect("/login");
    } catch (error) {
      console.error("Signup error:", error);
      return { message: "An error occurred during signup", errors: null };
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm action={handleSignUp} />
        </CardContent>
        <p className="text-center my-4 text-gray-500">Or</p>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", { callbackUrl: "/dashboard" });
            }}
          >
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold"
            >
              Sign Up with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;