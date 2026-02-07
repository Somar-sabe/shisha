import Script from "next/script";
import ClientProviders from "./ClientProviders";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";

export const metadata = {
  title: "Holster UAE - Premium Tobacco, Premium Moments",
  description: "Holster UAE - Premium Tobacco, Premium Moments",
  robots: "index, follow",
  keywords: [
    "Shisha tobacco UAE",
    "Premium Shisha flavors",
    "Buy Shisha online UAE",
    "Holster Shisha tobacco",
    "Best Shisha tobacco in UAE",
    "Shisha flavor shop Dubai",
    "Top Shisha brands UAE",
    "Wholesale Shisha tobacco UAE",
    "Exotic Shisha flavors",
    "Hookah tobacco UAE",
    "Fruity Shisha flavors",
    "Online Shisha store UAE",
    "Tobacco-free Shisha options",
    "Shisha delivery Dubai",
    "Affordable Shisha tobacco UAE",
    "Smooth Shisha blends",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/font-awesome.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* Bootstrap */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQB515MRLF"
          strategy="afterInteractive"
        />
        <Script id="ga-g" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BQB515MRLF');
          `}
        </Script>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16808256824"
          strategy="afterInteractive"
        />
        <Script id="ga-aw" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16808256824');
          `}
        </Script>

        {/* ✅ Providers لازم يكونوا داخل Client wrapper */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
