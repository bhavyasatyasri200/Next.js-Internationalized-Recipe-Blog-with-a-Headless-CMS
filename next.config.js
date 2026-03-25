const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,

  // Prevent Node-only packages (fs, http2) from being bundled for the browser
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http2: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },

  images: {
    domains: [
      'images.ctfassets.net',
      'downloads.ctfassets.net',
      'assets.ctfassets.net',
      'via.placeholder.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;