import {createBrowserClient} from '@supabase/ssr'

import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase";

export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
