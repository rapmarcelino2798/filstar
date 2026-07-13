import PropertyGrid from "@/components/property-grid/property-grid";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  status: 'For Sale' | 'For Rent';
  imageUrl: string;
  href: string;
}

export const propertiesData: Property[] = [
  {
    id: '1',
    title: 'Modern 3BR Condo',
    location: 'Laguna Technopark, Laguna',
    price: '$450,000',
    status: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    href: "/properties/details"
  },
  {
    id: '2',
    title: 'Luxury Suburban',
    location: 'Nuvali, Sta. Rosa, Laguna',
    price: '$820,000',
    status: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    href: "/properties/details"
  },
  {
    id: '3',
    title: 'Minimalist Studio',
    location: 'Alabang, Metro Manila',
    price: '$210,000',
    status: 'For Rent',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    href: "/properties/details"
  },
];

export default function PropertiesPage() {
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
                    <a href="#all-properties" className="text-sm font-medium text-[#C8A96A] hover:text-white flex items-center gap-1 transition-colors">
                        View all properties &rarr;
                    </a>
                </div>

                {/* Render Dynamic Component */}
                <PropertyGrid properties={propertiesData} />
            </div>
        </div>
    )
}