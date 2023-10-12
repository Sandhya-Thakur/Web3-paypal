"use client";
import Transactions from "@/components/Transactions";
import Profile from "@/components/Profile";
import Request from "@/components/Request";
import { useAddress } from "@thirdweb-dev/react";


export default function Home() {
  const address = useAddress();
  return (
    <div>
         {address && (
        <div className="grid grid-cols-2 px-32">
          <div className="grid grid-rows-2 ">
          <Profile />
          <Request/>
          </div>
          <Transactions />
          
        </div>
      )}
    </div>
  );
}
