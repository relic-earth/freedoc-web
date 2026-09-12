import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "FreeDoc — Free AI Medical Guidance",
    description: "Get free, instant medical guidance powered by AI. Ask about symptoms, medications, conditions, and more — 24/7, no appointment needed.",
    keywords: "free medical advice, AI doctor, health questions, symptoms checker, medical guidance",
    openGraph: {
          title: "FreeDoc — Free AI Medical Guidance",
          description: "Ask any health question, 24/7, completely free.",
          url: "https://freedoc.live",
          siteName: "FreeDoc",
          type: "website",
    },
    manifest: "/manifest.json",
    appleWebApp: {
          capable: true,
          statusBarStyle: "default",
          title: "FreeDoc",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#2563eb",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <html lang="en">
                <body>{children}</body>body>
          </html>html>
        );
}</html>
