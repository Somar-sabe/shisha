'use client';
import { useEffect } from 'react';
import { Providers } from '@/store/provider';
import "bootstrap/dist/css/bootstrap.min.css";   // ✅ أضفناه هنا
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { CurrencyProvider } from '@/app/contexts/CurrencyContext';

const RootLayout = ({ children }) => {
  useEffect(() => {
    // @ts-ignore
    window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BQB515MRLF"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BQB515MRLF');
          `,
        }} />

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16808256824"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16808256824');
          `,
        }} />

        <link rel="stylesheet" href="/css/font-awesome.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="description"
          content="Holster UAE - Premium Tobacco, Premium Moments"
        />

        <meta 
          name="keywords" 
          content="
            Shisha tobacco UAE, Premium Shisha flavors, Buy Shisha online UAE, Holster Shisha tobacco, Best Shisha tobacco in UAE, 
            Shisha flavor shop Dubai, Top Shisha brands UAE, Wholesale Shisha tobacco UAE, Exotic Shisha flavors, Hookah tobacco UAE, 
            Fruity Shisha flavors, Online Shisha store UAE, Tobacco-free Shisha options, Shisha delivery Dubai, Affordable Shisha tobacco UAE, Smooth Shisha blends
          " 
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{`Holster UAE - Premium Tobacco, Premium Moments`}</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>

      <body>
        <Providers>
          <CurrencyProvider>{children}</CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
