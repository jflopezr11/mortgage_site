/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'joshualopezloans.com' }],
        destination: 'https://www.joshualopezloans.com/:path*',
        permanent: true,
      },
    ]
  },
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
