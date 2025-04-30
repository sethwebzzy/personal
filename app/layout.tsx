import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KVDA Attachment System",
  description: "Apply and manage your student attachments at KVDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
