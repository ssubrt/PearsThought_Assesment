"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("You must be logged in to view this page.");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  if (!session) {
    return null; // Prevents rendering protected content
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Card className="shadow-2xl max-w-xl w-full p-8 rounded-2xl bg-white/80 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-purple-700 mb-2">
            👋 Welcome, {session?.user?.name || "User"}!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            This is your personalized dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full flex flex-col items-center">
            <p className="text-lg text-gray-700 font-medium text-center mb-4">
              Here you can manage your thoughts, pizza orders, and more.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="/pizza-orders"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              >
                🍕 View Pizza Orders
              </a>
              <a
                href="/dashboard"
                className="border border-purple-600 text-purple-700 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition"
              >
                📝 Your Thoughts
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
