/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'abpbmrevqhrumbygedav.supabase.co',
      'dclaevazetcjjkrzczpc.supabase.co', // Add the new domain here
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dclaevazetcjjkrzczpc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
