import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { themeScript } from "@/components/theme/theme-script";
import { COMPANY } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crystaltechify.com"),
  title: {
    default: "Crystal Techify — AI & Advanced Software Engineering",
    template: "%s | Crystal Techify",
  },
  description:
    "Premier Dublin, Ohio-based AI & advanced software engineering firm. 500+ projects delivered worldwide by the top 3% of global talent.",
  keywords: [
    "AI engineering",
    "software development",
    "generative AI consulting",
    "blockchain",
    "SaaS development",
    "staff augmentation",
    "Dublin Ohio",
  ],
  openGraph: {
    title: "Crystal Techify — AI & Advanced Software Engineering",
    description:
      "Empowering businesses to weave the future of software, seamlessly together.",
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090A0F" },
    { media: "(prefers-color-scheme: light)", color: "#F9F9FB" },
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
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Resolve the theme before first paint — prevents a flash of the wrong palette */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        {/* No-JS safety net: reveal animations render hidden until hydrated */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
