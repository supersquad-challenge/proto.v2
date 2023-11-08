import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/layout/Layout";

const metadata = {
  name: "Supersquad",
  description: "supersqaud challenge",
  url: "https://supersquad.site",
  icons: ["/src/app/favicon.ico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
