import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import { Inter } from 'next/font/google';
import MainFooter from "@/components/main-footer/main-footer";
import type { Viewport } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Filstar | Real Estate | Buy, Sell & Documentation Service",
  description: "Explore prime properties across NCR, Laguna, Cavite, Batangas, Rizal, and Bulacan.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // <-- Adds viewport-fit=cover to the meta tag
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overscroll-y-none`}
    >
      {/* h-full and overflow-hidden lock the outer window frame */}
      <body className="w-full h-screen flex flex-col bg-[#111318] text-white overflow-hidden m-0 p-0">
        
        {/* Navigation Bar stays fixed at the top */}
        <MainHeader />
        
        {/* This inner container takes the remaining height and handles the scrolling content */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto overscroll-y-none">
          <div className="flex flex-col flex-1 w-full">
            {children}
          </div>
          <MainFooter />
        </div>

      </body>
    </html>
  );
}