import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vuelta · Spanish memory cards",
  description: "Create, organize, and practice Spanish–English memory cards.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
