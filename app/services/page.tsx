import ServiceCard from "@/components/service-card/service-card";
import { Home, Building2, FileText } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const servicesList = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Buy a Property",
    description: "Browse curated homes perfectly suited to your lifestyle. We'll guide you through every step.",
    href: "/properties/all"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Sell Your Property",
    description: "Get maximum value for your real estate with our expert market analysis and trusted network.",
    href: "/services/sell"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Documentation Service",
    description: "Hassle-free title transfers, legal paperwork, and secure transaction processing handled by pros.",
    href: "/services/documentation"
  },
];

export default function ServicePage() {
    return (
        <div className="w-full flex-1 flex flex-col justify-center bg-[#FAF8F4] px-4 py-12 items-center">
 
            {/* Centered Section Header */}
            <div className="w-full max-w-6xl flex flex-col items-center text-center mb-10">
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#c9a86a] uppercase mb-2">
                  OUR SERVICES
                </span>
                <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight`}>
                  How can we help you
                </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full place-items-center md:place-items-stretch">
                {servicesList.map((service, index) => (
                    <ServiceCard 
                      key={index}
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      href={service.href}
                    />
                ))}
            </div>

        </div>
    );
}