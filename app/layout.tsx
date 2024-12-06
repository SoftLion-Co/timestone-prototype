import "./globals.css";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";
import { MantineProvider } from "@mantine/core";
import CartComponent from "@/components/cart-component/CartComponent";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({ subsets: ["latin"] });

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
