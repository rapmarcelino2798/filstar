'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, Loader2, X, MapPin, User, Tag, DollarSign } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  agent: string;
  type: string;
  sellerFirstName: string;
  sellerLastName: string;
  city: string;
  province: string;
  images?: string[];
  description?: string; // Optional description field if available in DB
}

interface PropertyApprovalListProps {
  properties: Property[];
  onApprove: (id: number) => Promise<void> | void;
}

export default function PropertyApprovalList({ properties, onApprove }: PropertyApprovalListProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  if (properties.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-[#E5E0D8] shadow-sm">
        <p className="text-gray-500 font-medium">All caught up! No properties pending approval.</p>
      </div>
    );
  }

  const handleActionClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevents tile click modal from triggering when clicking buttons
    try {
      setLoadingId(id);
      await onApprove(id);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {properties.map((prop) => {
          const firstImage = prop.images && prop.images.length > 0 ? prop.images[0] : null;
          const isProcessing = loadingId === prop.id;

          return (
            <div 
              key={prop.id} 
              onClick={() => setSelectedProperty(prop)}
              className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm flex items-center justify-between cursor-pointer hover:border-[#2A524B] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-xs text-gray-400 shrink-0">
                  {firstImage ? (
                    <Image 
                      src={firstImage} 
                      alt={prop.title || 'Property image'} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <span>[No Image]</span>
                  )}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A880]">{prop.type}</span>
                  <h3 className="text-lg font-serif font-bold text-[#1A332E]">{prop.title}</h3>
                  <p className="text-sm text-gray-600">
                    {prop.city}, {prop.province} • <strong className="text-[#2A524B]">{formatPrice(prop.price)}</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Submitted by: {prop.sellerFirstName} {prop.sellerLastName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => handleActionClick(e, prop.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-2 bg-[#2A524B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A332E] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} 
                  Approve
                </button>
                <button 
                  onClick={(e) => handleActionClick(e, prop.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROPERTY DETAILS MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0D8] p-6 relative">
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>

            <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A880] bg-[#C5A880]/10 px-3 py-1 rounded-full">
              {selectedProperty.type}
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#1A332E] mt-2 mb-1">{selectedProperty.title}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-6">
              <MapPin size={16} className="text-[#2A524B]" /> {selectedProperty.city}, {selectedProperty.province}
            </p>

            {/* Image Gallery Preview */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#1A332E] mb-3">Property Images</h4>
              <div className="grid grid-cols-3 gap-3">
                {selectedProperty.images && selectedProperty.images.length > 0 ? (
                  selectedProperty.images.map((img, idx) => (
                    <div key={idx} className="relative h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={img} alt={`Property image ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No images uploaded for this property.</p>
                )}
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-4 bg-[#FBF9F5] p-4 rounded-xl border border-[#E5E0D8] mb-6">
              <div>
                <p className="text-xs text-gray-500 font-medium">Price</p>
                <p className="text-lg font-bold text-[#2A524B]">{formatPrice(selectedProperty.price)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Submitted By</p>
                <p className="text-sm font-bold text-[#1A332E]">{selectedProperty.sellerFirstName} {selectedProperty.sellerLastName}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 border-t border-[#E5E0D8] pt-4">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={async (e) => {
                  await handleActionClick(e, selectedProperty.id);
                  setSelectedProperty(null);
                }}
                className="px-5 py-2 rounded-lg bg-[#2A524B] text-white text-sm font-medium hover:bg-[#1A332E] cursor-pointer flex items-center gap-2"
              >
                <CheckCircle size={16} /> Approve Property
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}