import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let adminClient: SupabaseClient | null = null;

/**
 * ใช้เฉพาะฝั่ง server (API route / Edge Function)
 * ห้าม import ไฟล์นี้ใน component ที่รันฝั่ง client
 */
export function getSupabaseAdmin(): SupabaseClient {
    if (adminClient) return adminClient;

    const url = import.meta.env.SUPABASE_URL;
    const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    adminClient = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
    return adminClient;
}