"use client";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Loader } from "lucide-react";
import React, { useState, FC } from "react";
import { ethers } from "ethers";
import { Web3Button } from "@thirdweb-dev/react"; // Make sure to import Web3Button

export default function Request() {
  const [addRequest, setAddRequest] = useState(false);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const address = useAddress();

  function resetForm() {
    setUser("");
    setAmount("");
    setMessage("");
  }

  return (
    <div>
      {!addRequest ? (
        <button
          className="px-2  bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white rounded"
          onClick={() => setAddRequest(true)}
        >
          Make request
        </button>
      ) : (
        <div className="p-4 border border-gray-300 rounded">
          <div className="bg-white p-4 rounded shadow-lg">
            <button
              className="text-red-500"
              onClick={() => setAddRequest(false)}
            >
              Close
            </button>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Create Request:</h3>
              <input
                type="text"
                placeholder="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
            </div>
            <Web3Button
              contractAddress="0x24CdC6e3dCFB3A2473CE2B0e29CEB9EF5c1c9800"
              action={(contract) => {
                contract.call("createRequest", [
                  user,
                  ethers.utils.parseUnits(amount, "wei"),
                  message,
                ]);
              }}
            >
              createRequest
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
}
