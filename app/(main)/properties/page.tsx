import PropertyGrid from "@/components/property-grid/property-grid";
import { getProperties } from "@/src/data/properties";
import Link from "next/link";

export default async function PropertiesPage() {
    const properties = await getProperties();

    return (
        <div className="w-full flex-1 flex flex-col justify-center bg-[#FAF8F4] text-black py-16 px-6 md:px-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-amber-500/90 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 block">
                            Featured Properties
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-normal">
                            Homes you'll love
                        </h2>
                    </div>
                    <Link href="/properties/all" className="text-sm font-medium text-[#C8A96A] hover:text-white flex items-center gap-1 transition-colors">
                        View all properties &rarr;
                    </Link>
                </div>

                {/* Render Dynamic Component */}
                <PropertyGrid properties={properties} />
            </div>
        </div>
    )
}