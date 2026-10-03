import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/careers/open-positions',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/careers/open-positions/:slug',
        destination: '/careers/:slug',
        permanent: true,
      },
      {
        source: '/about/who-we-are',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about/leadership',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about/partners',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about/location',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
