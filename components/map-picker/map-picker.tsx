'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { MapContainerProps } from 'react-leaflet';


interface MapPickerProps {
    setFormData: Dispatch<SetStateAction<{
        propertyType: string;
        price: number;
        title: string;
        address: string;
        city: string;
        images: File[];
        lat: number;
        lng: number;
        fullName: string;
        email: string;
        phone: string;
    }>>
    formData: {
        propertyType: string;
        price: number;
        title: string;
        address: string;
        city: string;
        images: File[];
        lat: number;
        lng: number;
    }
}

// Dynamically import React Leaflet components with SSR disabled, typed properly
const MapContainer = dynamic<MapContainerProps>(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

// Separate sub-component to handle map events securely via react-leaflet's hook
const MapEventsHandler = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
  const { useMapEvents } = require('react-leaflet');
  useMapEvents({
    click(e: any) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};


export default function MapPicker(props: MapPickerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const { formData, setFormData } = props;

    const handleMapClick = async (lat: number, lng: number) => {
        setFormData((prev) => ({ ...prev, lat, lng }));

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            if (data && data.address) {
                const street = data.address.road || data.address.suburb || '';
                const cityName = data.address.city || data.address.town || data.address.municipality || '';
                setFormData((prev) => ({
                    ...prev,
                    address: street ? `${street}` : prev.address,
                    city: cityName || prev.city,
                }));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    
        // Dynamically configure Leaflet marker icons on the client side only to prevent SSR/window crashes
        import('leaflet').then((L) => {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });
        });
    }, []);

    return (
        <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
                Pin Property Location on Map (Click to select)
            </label>
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-stone-200 z-0">
                {isMounted && (
                <MapContainer
                    key={`${formData.lat}-${formData.lng}`}
                    center={[formData.lat, formData.lng]}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[formData.lat, formData.lng]} />
                    <MapEventsHandler onSelect={handleMapClick} />
                </MapContainer>
                )}
            </div>
        </div>
    )
}