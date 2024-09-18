// src/app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'QR Code Llama - Free QR Code Generator',
  description: 'Generate custom QR codes for free. No ads, no email required. Create QR codes for URLs, WiFi, text messages, and more.',
  icons: {
    icon: '/images/llama-logo.png',
    apple: '/images/llama-logo.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/images/logocolor.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/images/llama-logo.png',
      },
    ],
  },
  manifest: '/site.webmanifest',

  openGraph: {
    title: 'QR Code Llama - Free QR Code Generator',
    description: '100% Free QR Code Generator. No Ads. No Emails. Just QR Codes.',
    url: 'https://www.qrcodellama.com',
    type: 'website',
    images: [
      {
        url: '/images/qrhero.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Llama',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@helloIamWilly',
    title: 'QR Code Llama - Free QR Code Generator',
    description: '100% Free QR Code Generator. No Ads. No Emails. Just QR Codes.',
    images: ['/images/qrhero.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "o596utu2ie");
          `}
        </Script>
      </body>
    </html>
  );
}
