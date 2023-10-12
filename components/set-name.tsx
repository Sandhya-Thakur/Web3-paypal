import React, { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";

export default function Setname() {
  const [addName, setAddName] = useState(false);
  const [name, setName] = useState("");
  const address = useAddress();

  function resetForm() {
    setName("");
  }

  return (
    <div>
      {!addName ? (
        <button
          className="px-2  bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white rounded"
          onClick={() => setAddName(true)}
        >
          Set Name
        </button>
      ) : (
        <div className="p-4 border border-gray-300 rounded">
          <div className="bg-white p-4 rounded shadow-lg">
            <button className="text-red-500" onClick={() => setAddName(false)}>
              Close
            </button>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Set Name:</h3>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <Web3Button
              contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
              action={(contract) => {
                contract.call("addName", [name]);
              }}
            >
              addName
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
}
