/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  i18n: {
    locales: ['en', 'ar'],       // Define supported languages
    defaultLocale: 'en'          // Set default language
  }
};

module.exports = nextConfig;
