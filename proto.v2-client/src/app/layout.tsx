"use client";
import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

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
  const client = new QueryClient();
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <QueryClientProvider client={client}>
          <GlobalStyle />
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
