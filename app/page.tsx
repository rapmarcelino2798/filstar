import SearchBar from "@/components/search/search";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-4 py-20 bg-[#FAF8F4]">
      <div className="flex flex-col items-center text-center">
        <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#21252E] tracking-tight`}>
          Your Trusted Partner in
        </h1>
        <h2 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#c9a86a] tracking-tight mt-1`}>
          Real Estate & Documentation
        </h2>

        <p className="mt-6 mb-10 text-[#6B7280] text-sm sm:text-base max-w-md md:max-w-xl leading-relaxed">
          Seamlessly buy, sell, or process property documentation with expert guidance. We turn your real estate goals into reality with professional, hassle-free service.
        </p>
      </div>

      <SearchBar />
    </div>
  );
}