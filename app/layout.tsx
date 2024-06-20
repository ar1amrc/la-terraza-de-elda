import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { i18n, type Locale } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Terraza de Elda",
  description: "Web de La Terraza de Elda, Casa de alquiler en La Habana, Cuba",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
