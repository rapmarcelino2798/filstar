'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/admin-sidebar';
import PropertyApprovalList from './components/property-approval-list';
import FeaturedControl from './components/featured-control';
import { fetchPendingProperties, approveProperty } from './actions/properties';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('approval');
  const [pendingProperties, setPendingProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const data = await fetchPendingProperties();
      setPendingProperties(data);
      setLoading(false);
    }
    loadProperties();
  }, []);

  const handleApprove = async (id: number) => {
    // Optimistically remove it from the UI immediately for a snappy experience
    setPendingProperties((prev) => prev.filter((p) => p.id !== id));

    // Call the server action to update Supabase
    const result = await approveProperty(id);
    if (!result.success) {
      console.error('Failed to update property status in database');
      // Optional: Re-fetch or rollback state if it fails
    }
  };

  return (
    <div className="flex h-screen bg-[#FBF9F5] text-[#2C2C2C] font-sans overflow-hidden">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={pendingProperties.length} 
      />

      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-3xl font-serif text-[#1A332E]">
              {activeTab === 'approval' && 'Property Approval Queue'}
              {activeTab === 'featured' && 'Featured Properties Manager'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Manage listings and control public platform visibility.</p>
          </div>
        </header>

        {activeTab === 'approval' && (
          <div className="space-y-6">
            {loading ? (
              <div className="bg-white p-12 text-center rounded-xl border border-[#E5E0D8] shadow-sm">
                <p className="text-gray-500 font-medium">Loading properties from Supabase...</p>
              </div>
            ) : (
              <PropertyApprovalList 
                properties={pendingProperties} 
                onApprove={handleApprove} 
              />
            )}
          </div>
        )}

        {activeTab === 'featured' && (
          <FeaturedControl />
        )}
      </main>
    </div>
  );
}