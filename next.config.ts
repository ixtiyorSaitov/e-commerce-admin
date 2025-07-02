import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fwcyunkhovgrowgqelmu.supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
