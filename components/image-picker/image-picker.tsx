'use client';

import { Dispatch, SetStateAction, useState } from "react";

interface ImagePickerProps {
    setFormData: Dispatch<SetStateAction<{
        propertyType: string;
        price: number;
        title: string;
        description: string;
        address: string;
        city: string;
        province: string;
        images: File[];
        lat: number;
        lng: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>>
    formData: {
        propertyType: string;
        price: number;
        title: string;
        description: string;
        address: string;
        city: string;
        province: string;
        images: File[];
        lat: number;
        lng: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }
}
export default function ImagePicker(props: ImagePickerProps) {
    const [imageError, setImageError] = useState('');
    const { formData, setFormData } = props;

    // Helper function to resize/compress an image file via Canvas before saving to state
    const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.7): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                resolve(file); // Fallback to original if context fails
                return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                (blob) => {
                    if (!blob) {
                    resolve(file);
                    return;
                    }
                    const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                'image/jpeg',
                quality
                );
            };
            img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageError('');
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);
        const totalImagesCount = formData.images.length + filesArray.length;

        if (totalImagesCount > 3) {
            setImageError('You can upload a maximum of 3 pictures only.');
            return;
        }

        const processedFiles: File[] = [];
        for (const file of filesArray) {
            if (!file.type.startsWith('image/')) {
            setImageError('Please upload valid image files.');
            return;
            }

            try {
            // Compress image client-side to target < 2MB limit
            const compressed = await compressImage(file, 1200, 1200, 0.7);
            // If still over 2MB, try with a lower quality factor
            let finalFile = compressed;
            if (finalFile.size > 2 * 1024 * 1024) {
                finalFile = await compressImage(file, 1000, 1000, 0.5);
            }
            processedFiles.push(finalFile);
            } catch (err) {
            console.error('Image compression error:', err);
            processedFiles.push(file);
            }
        }

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...processedFiles],
        }));
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
        }));
        setImageError('');
    };

    return (
        <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
                Property Images (Max 3 pictures, compressed automatically under 2MB)
            </label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#C5A880] file:text-white hover:file:opacity-90"
            />
            {imageError && <p className="text-xs text-red-500 mt-1">{imageError}</p>}

            {/* Image Previews */}
            {formData.images.length > 0 && (
                <div className="flex gap-4 mt-3">
                {formData.images.map((file, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200">
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-stone-900/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-600"
                    >
                        ✕
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}