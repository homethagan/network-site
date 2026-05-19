import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetCloud Academy - Learn Networking & Cloud Computing",
  description: "Master cloud computing and networking with comprehensive courses and tutorials. Learn DevOps, Kubernetes, AWS, and modern infrastructure from industry experts.",
  keywords: "cloud computing, networking, DevOps, Kubernetes, AWS, infrastructure, tutorials",
  authors: [{ name: "NetCloud Academy" }],
  creator: "NetCloud Academy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com'),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com',
    siteName: "HomeThagan",
    title: "NetCloud Academy - Learn Networking & Cloud Computing",
    description: "Master cloud computing and networking with comprehensive courses and tutorials",
    images: [
      {
        url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com') + "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HomeThagan - NetCloud Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetCloud Academy",
    description: "Learn networking and cloud computing from industry experts",
    images: [(process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com') + "/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
    >
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HomeThagan - NetCloud Academy',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com',
              logo: (process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com') + '/logo.png',
              description: 'Master cloud computing and networking with comprehensive courses and tutorials',
              sameAs: [
                'https://twitter.com/homethagan',
                'https://linkedin.com/company/homethagan',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Support',
                url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com') + '/contact',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
