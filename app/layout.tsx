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
  title: "Filstar | Real Estate | Buy, Sell & Rent",
  description: "Discover the best property listings in Laguna. Whether you’re looking to buy, sell, or rent, Filstar makes finding your dream home easy. Start searching today!",
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
      <body className={`${inter.className} w-full min-h-screen flex flex-col m-0 p-0 overflow-x-hidden bg-[#111318]`}>
        <MainHeader />
        <main className="flex flex-1 flex-col w-full">
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
