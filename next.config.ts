import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [ new URL('https://store_jqHZp9eIR7A7E8vc.public.blob.vercel-storage.com/**') ],
  },
};

export default nextConfig;
