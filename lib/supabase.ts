import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fwcyunkhovgrowgqelmu.supabase.co";
export const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3l1bmtob3Zncm93Z3FlbG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExODI5OTEsImV4cCI6MjA2Njc1ODk5MX0.YNLpxFoEaU-f6aLNic5bTwDZEiJFRhd5tetDYCT2jVY"; // yuqoridagi `anon public` key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
