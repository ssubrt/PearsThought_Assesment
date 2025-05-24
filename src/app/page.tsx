
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Card className="shadow-2xl max-w-lg w-full p-8 rounded-2xl bg-white/80 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-purple-700 mb-2">
            🍐 PearsThought
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Welcome to your Next.js Auth Boilerplate!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-xl text-gray-700 font-medium text-center">
            Securely manage your thoughts, orders, and more.<br />
            Start by logging in or signing up!
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/login">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="border-purple-600 text-purple-700 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50">
                Sign Up
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}