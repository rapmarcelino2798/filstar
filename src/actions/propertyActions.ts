'use server';

import { createClient } from "@/utils/supabase/server";

export async function saveProperty(formData: any) {
    const supabase = await createClient();
    
    // 1. Handle image uploads to Supabase Storage (example bucket: 'property-images')
    const imageUrls: string[] = [];
    
    for (const file of formData.images) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('Properties')
            .upload(fileName, file);

        if (uploadError) {
            throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('Properties')
            .getPublicUrl(fileName);

        imageUrls.push(publicUrlData.publicUrl);
    }

    // 2. Prepare payload for database insertion (excluding raw File objects)
    const propertyPayload = {
        type: formData.propertyType,
        price: Number(formData.price),
        title: formData.title,
        description: formData.description,
        images: imageUrls, // Store the array of string URLs instead of File objects
        address: formData.address,
        city: formData.city,
        province: formData.province,
        sellerFirstName: formData.firstName,
        sellerLastName: formData.lastName,
        sellerEmail: formData.email,
        sellerPhoneNumber: formData.phone,
        isFeatured: false,
        status: 'FOR_APPROVAL'
    };

    // 3. Insert into Supabase table
    const { data, error } = await supabase.from('Properties').insert([propertyPayload]);

    if (error) {
        throw new Error(error.message);
    }

    return { success: true, data };
}