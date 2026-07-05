import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/src/components/BottomNav";
import { SplashScreen } from "@/src/components/SplashScreen";

export const metadata: Metadata = {
  title: "Ucikro",
  description: "Lerne Kroatisch mit Ucikro",
  icons: {
    icon: "/flag.svg",
    apple: "/flag.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <SplashScreen />
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
