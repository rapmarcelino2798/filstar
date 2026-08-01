import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

interface Property {
  id: number,
  created_at: any,
  title: string,
  price: number,
  type: string,
  status: string,
  images: string[],
  contact_information: {
    full_name: string,
    email: string,
    phone: string
  },
  address: string,
  city: string,
  lat: number,
  lng: number
}

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="group cursor-pointer flex flex-col h-full">
          {/* Image & Badge Container */}
          <Link 
            href={`/properties/details/${property.id}`}
            className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-neutral-800 block cursor-pointer group no-underline shrink-0"
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Details & Price Container */}
          <div className="flex justify-between items-start gap-4 flex-grow">
            <div className="flex flex-col flex-grow min-w-0">
              {/* Title with line clamp and ellipsis */}
              <h3 
                className="text-lg font-semibold mb-1 text-black line-clamp-2 overflow-hidden text-ellipsis" 
                title={property.title}
              >
                {property.title.toUpperCase()}
              </h3>
              
              {/* Location */}
              <p className="text-xs text-neutral-400 flex items-center gap-1 mt-auto">
                <svg
                  className="w-3.5 h-3.5 text-amber-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="truncate">{property.city.toUpperCase()}</span>
              </p>
            </div>

            {/* Price Badge - Fixed to the top-right and aligned */}
            <div className="bg-[#C8A96A] border border-white/10 rounded-xl px-4 py-2 font-semibold text-white text-sm whitespace-nowrap shrink-0">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}