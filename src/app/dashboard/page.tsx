"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Hello, {session?.user?.name || "User"}!
      </h1>
      <p>Welcome to your dashboard.</p>
    </div>
  );
}
