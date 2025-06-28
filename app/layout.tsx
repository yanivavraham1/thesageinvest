import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FHLFBKEN01"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-FHLFBKEN01');
            `,
          }}
        />
      </head>

      <body className={inter.className + "relative"}>
        <SpeedInsights />
        <Analytics />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
