import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "https://backoffice-two-phi.vercel.app" }],
  },
};

export default nextConfig;
