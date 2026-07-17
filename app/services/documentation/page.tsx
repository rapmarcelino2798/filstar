'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DocService {
  id: string;
  title: string;
  category: string;
  fee: string;
  description: string;
  image: string;
}

const DOCUMENTATION_SERVICES: DocService[] = [
  {
    id: '1',
    title: 'Transfer of Ownership',
    category: 'Title Processing',
    fee: '₱15,000',
    description: 'Seamless title transfer coordination with the Registry of Deeds and local tax mapping bureaus.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Extrajudicial Settlement of Estate',
    category: 'Estate Legalities',
    fee: '₱25,000',
    description: 'Comprehensive drafting and processing for settlement of estates among heirs without court intervention.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'Self-Adjudication',
    category: 'Estate Legalities',
    fee: '₱12,000',
    description: 'Legal documentation support for sole heirs executing an affidavit of self-adjudication.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    title: 'Deed of Donation',
    category: 'Property Transfer',
    fee: '₱10,000',
    description: 'Preparation and processing of property donation deeds with complete compliance guidelines.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    title: 'Due Diligence & Property Verification',
    category: 'Verification',
    fee: '₱8,500',
    description: 'Thorough background checks, title authenticity validation, and tax clearance verifications.',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
  },
];

export default function DocumentationServicePage() {
  const [selectedService, setSelectedService] = useState(DOCUMENTATION_SERVICES[0].title);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const filteredServices = DOCUMENTATION_SERVICES.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Appointment successfully requested for "${selectedService}"! Our legal documentation team will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 flex flex-col justify-between font-sans">
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        {/* Title Section */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
            Professional Assistance
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900">
            Documentation Services & Legalities
          </h1>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/60 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredServices.length} specialized documentation services
            </span>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search documentation service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>
        </div>

        {/* Grid Split: Left Service Grid (2 cols) vs Right Booking Form (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Services Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service.title)}
                className={`bg-white rounded-3xl p-4 shadow-md border transition cursor-pointer flex flex-col justify-between ${
                  selectedService === service.title ? 'border-[#C5A880] ring-2 ring-[#C5A880]/20' : 'border-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                  <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md text-white bg-stone-900/80 backdrop-blur-sm">
                    {service.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-stone-900 mb-1">{service.title}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-400 font-medium">Standard Service Fee</span>
                  <span className="px-3 py-1.5 bg-[#C5A880] text-white rounded-xl text-xs font-semibold shadow-sm">
                    {service.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:sticky lg:top-8 bg-white rounded-3xl p-6 shadow-xl shadow-stone-200/50 border border-stone-100">
            <h3 className="font-serif text-xl text-stone-900 mb-1">Book a Consultation</h3>
            <p className="text-xs text-stone-500 mb-6">Schedule a meeting with our documentation specialists.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Selected Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                >
                  {DOCUMENTATION_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title} ({s.fee})</option>
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
                Confirm Consultation Request
              </button>

            </form>
          </div>

        </div>

      </main>
    </div>
  );
}