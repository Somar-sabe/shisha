'use client';
import { useEffect } from 'react';
import { Providers } from '@/store/provider';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";

const  RootLayout = ({ children }) => {

	useEffect(() => {
		window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);
	
	return ( 
		<html lang="en">
			<head>
			<link rel="stylesheet" href="/css/font-awesome.css" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
			            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="eTrade eCommerce React Next JS Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>Shisha Holster UAE - Premium Tobacco, Premium Moments</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			</head>
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	 );
}
 
export default RootLayout;

