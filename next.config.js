/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway deployment configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v2brianmoses-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'brianmoses.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/ic-order-vsl',
        destination: 'https://inner-circle.brianmoses.com/ic-order-vsl',
        permanent: true, // 301 redirect
      },
    ];
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
