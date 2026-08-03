'use server';

import { createClient } from "@/utils/supabase/server";
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function saveProperty(formData: any) {
    const supabase = await createClient();
    
    // 1. Handle image uploads to Supabase Storage (bucket: 'Properties')
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

    // 2. Prepare payload for database insertion
    const propertyPayload = {
        type: formData.propertyType,
        price: Number(formData.price),
        title: formData.title,
        description: formData.description,
        images: imageUrls,
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

    // 4. Send instruction email to the seller
    try {
        await resend.emails.send({
            from: 'Your Real Estate Platform <onboarding@resend.dev>', // Replace with your verified domain in production
            to: formData.email,
            subject: 'Property Listing Submitted - Next Steps & Instructions',
            html: `
                <div style="font-family: Arial, sans-serif; color: #1A332E; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #E5E0D8; border-radius: 12px; background-color: #FBF9F5;">
                    <h2 style="color: #2A524B;">Hello ${formData.firstName},</h2>
                    <p>Thank you for submitting your property: <strong>"${formData.title}"</strong> to our platform.</p>
                    
                    <p>Your listing is currently <strong style="color: #C5A880;">FOR APPROVAL</strong> by our administration team. Here are the next steps:</p>
                    
                    <ul style="line-height: 1.6;">
                        <li>Our team will review your property details, images, and pricing within 24–48 hours.</li>
                        <li>Once approved, your listing will automatically go live on our platform search results and marketplace.</li>
                        <li>If we require any additional documents or clarifications, we will reach out to you via this email or your phone number (<strong>${formData.phone}</strong>).</li>
                    </ul>

                    <p style="margin-top: 24px;">You can log in to your dashboard anytime to track the status of your submission.</p>
                    
                    <p style="margin-top: 30px; border-top: 1px solid #E5E0D8; padding-top: 15px; font-size: 12px; color: #666;">
                        Best regards,<br/>
                        <strong>Platform Administration Team</strong>
                    </p>
                </div>
            `,
        });
    } catch (emailError) {
        console.error("Failed to send instruction email:", emailError);
        // Note: We don't necessarily want to crash the property creation if the email fails, 
        // but logging it ensures you are aware.
    }

    return { success: true, data };
}