'use client';

import React from 'react';
import { Star, Building2, LogOut } from 'lucide-react';
import { handleLogout } from '../login/actions';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export default function AdminSidebar({ activeTab, setActiveTab, pendingCount }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-[#2A524B] text-[#FBF9F5] flex flex-col justify-between p-6 shadow-xl">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-[#C5A880] flex items-center justify-center font-bold text-white">
            ★
          </div>
          <div>
            <h1 className="font-serif tracking-widest text-lg font-bold">FILSTAR</h1>
            <p className="text-xs text-[#C5A880] tracking-wider">ADMIN PORTAL</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('approval')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer ${activeTab === 'approval' ? 'bg-[#C5A880] text-[#2A524B] font-semibold' : 'hover:bg-white/10'}`}
          >
            <Building2 size={18} /> For Approval 
            {pendingCount > 0 && (
              <span className="ml-auto bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('featured')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer ${activeTab === 'featured' ? 'bg-[#C5A880] text-[#2A524B] font-semibold' : 'hover:bg-white/10'}`}
          >
            <Star size={18} /> Featured Control
          </button>
        </nav>
      </div>

      <div className="border-t border-white/10 pt-4">
        <form action={handleLogout}>
          <button type="submit" className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-200 hover:text-white transition-colors cursor-pointer">
            <LogOut size={18} /> Log out
          </button>
        </form>
      </div>
    </aside>
  );
}