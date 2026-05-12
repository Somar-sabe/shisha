/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // إيقاف Turbopack
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },

  images: {
    unoptimized: true, // 🔥 هذا هو الحل لمشكلتك في الإنتاج
  },
};

module.exports = nextConfig;