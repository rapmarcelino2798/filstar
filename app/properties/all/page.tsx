'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: 'For Sale' | 'For Rent';
  image: string;
}

const PROPERTIES_DATA: Property[] = [
  {
    id: '1',
    title: 'Modern 3BR Condo',
    location: 'Laguna Technopark, Laguna',
    price: '$450,000',
    type: 'Condo',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Luxury Suburban',
    location: 'Nuvali, Sta. Rosa, Laguna',
    price: '$820,000',
    type: 'House',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'Minimalist Studio',
    location: 'Alabang, Metro Manila',
    price: '$210,000',
    type: 'Studio',
    status: 'For Rent',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    title: 'Executive Townhouse',
    location: 'Biñan, Laguna',
    price: '$340,000',
    type: 'Townhouse',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    title: 'High-Rise Penthouse',
    location: 'Makati Central Business District',
    price: '$1,250,000',
    type: 'Condo',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    title: 'Garden Villa',
    location: 'Canlubang, Laguna',
    price: '$610,000',
    type: 'House',
    status: 'For Rent',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
  }
];

export default function AllPropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES_DATA[0].title);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const filteredProperties = PROPERTIES_DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Property tour successfully booked for "${selectedProperty}"!`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 flex flex-col justify-between font-sans">
        {/* Main Container Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        {/* Title Section */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
            Featured Portfolio
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900">
            All Properties: Find Your Match
          </h1>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/60 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <select 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="All">Status: All</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>

            <div className="text-xs text-stone-400">|</div>

            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredProperties.length} available listings
            </span>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search location or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>
        </div>

        {/* Grid Split: Left Catalog (2 cols) vs Right Booking Form (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Properties Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
              <div 
                key={property.id} 
                onClick={() => setSelectedProperty(property.title)}
                className={`bg-white rounded-3xl p-4 shadow-md border transition cursor-pointer flex flex-col justify-between ${
                  selectedProperty === property.title ? 'border-[#C5A880] ring-2 ring-[#C5A880]/20' : 'border-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <img src={property.image} alt={property.title} className="object-cover w-full h-full" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md text-white ${
                    property.status === 'For Sale' ? 'bg-stone-900/80 backdrop-blur-sm' : 'bg-emerald-700/80 backdrop-blur-sm'
                  }`}>
                    {property.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-stone-900 mb-1">{property.title}</h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mb-4">
                    <span>📍</span> {property.location}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-400 font-medium">Valuation Price</span>
                  <span className="px-3 py-1.5 bg-[#C5A880] text-white rounded-xl text-xs font-semibold shadow-sm">
                    {property.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Booking / Visit Form */}
          <div className="lg:sticky lg:top-8 bg-white rounded-3xl p-6 shadow-xl shadow-stone-200/50 border border-stone-100">
            <h3 className="font-serif text-xl text-stone-900 mb-1">Book a Property Visit</h3>
            <p className="text-xs text-stone-500 mb-6">Schedule an in-person or virtual walkthrough.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Select Property</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                >
                  {PROPERTIES_DATA.map((p) => (
                    <option key={p.id} value={p.title}>{p.title} - {p.location}</option>
                  ))}
                </select>
              </div>

              {/* Mini Calendar Mock */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center">
                <div className="grid grid-cols-7 gap-1 text-[10px] text-stone-400 font-medium mb-1">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-stone-700">
                  <span className="py-1 text-stone-300">29</span>
                  <span className="py-1">1</span>
                  <span className="py-1">2</span>
                  <span className="py-1">3</span>
                  <span className="py-1">4</span>
                  <span className="py-1">5</span>
                  <span className="py-1">6</span>
                  <span className="py-1">7</span>
                  <span className="py-1">8</span>
                  <span className="py-1">9</span>
                  <span className="py-1">10</span>
                  <span className="py-1 bg-[#C5A880] text-white rounded-md">11</span>
                  <span className="py-1">12</span>
                  <span className="py-1">13</span>
                  <span className="py-1">14</span>
                  <span className="py-1">15</span>
                  <span className="py-1">16</span>
                  <span className="py-1">17</span>
                  <span className="py-1">18</span>
                  <span className="py-1">19</span>
                  <span className="py-1">20</span>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Time Slot</label>
                <div className="flex gap-2">
                  {['morning', 'afternoon', 'evening'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`flex-1 py-1.5 text-[11px] font-medium rounded-lg border capitalize transition ${
                        timeSlot === slot
                          ? 'bg-[#C5A880] text-white border-[#C5A880]'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={bookingData.fullName}
                  onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+63 900 000 0000"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-[#D4B886] to-[#B39363] hover:opacity-95 shadow-md shadow-[#C5A880]/20 text-xs tracking-wide transition mt-2"
              >
                Confirm Visit Request
              </button>

            </form>
          </div>

        </div>

      </main>
    
    </div>
  );
}