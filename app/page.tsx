import SearchBar from "@/components/search/search";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    
    <div className="flex flex-1 flex-col justify-center items-center bg-[#111318] bg-[radial-gradient(ellipse_70%_70%_at_50%_35%,_var(--tw-gradient-stops))] from-[#3a3427] via-[#1a1c23] to-[#111318]">
      <div className="flex flex-col items-center">
        <span className={`${playfair.className} text-6xl font-bold text-white`}>Find Your Next</span>
        <span className={`${playfair.className} text-6xl font-bold text-[#c9a86a]`}>Dream Home</span>

        <span className="mt-10 mb-10 text-[#8c9bae] text-center max-w-xl">
          Discover premium properties tailored to your lifestyle. Explore the best real estate options in your favorite neighborhoods.
        </span>
      </div>

      <SearchBar />
    </div>
  );
}
