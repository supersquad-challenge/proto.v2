/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 00eae61 (Add: modals)
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
<<<<<<< HEAD
=======
  // async redirects() {
  //   return [
  //     {
  //       source: "/home",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
>>>>>>> 09511c3 (Add: Header)
=======
>>>>>>> 00eae61 (Add: modals)
};

module.exports = nextConfig;
