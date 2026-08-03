"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(handleLogin, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      console.log('Rap')
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f8f9fa] px-4 text-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-gray-200">
        
        <div className="mb-8 text-center bg-[#1e3d3b] -mx-8 -mt-8 p-6 rounded-t-xl text-white">
          <h1 className="text-xl font-serif tracking-widest font-bold">FILSTAR</h1>
          <p className="text-[10px] tracking-wider text-gray-300 uppercase mt-1">
            Admin Portal Login
          </p>
        </div>

        {state?.error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              placeholder="Enter admin username"
              className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-[#1e3d3b] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-[#1e3d3b] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-[#1e3d3b] hover:bg-[#162d2b] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer mt-2 disabled:opacity-50"
          >
            {isPending ? "Signing In..." : "Sign In to Portal"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            &larr; Back to Filstar Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}