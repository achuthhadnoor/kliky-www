import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./providers";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kliky.app"),
  title: "kliky — Mechanical Keyboard Soundscapes for Your Laptop",
  description: "Turn your laptop's silent keyboard into a tactile, audibly satisfying mechanical keyboard. Experience Cherry Blue, Creamy Linear, and Retro Typewriter sounds in real-time.",
  keywords: [
    "kliky",
    "mechanical keyboard sound app",
    "laptop clicky keyboard app",
    "cherry mx blue sound simulator",
    "typing sounds utility",
    "keyboard sound effects mac",
    "tactile keyboard sounds",
    "keyboard typing soundscapes"
  ],
  authors: [{ name: "Kliky Team" }],
  creator: "Kliky Team",
  openGraph: {
    title: "kliky — Mechanical Keyboard Soundscapes for Your Laptop",
    description: "An elegant background app that makes your laptop keyboard sound like a highly satisfying mechanical keyboard. Try it instantly in your browser.",
    url: "https://kliky.app",
    siteName: "kliky",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "kliky — Mechanical Keyboard Soundscapes for Your Laptop",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kliky — Mechanical Keyboard Soundscapes for Your Laptop",
    description: "Turn your laptop's silent keyboard into a satisfying mechanical keyboard. Instant real-time soundscapes.",
    images: ["/og-image.png"],
    creator: "@kliky_app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
