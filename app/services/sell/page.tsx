'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SellYourPropertyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Residential House',
    address: '',
    city: '',
    size: '',
    fullName: '',
    email: '',
    phone: '',
    date: '18',
    timeSlot: 'morning',
    communicationMethod: 'Phone Call',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Property valuation appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 flex flex-col justify-between font-sans">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        
        {/* Page Titles matching reference */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
            Sell Your Property
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
            Book a Property Valuation
          </h1>
        </div>

        {/* Form Container Grid matching reference card layout */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Middle Booking Form Card (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Property Details */}
              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-4">
                  Step 1: Property Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    >
                      <option value="Residential House">Residential House</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Commercial Lot">Commercial Lot</option>
                      <option value="Townhouse">Townhouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter street address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">Estimated Size (sqft)</label>
                      <input
                        type="number"
                        name="size"
                        placeholder="e.g. 1200"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-4">
                  Step 2: Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-stone-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+63 900 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Schedule Selection Simulation */}
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-3">
                  Step 3: Schedule Appointment Date & Time
                </h3>
                
                {/* Visual Mini Calendar Mock */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center">
                  <div className="grid grid-cols-7 gap-1 text-xs text-stone-500 font-medium mb-2">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-stone-700">
                    <span className="py-2 text-stone-300">29</span>
                    <span className="py-2">1</span>
                    <span className="py-2">2</span>
                    <span className="py-2">3</span>
                    <span className="py-2">4</span>
                    <span className="py-2">5</span>
                    <span className="py-2">6</span>
                    <span className="py-2">7</span>
                    <span className="py-2">8</span>
                    <span className="py-2">9</span>
                    <span className="py-2">10</span>
                    <span className="py-2 bg-[#C5A880] text-white rounded-lg shadow-sm">11</span>
                    <span className="py-2">12</span>
                    <span className="py-2">13</span>
                  </div>
                </div>

                {/* Time slot selectors */}
                <div className="flex gap-3 mt-4">
                  {['morning', 'afternoon', 'evening'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`flex-1 py-2 text-xs font-medium rounded-xl border capitalize transition ${
                        formData.timeSlot === slot
                          ? 'bg-[#C5A880] text-white border-[#C5A880]'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {/* Communication method */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-stone-500 mb-1">Preferred Communication Method</label>
                  <select
                    name="communicationMethod"
                    value={formData.communicationMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="In-Person">In-Person Meeting</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button matching the design's gold gradient button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-[#D4B886] to-[#B39363] hover:opacity-95 shadow-lg shadow-[#C5A880]/20 transition"
              >
                Confirm Appointment
              </button>

            </form>
          </div>

          {/* Right Info Card matching layout */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col justify-between h-fit">
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-[#FBF9F5] border border-stone-200 flex items-center justify-center text-[#C5A880]">
                📄
              </div>
              <h4 className="font-serif text-lg text-stone-900">Why choose FILSTAR?</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Get maximum value for your real estate with our expert market analysis and trusted network. Hassle-free process from start to finish.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">
                Need immediate assistance? Feel free to call our main broker desk directly during standard business hours.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}