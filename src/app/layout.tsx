import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../styles/globals.css";
import Header from "../components/Header/Header"; // Headerコンポーネントをインポート

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GEEK OFFER 模擬面接",
  description: "模擬面接でスキルを磨こう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header /> {/* 全ページ共通のヘッダー */}
        <main>{children}</main> {/* 各ページのコンテンツ */}
      </body>
    </html>
  );
}
