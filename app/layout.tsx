import type { Metadata, Viewport } from "next";
import { Michroma, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/lib/i18n";
import { themeScript } from "@/components/theme/theme-script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { COMPANY } from "@/lib/data";

/** Same geometric DNA as the Crystal Techify wordmark (Eurostile / Microgramma). */
const display = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Readable geometric sans for body, forms, and UI density. */
const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crystaltechify.com"),
  title: {
    default: "Crystal Techify — AI & Advanced Software Solutions",
    template: "%s | Crystal Techify",
  },
  description:
    "Premier technology company in Dublin, Ohio. AI, SaaS, mobile, Web3, e-commerce, and staff augmentation. 100+ projects completed across the United States.",
  keywords: [
    "Artificial Intelligence",
    "SaaS",
    "mobile development",
    "Web3",
    "e-commerce",
    "staff augmentation",
    "Dublin Ohio",
    "Crystal Techify",
  ],
  openGraph: {
    title: "Crystal Techify — AI & Advanced Software Solutions",
    description:
      "AI-Native Software That Ships.",
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} light`}
      suppressHydrationWarning
    >
      <head>
        {/* Resolve the theme before first paint — prevents a flash of the wrong palette */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className="min-h-screen font-sans">
        {/* If the app bundle never loads, keep motion's SSR opacity:0 from hiding the page */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html:not(.app-hydrated) [style*="opacity:0"],html:not(.app-hydrated) [style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`,
          }}
        />
        <ThemeProvider>
          <LocaleProvider>
            <SmoothScroll />
            {children}
          </LocaleProvider>
        </ThemeProvider>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
