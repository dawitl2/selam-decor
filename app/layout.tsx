import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selam Wedding Planner & Decor | Addis Ababa",
  description:
    "Wedding planning, event decoration and custom floral design for weddings, engagements, birthdays, ceremonies and private celebrations.",
  applicationName: "Selam Wedding Planner & Decor",
  keywords: [
    "wedding planner Addis Ababa",
    "wedding decor Ethiopia",
    "event decoration",
    "custom flower design",
    "birthday decoration",
    "ceremony styling",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Selam Wedding Planner & Decor",
    description:
      "Beautiful event settings and custom floral design, thoughtfully made.",
    type: "website",
    images: [
      {
        url: "/assets/hero-stage.webp",
        width: 2048,
        height: 1536,
        alt: "Elegant ivory wedding stage styled with florals and candlelight",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f0e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
