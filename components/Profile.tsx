"use client";
import { useContract, useContractRead, useBalance } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";
import Setname from '@/components/set-name'
export default function Profile() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
  const [user, setUser] = useState(process.env.NEXT_PUBLIC_WALLET_ADDRESS!);
  const { data: nameData, isLoading: isNameLoading } = useContractRead(
    contract,
    "getMyName",
    [user]
  );
  const { data: balanceData } = useBalance(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
  );
  const [balance, setBalance] = useState<string | null>(null);
  useEffect(() => {
    const fetchBalance = async () => {
      // Specify the address you want to query
      const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS!;

      // Create a new provider connected to the Mumbai testnet
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.maticvigil.com/"
      );

      try {
        // Fetch the balance in wei
        const balanceWei = await provider.getBalance(address);

        // Convert the balance to Matic and set the state
        const balanceMatic = ethers.utils.formatEther(balanceWei);
        setBalance(balanceMatic);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="float-left m-4 shadow-lg">
        <CardHeader className="p-4 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
          <CardTitle className="flex items-center space-x-4">
            <User />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Attribute
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Name</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isNameLoading ? "Loading..." : nameData?.name || "Unknown"}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Balance</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {balance ? (
                    <>
                      <span className="mr-2">
                        {parseFloat(balance).toFixed(2)}
                      </span>
                      <Image
                        src="/matic.png"
                        alt="Matic symbol"
                        width={20}
                        height={20}
                      />
                    </>
                  ) : (
                    "Loading..."
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <span className="mr-2">
          <Setname/>
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
