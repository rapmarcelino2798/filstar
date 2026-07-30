// src/data/posts.ts
import { createClient } from '@/utils/supabase/server'

interface PropertyFormData {
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
}

// Fetch all posts
export async function getProperties() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("Properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    throw new Error("Failed to fetch posts");
  }

  return data;
}

// Fetch a single post by ID
export async function getPropertiesById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("Properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching post ${id}:`, error.message);
    return null;
  }

  return data;
}

export async function addProperty(formData: PropertyFormData) {
  const supabase = await createClient()

  console.log(formData);

  // Insert a single row into the 'todos' table
 

  // Refresh the page cache to show updated data
  // revalidatePath('/todos')
  return { success: true }
}
