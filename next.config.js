/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 100000,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

// module.exports = {
//     mode: "development",
//     entry: path.resolve(__dirname, 'src') + "/app/Hello.jsx",
//     ...,
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     }
//   };
