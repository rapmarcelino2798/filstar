'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SellPropertyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API request for submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#fafaf9] text-gray-800 overscroll-y-none">
      {/* Main Form Content */}
      <main className="flex-grow py-12 px-6 sm:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#b45309] font-semibold">Listing Submission</span>
          <h1 className="text-4xl font-serif font-normal mt-2 tracking-tight text-gray-900">Sell Your Property</h1>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
            Provide the required documentation and details below. Our team will review your submission before publishing it live.
          </p>
        </div>

        {success ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
            <h3 className="text-2xl font-serif text-teal-900">Submission Received!</h3>
            <p className="text-gray-600 text-sm">Your property documents are now pending admin approval.</p>
            <Link href="/" className="inline-block bg-[#134e4a] text-white py-2 px-6 rounded-xl text-sm font-medium hover:bg-teal-900 transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            {/* Section 1: Property Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-semibold text-gray-900 border-b pb-3">Property Financials & Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
                    Selling Price (Inclusive of Taxes & Broker's Fee)
                  </label>
                  <input 
                    type="text" 
                    placeholder="₱ 0.00" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm bg-gray-50/50" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
                    TIN Number
                  </label>
                  <input 
                    type="text" 
                    placeholder="000-000-000-000" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm bg-gray-50/50" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
                  Location Map, Vicinity Map, or Google Maps Pin URL
                </label>
                <input 
                  type="text" 
                  placeholder="Paste map link or pin coordinates" 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm bg-gray-50/50" 
                  required 
                />
              </div>
            </div>

            {/* Section 2: Requirements Upload */}
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-semibold text-gray-900 border-b pb-3">Required Documents & Verification</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FileUploadField label="Transfer Certificate of Title (TCT) & Tax Dec" />
                <FileUploadField label="Clean Title Proof / Map Pin Detail" />
                <FileUploadField label="Authority to Sell & Site Inspection Auth" />
                <FileUploadField label="Clear Copy of Valid Government ID" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-[#134e4a] text-white py-4 rounded-xl font-medium tracking-wide hover:bg-teal-900 transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Property for Approval'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

function FileUploadField({ label }: { label: string }) {
  return (
    <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/30 flex flex-col justify-between">
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      <input 
        type="file" 
        className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-900 hover:file:bg-teal-100 cursor-pointer" 
        required 
      />
    </div>
  );
}