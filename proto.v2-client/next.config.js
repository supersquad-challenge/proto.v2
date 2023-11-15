/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
