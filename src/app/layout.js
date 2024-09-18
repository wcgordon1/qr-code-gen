// src/app/layout.js
'use client';  // This line marks the component to run on the client-side

import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from 'react';

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

export default function RootLayout({ children }) {
  useEffect(() => {
    // Ensure the script is not already loaded
    if (!window.gtag) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.textContent = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "o596utu2ie");
      `;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
