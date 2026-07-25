import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eastel.digital'),
  title: {
    default: 'Eastel Digital - Revolusi 5G Terpantas',
    template: '%s | Eastel Digital'
  },
  description: 'Miliki data gergasi sehingga 700GB dengan kelajuan 5G sebenar. Sertai komuniti Eastelpreneur hari ini dan jana pendapatan pasif berterusan dari setiap pendaftaran ejen anda.',
  openGraph: {
    title: 'Eastel Digital - Revolusi 5G Terpantas',
    description: 'Miliki data gergasi sehingga 700GB dengan kelajuan 5G sebenar.',
    url: 'https://eastel.digital',
    siteName: 'Eastel Digital',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eastel Digital - Revolusi 5G Terpantas',
    description: 'Miliki data gergasi sehingga 700GB dengan kelajuan 5G sebenar.',
  },
  alternates: {
    canonical: 'https://eastel.digital',
  }
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
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
