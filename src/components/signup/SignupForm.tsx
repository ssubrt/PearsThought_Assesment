// src/app/signup/SignUpForm.tsx
"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SignUpFormState = {
  message: string;
  errors: { email?: string } | null;
};

export function SignUpForm({ action }: { action: any }) {
  const [state, formAction, isPending] = useActionState<SignUpFormState>(action, {
    message: "",
    errors: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          type="text"
          placeholder="Enter your name"
          name="name"
          className="mt-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          className="mt-1"
          required
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
          className="mt-1"
          required
        />
      </div>
      {state?.message && !state?.errors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <Button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}