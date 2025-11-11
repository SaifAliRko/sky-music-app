import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: false,  // Disable SSR for styled-components to prevent hydration mismatches with theme
    },
  },
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/albums',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
