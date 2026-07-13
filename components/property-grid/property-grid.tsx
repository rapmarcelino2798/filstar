import Link from "next/link";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  status: 'For Sale' | 'For Rent';
  imageUrl: string;
  href: string;
}

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="group cursor-pointer">
            {/* Image & Badge Container */}
            <Link 
                href={`/properties/details`}
                className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-neutral-800 block cursor-pointer group no-underline"
                >
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                    className={`absolute top-4 left-4 backdrop-blur-md text-xs font-semibold px-3 py-1.5 rounded-full border uppercase tracking-wider ${
                    property.status === 'For Rent'
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20'
                        : 'bg-black/60 text-white/95 border-white/10'
                    }`}
                >
                    {property.status}
                </span>
            </Link>

            {/* Details & Price Container */}
            <div className="flex justify-between items-start gap-4">
                <div>
                <h3 className="text-lg font-semibold mb-1 text-black">{property.title}</h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                    <svg
                    className="w-3.5 h-3.5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {property.location}
                </p>
                </div>
                <div className="bg-[#C8A96A] border border-white/10 rounded-xl px-4 py-2 font-semibold text-white text-sm whitespace-nowrap">
                {property.price}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}