'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, X, MapPin, FileText } from 'lucide-react';
import { fetchFeaturedProperties, toggleFeaturedProperty } from '../actions/properties';
import { formatPrice } from '@/utils/formatPrice';

interface Property {
  id: number;
  title: string;
  city: string;
  province: string;
  price: string;
  type: string;
  sellerFirstName: string;
  sellerLastName: string;
  sellerEmail?: string;
  sellerContactNumber?: string;
  isFeatured: boolean;
  images?: string[];
  description?: string;
  sellerPhoneNumber: string;
}

export default function FeaturedControl() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchFeaturedProperties();
        setProperties(data);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggle = async (e: React.MouseEvent, id: number, currentStatus: boolean) => {
    e.stopPropagation();
    const newStatus = !currentStatus;

    const currentFeaturedCount = properties.filter((p) => p.isFeatured).length;

    if (newStatus && currentFeaturedCount >= 3) {
      alert('You can only feature a maximum of 3 properties. Please unfeature another property first.');
      return;
    }

    try {
      setUpdatingId(id);
      
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeatured: newStatus } : p))
      );

      const result = await toggleFeaturedProperty(id, newStatus);
      if (!result.success) {
        console.error('Failed to update in database, reverting...');
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isFeatured: currentStatus } : p))
        );
      }
    } catch (error) {
      console.error('Error toggling feature status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-[#E5E0D8] shadow-sm flex items-center justify-center gap-2">
        <Loader2 className="animate-spin text-[#2A524B]" size={20} />
        <p className="text-gray-500 font-medium">Loading properties...</p>
      </div>
    );
  }

  const featuredCount = properties.filter((p) => p.isFeatured).length;

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-serif font-bold text-[#1A332E]">Manage Homepage Carousel Slots</h3>
          <span className="text-xs font-semibold px-3 py-1 bg-[#EAE4D9] text-[#2A524B] rounded-full">
            Featured: {featuredCount}/3
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-6">Toggle up to 3 properties to feature them immediately on the primary landing screen search results or hero carousel. Click any row to view details.</p>
        
        <div className="divide-y divide-[#E5E0D8]">
          {properties.map((prop, index) => {
            const slot = index + 1;
            const isUpdating = updatingId === prop.id;

            return (
              <div 
                key={prop.id} 
                onClick={() => setSelectedProperty(prop)}
                className="py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 px-3 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#EAE4D9] flex items-center justify-center text-xs font-bold text-[#2A524B]">#{slot}</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A332E]">{prop.title}</h4>
                    <p className="text-xs text-gray-500">{prop.city}, {prop.province}</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={!!prop.isFeatured} 
                    disabled={isUpdating}
                    onChange={(e) => handleToggle(e as any, prop.id, prop.isFeatured)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A524B]"></div>
                </label>
              </div>
            );
          })}
        </div>
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
              {selectedProperty.type || 'Property'}
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#1A332E] mt-2 mb-1">{selectedProperty.title}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-6">
              <MapPin size={16} className="text-[#2A524B]" /> {selectedProperty.city}, {selectedProperty.province}
            </p>

            {/* Description Section */}
            <div className="mb-6 bg-[#FBF9F5] p-4 rounded-xl border border-[#E5E0D8]">
              <h4 className="text-sm font-bold text-[#1A332E] flex items-center gap-1.5 mb-2">
                <FileText size={16} className="text-[#2A524B]" /> Description
              </h4>
              {selectedProperty.description ? (
                <div 
                  className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedProperty.description }}
                />
              ) : (
                <p className="text-sm text-gray-400">No description provided for this property.</p>
              )}
            </div>

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
              <div>
                <p className="text-xs text-gray-500 font-medium">Seller Email</p>
                <p className="text-sm font-bold text-[#1A332E]">{selectedProperty.sellerEmail || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Contact Number</p>
                <p className="text-sm font-bold text-[#1A332E]">{selectedProperty.sellerPhoneNumber || 'N/A'}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#E5E0D8] pt-4">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}