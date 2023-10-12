"use client";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Loader } from "lucide-react";
import React, { useState, FC } from "react";
import { ethers } from "ethers";

interface Transaction {
  action: string;
  amount: number;
  message: string;
  otherPartyAddress: string;
  otherPartyName: string;
}

export default function Transactions() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();
  console.log(address);
  const [user, setUser] = useState(process.env.NEXT_PUBLIC_WALLET_ADDRESS);
  const { data: transactions, isLoading } = useContractRead(
    contract,
    "getMyHistory",
    [user]
  );

  const renderTableData = () => {
    return transactions.map((transaction: Transaction, index: number) => {
      const { action, amount, message, otherPartyAddress, otherPartyName } =
        transaction;
      const amountString = ethers.BigNumber.from(amount).toString();
      return (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{action}</td>
          <td className="px-4 py-2">{amountString}</td>
          <td className="px-4 py-2">{message}</td>
          <td className="px-4 py-2">
            {otherPartyAddress.length < 6
              ? otherPartyAddress
              : `${otherPartyAddress.slice(0, 3)}...${otherPartyAddress.slice(
                  -3
                )}`}
          </td>
          <td className="px-4 py-2">{otherPartyName}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="float-right m-4 shadow-lg h-auto">
        {" "}
        {/* Changed height to h-auto */}
        <CardHeader className="p-4 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
          <CardTitle className="flex items-center space-x-4">
            <BadgeDollarSign />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {" "}
          {/* Added padding class */}
          {isLoading ? (
            <div className="flex justify-center">
              <Loader height={80} width={80} />
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-bold">No.</th>
                  <th className="px-4 py-2 font-bold">Type</th>
                  <th className="px-4 py-2 font-bold">Amount</th>
                  <th className="px-4 py-2 font-bold">Description</th>
                  <th className="px-4 py-2 font-bold">Address</th>
                  <th className="px-4 py-2 font-bold">Name</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderTableData()}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
