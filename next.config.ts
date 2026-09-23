import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  outputFileTracingIncludes: { '/api/og': ['./assets/**'] },
};
export default nextConfig;
