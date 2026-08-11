/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pva1500-pro-(.*)\\.vercel\\.app',
          },
        ],
        destination: 'https://pva1500pro.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
