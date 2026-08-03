// app/admin/components/logout-button.tsx
"use client";

import { handleLogout } from "../login/actions";

export default function LogoutButton() {
  return (
    <form action={handleLogout} className="w-full">
      <button 
        type="submit"
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 text-sm transition-all cursor-pointer text-left"
      >
        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
          N
        </div>
        <span>Log out</span>
      </button>
    </form>
  );
}