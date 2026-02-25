/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway deployment configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v2brianmoses-production.up.railway.app',
      },
    ],
  },
  // Allow the Railway hostname
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
