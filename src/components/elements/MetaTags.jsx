import Head from 'next/head'

const MetaTags = ({title}) => {
    return ( 
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="eTrade eCommerce React Next JS Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>{`${title?title:"Shisha"}Holster UAE - Premium Tobacco, Premium Moments`}</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Head>
     );
}
 
export default MetaTags;