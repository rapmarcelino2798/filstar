'use client';

import { useState } from "react";

export default function InquiryForm() {
    const [inquirySent, setInquirySent] = useState(false);
    
    const handleInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        setInquirySent(true);
    };

    return (
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
              <p className="font-semibold text-gray-800">property.agent.name</p>
              <p>📞 property.agent.phone</p>
              <p>✉️ property.agent.email</p>
            </div>
        </div>
    )
}