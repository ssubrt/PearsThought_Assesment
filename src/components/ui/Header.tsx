// components/ui/Header.tsx


import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-200">
      <nav className="flex items-center gap-6">
        <Link href="/dashboard" className="font-bold text-lg hover:underline">
          Dashboard
        </Link>
        <Link href="/pizza-orders" className="font-bold text-lg hover:underline">
          Pizza Orders
        </Link>
      </nav>
      {session?.user && (
        <div className="flex items-center gap-4">
          <span>Hello, {session?.user.name || "User"}</span>
          <LogoutButton />
        </div>
      )}
    </header>
  );
}
