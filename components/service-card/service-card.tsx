import React, { ReactNode } from "react";
import Link from "next/link";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string; // <-- Add href for the Next.js Link destination
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="w-full max-w-sm p-6 bg-[#FFFFFF] border border-white/10 rounded-2xl shadow-xl hover:border-[#c9a86a]/40 hover:bg-[#FAF8F4] transition-all duration-200 cursor-pointer flex flex-col items-start text-left select-none group block no-underline"
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-white/5 flex items-center justify-center text-[#c9a86a] mb-5 group-hover:scale-105 transition-transform">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-black mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#8c9bae] leading-relaxed">
        {description}
      </p>
    </Link>
  );
}