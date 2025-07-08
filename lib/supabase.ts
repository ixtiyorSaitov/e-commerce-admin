import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL!;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!; // yuqoridagi `anon public` key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
