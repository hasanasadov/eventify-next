/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "oblivicon.com",
      "static.vecteezy.com",
      "encrypted-tbn0.gstatic.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // covers /a/... and any other path
      },
    ],
  },
};

export default nextConfig;
