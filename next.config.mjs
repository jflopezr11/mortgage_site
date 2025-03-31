/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',  // Apply headers to all routes
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Add more security headers as needed
        ],
      },
    ]
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}

export default nextConfig
