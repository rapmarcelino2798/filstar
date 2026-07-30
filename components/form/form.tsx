'use client';

import { useState } from "react";
import ImagePicker from "../image-picker/image-picker";
import MapPicker from "../map-picker/map-picker";
import { saveProperty } from "@/src/actions/propertyActions";

export default function Form() {
    const [formData, setFormData] = useState({
        propertyType: 'Residential',
        price: 0,
        title: '',
        address: '',
        city: '',
        images: [] as File[],
        lat: 14.3167, 
        lng: 121.1167,
        fullName: '',
        email: '',
        phone: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // 1. Check text/select fields for empty strings
        if (
            !formData.title.trim() ||
            !formData.address.trim() ||
            !formData.city.trim() ||
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim()
        ) {
            setError('Please fill in all required text fields.');
            return;
        }

        // 2. Check if price is greater than 0
        if (!formData.price || Number(formData.price) <= 0) {
            setError('Please enter a valid selling price.');
            return;
        }

        // 3. Check if at least one image is uploaded
        if (formData.images.length === 0) {
            setError('Please upload at least one property image.');
            return;
        }

        try {
            setLoading(true);
            // Call the Server Action
            await saveProperty(formData);
            alert('Property valuation appointment and images uploaded successfully!'); 
        } catch (err: any) {
            setError(err.message || 'Something went wrong during submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Step 1: Property Details */}
                <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-4">
                    Step 1: Property Details & Location Map
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
                        <option value="Residential">Residential</option>
                        <option value="Condo">Condo</option>
                        <option value="Industrial">Industrial</option>
                        <option value="House and Lot">House and Lot</option>
                        <option value="Lot Only">Lot Only</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Farm Lot">Farm Lot</option>
                    </select>
                    </div>

                    <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Selling Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                    </div>

                    <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                    </div>

                    <ImagePicker 
                        formData={formData}
                        setFormData={setFormData}
                    />

                    {/* Leaflet Map Integration */}
                    <MapPicker 
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter street address or pick from map"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                    </div>

                    <div>
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-[#D4B886] to-[#B39363] hover:opacity-95 shadow-lg shadow-[#C5A880]/20 transition disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

            </form>
        </div>
    )
}