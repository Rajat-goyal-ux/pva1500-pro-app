import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'PVA-1500 Pro | Solar I-V Curve Analysis Platform',
  description: 'PVA-1500 Pro IV Analysis Tool - Professional Solar PV Plant Inspection, I-V Curve Corrections, IEC Standards Compliance & Report Generator.',
  manifest: '/manifest.json',
  themeColor: '#020408',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Official Google AdSense Account Verification Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-2090516545725907" />

        {/* Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Official Google AdSense Integration Script */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2090516545725907"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#020408] text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
