"use client";
// Import required libraries
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

// Define your header component
export default function Header() {
  return (
    <div className="flex items-center pl-16 pt-8 w-full text-blue-500">
      {" "}
      {/* Increased left and top padding to the flex container */}
      <div className="px-2">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <div className="ml-2 px-2">
        <span>Help</span>
      </div>
      <div className="ml-2 px-2">
        <span>Docs</span>
      </div>
      <div className="ml-2 px-2">
        <span>About us</span>
      </div>
      <div className="absolute right-0 pr-16">
        <ConnectWallet />
      </div>
    </div>
  );
}
