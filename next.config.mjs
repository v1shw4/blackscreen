/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': ['node_modules/better-sqlite3/build/Release/*.node'],
  },
};

export default nextConfig;
