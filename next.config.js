/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  i18n: {
    locales: ['en', 'ar'],       // Define supported languages
    defaultLocale: 'en'          // Set default language
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://checkout.stripe.com; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://checkout.stripe.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
