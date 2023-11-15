import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import "./globals.css";


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
<<<<<<< HEAD
      <body style={{ margin: "0px" }}>
        <GlobalStyle />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
=======
      <body style={{ margin: '0px' }}>
        <GlobalStyle />
        <Layout>{children}</Layout>
>>>>>>> 09511c3 (Add: Header)
      </body>
    </html>
  );
}
