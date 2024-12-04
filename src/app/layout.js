'use client';
import { useEffect } from 'react';
import { Providers } from '@/store/provider';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick-theme.css";
import "@/styles/style.scss";
import { CurrencyProvider } from '@/app/contexts/CurrencyContext';

const RootLayout = ({ children }) => {
  useEffect(() => {
    // Bootstrap script
    window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BQB515MRLF';
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BQB515MRLF');
    `;
    document.head.appendChild(inlineScript);
  }, []); // Ensure this only runs once on mount

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/font-awesome.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet"/>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, follow" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="eTrade eCommerce React Next JS Template" />
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
