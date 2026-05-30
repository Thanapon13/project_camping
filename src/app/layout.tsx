import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer/Footer";
import { currentUser } from "@clerk/nextjs/server";
import IncomingChatListener from "@/components/messages/IncomingChatListener";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Landmark Explorer | Discover Amazing Places in Thailand",
  description:
    "Explore and discover the most beautiful landmarks and travel destinations across Thailand. Plan your next adventure with our curated collection of hidden gems and popular attractions.",
  keywords: [
    "landmarks",
    "travel",
    "Thailand",
    "destinations",
    "tourism",
    "explore",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const userId = user?.id ?? null;
  const userImage = user?.imageUrl ?? null;

  return (
    <ClerkProvider>
      <html lang="en" className="bg-background" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        >
          <Providers>
            <Navbar userImage={userImage} />
            <main className="px-8 mx-auto">{children}</main>
            <Footer />
            {userId && <IncomingChatListener currentUserId={userId} />}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
