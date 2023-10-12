"use client";
import { ThirdwebProvider } from "@/components/ThirdwebProvider";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  paperWallet,
  magicLink,
} from "@thirdweb-dev/react";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/hocs/Header";
import Footer from "@/hocs/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),

          safeWallet(),
          paperWallet(),
          magicLink({
            apiKey:
              "qkfPMZwxQdKDdG7P8VCUeaEuAksJ3zLPmAAIrL15YppjapOkXAdnEZvBZy8Tk7zMxHB39Tk8q4x-e5LGpVimpA",
          }),
        ]}
        activeChain="mumbai"
        clientId="4d2c64015e4d9319d093f6b6400e7a6b"
      >
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ThirdwebProvider>
    </html>
  );
}
