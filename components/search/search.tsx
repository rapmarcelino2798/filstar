"use client";

import { useState } from "react";
import { MapPin, DollarSign, ChevronDown, Search } from "lucide-react";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <div className="w-full max-w-4xl p-3 md:p-2.5 bg-[#FFFFFF]/90 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between text-white">
      
      {/* Left: Buy / Rent Switcher */}
      <div className="flex items-center justify-center w-full md:w-auto bg-[#FAF8F4] p-1 rounded-full border border-white/5">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "buy"
              ? "bg-[#C8A96A] text-white border border-[#c9a86a]/30 shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Buy
        </button>
       <button
          onClick={() => setActiveTab("sell")}
          className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "sell"
              ? "bg-[#C8A96A] text-white border border-[#c9a86a]/30 shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Divider (Hidden on Mobile) */}
      <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-2" />

      {/* Middle: Location Input */}
      <div className="flex items-center gap-3 w-full md:flex-1 px-2 md:px-4 py-2 md:py-0 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none">
        <MapPin className="w-4 h-4 text-[#c9a86a] shrink-0" />
        <input
          type="text"
          defaultValue="cabuyao"
          className="bg-transparent border-none outline-none text-sm text-black placeholder-gray-500 w-full"
        />
      </div>

      {/* Divider (Hidden on Mobile) */}
      <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-2" />

      {/* Right: Price Dropdown */}
      <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-3 px-4 py-2 md:py-0 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none cursor-pointer text-gray-300 hover:text-white transition-colors">
        <div className="flex items-center gap-3">
          <DollarSign className="w-4 h-4 text-[#c9a86a] shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap text-black">Min-Max Price</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      {/* Action Button: Search */}
      <button className="flex items-center justify-center gap-2 w-full md:w-auto px-7 py-3.5 bg-gradient-to-r from-[#dfba77] to-[#b38f4e] text-black font-semibold rounded-2xl md:rounded-full hover:opacity-95 transition-opacity shadow-lg md:ml-2">
        <Search className="w-4 h-4 text-white" />
        <span className="text-white">Search</span>
      </button>

    </div>
  );
}