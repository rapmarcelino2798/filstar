"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-10 h-20 shadow-sm bg-[#FAF8F4] text-[#21252E] border-b border-[#21252E]/10">
      {/* Logo */}
      <Link href="/">
        <img src="/filstar-logo.png" alt="filstar-logo" width={80} height={80} />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex flex-row gap-7 font-medium">
        <li>
          <Link href="/properties" className="hover:text-[#c9a86a] transition-colors">Properties</Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-[#c9a86a] transition-colors">Services</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-[#c9a86a] transition-colors">About</Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[#21252E] focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF8F4] border-t border-[#21252E]/10 shadow-2xl py-6 px-8 flex flex-col gap-5 md:hidden">
          <Link
            href="/properties"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium hover:text-[#c9a86a] transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium hover:text-[#c9a86a] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium hover:text-[#c9a86a] transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}