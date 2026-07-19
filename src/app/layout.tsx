import type { Metadata } from "next";
import { Anton, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${brand.businessName} — ${brand.tagline}`,
  description: brand.heroSubheadline,
  openGraph: {
    title: `${brand.businessName} — ${brand.tagline}`,
    description: brand.heroSubheadline,
    images: [brand.images.ogImage],
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
      className={`${anton.variable} ${manrope.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-body">
        {children}
      </body>
    </html>
  );
}
