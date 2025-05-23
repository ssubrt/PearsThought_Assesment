// components/client/LogoutButton.tsx
'use client';

import { signOut } from "next-auth/react";
import { Button } from "./button";
import toast from "react-hot-toast";


export default function LogoutButton() {
  return (
    <Button
       onClick={async () => {
        const toastId = toast.loading("Logging out...");
        setTimeout(async () => {
          await signOut({ callbackUrl: "/login" });
          toast.success("Logout successfull", { id: toastId });
        }, 3000);
      }}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold"
    >
      Logout
    </Button>
  );
}