import SearchBar from "@/components/search/search";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-4 py-20 bg-[#111318] bg-[radial-gradient(ellipse_70%_70%_at_50%_35%,_var(--tw-gradient-stops))] from-[#3a3427] via-[#1a1c23] to-[#111318]">
      <div className="flex flex-col items-center text-center">
        <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight`}>
          Find Your Next
        </h1>
        <h2 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#c9a86a] tracking-tight mt-1`}>
          Dream Home
        </h2>

        <p className="mt-6 mb-10 text-[#8c9bae] text-sm sm:text-base max-w-md md:max-w-xl leading-relaxed">
          Discover premium properties tailored to your lifestyle. Explore the best real estate options in your favorite neighborhoods.
        </p>
      </div>

      <SearchBar />
    </div>
  );
}