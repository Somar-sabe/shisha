/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ⛔ إيقاف Turbopack وإجبار Webpack
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  i18n: {
    locales: ['en', 'ar'], 
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
