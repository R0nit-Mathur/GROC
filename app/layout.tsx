import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GROC — Where Builders Become Creators",
  description:
    "An open-source developer ecosystem built on repetition and consistency. Join real builders shipping projects, contributing to key compilers, and learning in public.",
  keywords: [
    "GROC",
    "Open Source",
    "Developer Community",
    "Software Engineering",
    "Systems Programming",
    "Rust",
    "Go",
    "Next.js",
    "ETHDenver",
  ],
  authors: [{ name: "GROC Labs" }],
  openGraph: {
    title: "GROC — Where Builders Become Creators",
    description:
      "An open-source developer ecosystem built on repetition and consistency. Join real builders shipping projects, contributing to key compilers, and learning in public.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GROC — Where Builders Become Creators",
    description:
      "An open-source developer ecosystem built on repetition and consistency. Join real builders shipping projects, contributing to key compilers, and learning in public.",
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
      className={`${spaceGrotesk.variable} ${jakartaSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}
