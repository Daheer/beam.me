import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beam - Show Up, Get Noticed",
  description: "Show up, get noticed. Share your skills. Talk to the right people. No noise. Just networking.",
  keywords: "networking, professional, career, connections, business",
  authors: [{ name: "Beam Team" }],
  creator: "Beam",
  metadataBase: new URL("http://just-beam.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://just-beam.me",
    title: "Beam - Professional Networking Made Simple",
    description: "Show up, get noticed. Share your skills. Talk to the right people. No noise. Just networking.",
    siteName: "Beam",
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Beam App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beam - Professional Networking Made Simple",
    description: "Show up, get noticed. Share your skills. Talk to the right people. No noise. Just networking.",
    creator: "@BeamApp",
    images: ["/screenshot.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${schibstedGrotesk.className} antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="beam-ui-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
