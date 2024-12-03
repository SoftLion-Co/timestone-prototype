import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";
import { MantineProvider } from "@mantine/core";
import CartComponent from "@/components/cart-component/CartComponent";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timestone - головна сторінка",
  description: "Дізнайтесь про нас більше",
  keywords: ["Годинники", "Чернівці", "онлайн-магазин"],
  authors: { name: "Timestone" },
  viewport: { initialScale: 1.0, width: "device-width" },
  icons: { icon: "" },
  metadataBase: new URL("https://timestone.com"),
  openGraph: {
    title: "Timestone - онлайн-магазин годинників",
    description: "Найкращі годинники за доступною ціною",
    url: "https://timestone.com",
    siteName: "Timestone",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
      },
    ],
    locale: "ua",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <MantineProvider>
            <Header />
            <CartComponent />
            <main>{children}</main>
            <Footer />
          </MantineProvider>
        </CartProvider>
      </body>
    </html>
  );
}
