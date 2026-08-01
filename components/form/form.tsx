'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import ImagePicker from "../image-picker/image-picker";
import { saveProperty } from "@/src/actions/propertyActions";

// Dynamically import Jodit Editor to prevent Server-Side Rendering (SSR) window errors in Next.js
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Form() {
    const [formData, setFormData] = useState({
        propertyType: 'Residential',
        price: 0,
        title: '',
        description: '',
        address: '',
        city: '',
        province: '',
        images: [] as File[],
        lat: 14.3167, 
        lng: 121.1167,
        firstName: '',
        lastName: '',
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
            !formData.description.trim() ||
            !formData.address.trim() ||
            !formData.city.trim() ||
            !formData.province.trim() ||
            !formData.firstName.trim() ||
            !formData.lastName.trim() ||
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

        // 3. Validate phone number (Strictly 11 digits, e.g., 09123456789)
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid 11-digit phone number (e.g., 09123456789).');
            return;
        }

        // 4. Check if at least one image is uploaded
        if (formData.images.length === 0) {
            setError('Please upload at least one property image.');
            return;
        }

        try {
            setLoading(true);
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
                    <div className="relative flex items-center">
                        <span className="absolute left-4 text-xs font-semibold text-stone-400">PHP</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full pl-14 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g., Modern 3-Bedroom House with Garage in Santa Rosa"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                    </div>

                    {/* Rich Text Editor for Description */}
                    <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
                        <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50/50 text-sm">
                            <JoditEditor
                                value={formData.description}
                                tabIndex={1} 
                                onBlur={(newContent) => setFormData({ ...formData, description: newContent })}
                                onChange={() => {}} 
                            />
                        </div>
                    </div>

                    <ImagePicker 
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
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
                            <label className="block text-xs font-medium text-stone-500 mb-1">Province</label>
                            <input
                                type="text"
                                name="province"
                                placeholder="Province"
                                value={formData.province}
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
                    <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
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
                        maxLength={11}
                        placeholder="09123456789"
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