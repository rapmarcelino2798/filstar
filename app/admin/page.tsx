'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Star, LayoutDashboard, Building2, SlidersHorizontal, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  // Mock state for demonstration
  const [activeTab, setActiveTab] = useState('approval');
  
  const [pendingProperties, setPendingProperties] = useState([
    { id: 1, title: 'Modern Minimalist Villa', location: 'Cabuyao, Laguna', price: '₱12,500,000', agent: 'Maria Santos', type: 'Buy' },
    { id: 2, title: 'Commercial Space Prime', location: 'Santa Rosa, Laguna', price: '₱45,000/mo', agent: 'Juan Reyes', type: 'Rent' },
  ]);

  const [featuredCount, setFeaturedCount] = useState(4);

  const handleApprove = (id: number) => {
    setPendingProperties(pendingProperties.filter(p => p.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#FBF9F5] text-[#2C2C2C] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#2A524B] text-[#FBF9F5] flex flex-col justify-between p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            {/* Brand Logo Placeholder matching top left star */}
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
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'overview' ? 'bg-[#C5A880] text-[#2A524B] font-semibold' : 'hover:bg-white/10'}`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('approval')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'approval' ? 'bg-[#C5A880] text-[#2A524B] font-semibold' : 'hover:bg-white/10'}`}
            >
              <Building2 size={18} /> For Approval 
              {pendingProperties.length > 0 && (
                <span className="ml-auto bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingProperties.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('featured')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'featured' ? 'bg-[#C5A880] text-[#2A524B] font-semibold' : 'hover:bg-white/10'}`}
            >
              <Star size={18} /> Featured Control
            </button>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-200 hover:text-white transition-colors">
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 overflow-y-auto p-10">
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-3xl font-serif text-[#1A332E]">
              {activeTab === 'approval' && 'Property Approval Queue'}
              {activeTab === 'featured' && 'Featured Properties Manager'}
              {activeTab === 'overview' && 'Dashboard Overview'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Manage listings and control public platform visibility.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#EAE4D9] px-4 py-2 rounded-lg text-sm font-medium text-[#2A524B]">
              Featured Slots Used: <span className="font-bold">{featuredCount}/6</span>
            </div>
          </div>
        </header>

        {/* TAB CONTENT: FOR APPROVAL */}
        {activeTab === 'approval' && (
          <div className="space-y-6">
            {pendingProperties.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-[#E5E0D8] shadow-sm">
                <p className="text-gray-500 font-medium">All caught up! No properties pending approval.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingProperties.map((prop) => (
                  <div key={prop.id} className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-20 bg-gray-200 rounded-lg object-cover flex items-center justify-center text-xs text-gray-400">
                        [Image]
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A880]">{prop.type}</span>
                        <h3 className="text-lg font-serif font-bold text-[#1A332E]">{prop.title}</h3>
                        <p className="text-sm text-gray-600">{prop.location} • <strong className="text-[#2A524B]">{prop.price}</strong></p>
                        <p className="text-xs text-gray-400 mt-1">Submitted by: {prop.agent}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleApprove(prop.id)}
                        className="flex items-center gap-2 bg-[#2A524B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A332E] transition-colors"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => handleApprove(prop.id)}
                        className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: FEATURED MANAGEMENT */}
        {activeTab === 'featured' && (
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
            <h3 className="text-lg font-serif font-bold text-[#1A332E] mb-4">Manage Homepage Carousel Slots</h3>
            <p className="text-sm text-gray-600 mb-6">Toggle properties to feature them immediately on the primary landing screen search results or hero carousel.</p>
            
            {/* List configuration for featured controls */}
            <div className="divide-y divide-[#E5E0D8]">
              {[1, 2, 3, 4, 5, 6].map((slot) => (
                <div key={slot} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#EAE4D9] flex items-center justify-center text-xs font-bold text-[#2A524B]">#{slot}</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A332E]">{slot <= 4 ? `Active Featured Asset #${slot}` : 'Empty Slot Available'}</h4>
                      <p className="text-xs text-gray-500">{slot <= 4 ? 'Cabuyao Prime Residential Estate' : 'Assign a verified property to this slot'}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={slot <= 4} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A524B]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}