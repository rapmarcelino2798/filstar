'use client';
import { useState, use } from 'react';
import Link from 'next/link';

// Mock data fetcher for property details based on dynamic [id]
function getPropertyDetails(id: string) {
  return {
    id,
    title: 'Modern 3BR Condo with Pool View',
    tag: 'FOR SALE',
    price: '$450,000',
    location: 'Laguna Technopark, Laguna',
    description:
      'Experience luxury living in this spacious modern 3-bedroom condominium. Featuring high ceilings, open-concept kitchen layout, floor-to-ceiling glass windows with abundant natural light, and access to a world-class infinity pool and fitness gym.',
    details: {
      bedrooms: 3,
      bathrooms: 2,
      floorArea: '145 sqm',
      propertyType: 'Condominium',
      yearBuilt: '2023',
      parking: '1 Slot Included',
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    ],
    agent: {
      name: 'Filstar Brokerage Team',
      phone: '+63 917 123 4567',
      email: 'inquiries@filstar-realestate-brokerage.com',
    },
  };
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const property = getPropertyDetails(resolvedParams.id);
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#fafaf9] text-gray-800 overscroll-y-none">
      {/* Main Content */}
      <main className="flex-grow py-12 px-6 sm:px-8 max-w-6xl mx-auto w-full space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Link href="/properties" className="hover:text-amber-700 transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-gray-700">{property.title}</span>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {property.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900 mt-3 tracking-tight">
              {property.title}
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              📍 {property.location}
            </p>
          </div>
          <div className="text-3xl font-serif font-semibold text-[#b45309]">
            {property.price}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[340px] sm:h-[420px]">
            <div className="h-full rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <img src={property.images[1]} alt="Interior view" className="w-full h-full object-cover" />
            </div>
            <div className="h-full rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <img src={property.images[2]} alt="Additional view" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Details & Inquiry Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description & Specifications */}
          <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">Property Overview</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-serif font-semibold text-gray-950 mb-6">Key Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <SpecItem label="Bedrooms" value={property.details.bedrooms} />
                <SpecItem label="Bathrooms" value={property.details.bathrooms} />
                <SpecItem label="Floor Area" value={property.details.floorArea} />
                <SpecItem label="Property Type" value={property.details.propertyType} />
                <SpecItem label="Year Built" value={property.details.yearBuilt} />
                <SpecItem label="Parking" value={property.details.parking} />
              </div>
            </div>
          </div>

          {/* Right Column: Contact/Inquiry Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
            <h2 className="text-xl font-serif font-semibold text-gray-900">Inquire About This Property</h2>
            {inquirySent ? (
              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl text-center space-y-2">
                <p className="text-teal-900 font-medium text-sm">Inquiry Sent Successfully!</p>
                <p className="text-gray-500 text-xs">Our broker will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Your Name</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-gray-200 text-sm bg-gray-50/50" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone or Email</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-gray-200 text-sm bg-gray-50/50" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Message</label>
                  <textarea rows={3} defaultValue="I am interested in this property. Please contact me." className="w-full p-3 rounded-xl border border-gray-200 text-sm bg-gray-50/50" required />
                </div>
                <button type="submit" className="w-full bg-[#134e4a] text-white py-3 rounded-xl font-medium tracking-wide hover:bg-teal-900 transition-colors shadow-sm">
                  Send Inquiry
                </button>
              </form>
            )}
            <div className="border-t border-gray-100 pt-4 text-xs text-gray-500 space-y-1">
              <p className="font-semibold text-gray-800">{property.agent.name}</p>
              <p>📞 {property.agent.phone}</p>
              <p>✉️ {property.agent.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
      <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{label}</span>
      <span className="block text-sm font-semibold text-gray-900 mt-1">{value}</span>
    </div>
  );
}