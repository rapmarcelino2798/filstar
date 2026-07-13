import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import { Inter } from 'next/font/google';
import MainFooter from "@/components/main-footer/main-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialize the font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Optional: if you want to use it with Tailwind
});

export const metadata: Metadata = {
  title: "Filstar | Real Estate | Buy, Sell & Documentation Service",
  description: "Explore prime properties across NCR, Laguna, Cavite, Batangas, Rizal, and Bulacan. Whether you want to buy, sell, or need expert documentation assistance, Filstar makes the journey seamless. Start your search now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="w-full min-h-screen flex flex-col bg-[#111318] text-white overflow-x-hidden">
        <MainHeader />
        {/* flex-1 makes sure this grows to fill space, keeping the footer at the bottom */}
        <div className="flex flex-col flex-1 w-full">
          {children}
        </div>
        <MainFooter />
      </body>
    </html>
  );
}
