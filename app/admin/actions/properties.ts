// app/admin/actions/properties.ts
'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function fetchPendingProperties() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );

  const { data, error } = await supabase
    .from('Properties')
    .select('*')
    .eq('status', 'FOR_APPROVAL');

  if (error) {
    console.error('Error fetching pending properties:', error.message);
    return [];
  }

  return data || [];
}

export async function approveProperty(id: number) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { error } = await supabase
    .from('Properties')
    .update({ status: 'APPROVED' })
    .eq('id', id);

  if (error) {
    console.error('Error approving property:', error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function fetchFeaturedProperties() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  // Fetch properties to manage in the featured slots (e.g., approved or all properties)
  const { data, error } = await supabase
    .from('Properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties for featured control:', error.message);
    return [];
  }

  return data || [];
}

export async function toggleFeaturedProperty(id: number, isFeatured: boolean) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { error } = await supabase
    .from('Properties')
    .update({ isFeatured })
    .eq('id', id);

  if (error) {
    console.error('Error updating isFeatured status:', error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  return { success: true };
}