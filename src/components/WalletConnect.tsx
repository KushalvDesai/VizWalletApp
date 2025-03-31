'use client';

import { useAddress, useContract, useContractRead, useContractWrite, ConnectWallet, useChain } from "@thirdweb-dev/react";
import { useState } from "react";
import { utils } from "ethers";

const CONTRACT_ADDRESS = "0x2a7A82e0586101E5E35B85860639968a42754cB5";

export function WalletConnect() {
  const address = useAddress();
  const chain = useChain();
  const [newOwnerAddress, setNewOwnerAddress] = useState("");
  const [allowanceAddress, setAllowanceAddress] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [denyAddress, setDenyAddress] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferPayload, setTransferPayload] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");

  const { contract } = useContract(CONTRACT_ADDRESS);

  // Contract reads
  const { data: owner } = useContractRead(contract, "owner");
  const { data: balance } = useContractRead(contract, "getBalance");
  const { data: allowance } = useContractRead(contract, "allowance", [address]);
  const { data: isAllowedToSend } = useContractRead(contract, "isAllowedToSend", [address]);

  // Contract writes
  const { mutateAsync: proposeNewOwner } = useContractWrite(contract, "proposeNewOwner");
  const { mutateAsync: setAllowance } = useContractWrite(contract, "setAllowance");
  const { mutateAsync: denySending } = useContractWrite(contract, "denySending");
  const { mutateAsync: transfer } = useContractWrite(contract, "transfer");

  const handleProposeNewOwner = async () => {
    try {
      await proposeNewOwner({ args: [newOwnerAddress] });
      alert("New owner proposed successfully!");
    } catch (error) {
      console.error("Error proposing new owner:", error);
      alert("Failed to propose new owner");
    }
  };

  const handleSetAllowance = async () => {
    try {
      await setAllowance({
        args: [allowanceAddress, utils.parseEther(allowanceAmount)],
      });
      alert("Allowance set successfully!");
    } catch (error) {
      console.error("Error setting allowance:", error);
      alert("Failed to set allowance");
    }
  };

  const handleDenySending = async () => {
    try {
      await denySending({ args: [denyAddress] });
      alert("Sending denied successfully!");
    } catch (error) {
      console.error("Error denying sending:", error);
      alert("Failed to deny sending");
    }
  };

  const handleTransfer = async () => {
    try {
      const payload = transferPayload ? utils.toUtf8Bytes(transferPayload) : "0x";
      await transfer({
        args: [transferAddress, utils.parseEther(transferAmount), payload],
      });
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error transferring:", error);
      alert("Failed to transfer");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">VizWallet</h1>
        
        {!address ? (
          <ConnectWallet 
            theme="light"
            modalSize="wide"
            welcomeScreen={{
              title: "Welcome to VizWallet",
              subtitle: "Connect your wallet to get started"
            }}
            modalTitleIconUrl="https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/OP_Network_Icon.svg"
            switchToActiveChain={true}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold">Connected Address: {address}</p>
              <p className="font-semibold">Network: {chain?.name || "Loading..."}</p>
              <p className="font-semibold">Contract Balance: {balance ? utils.formatEther(balance) : "Loading..."} ETH</p>
              <p className="font-semibold">Your Allowance: {allowance ? utils.formatEther(allowance) : "Loading..."} ETH</p>
              <p className="font-semibold">Can Send: {isAllowedToSend ? "Yes" : "No"}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Propose New Owner</h2>
                <input
                  type="text"
                  value={newOwnerAddress}
                  onChange={(e) => setNewOwnerAddress(e.target.value)}
                  placeholder="New owner address"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleProposeNewOwner}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Propose
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Set Allowance</h2>
                <input
                  type="text"
                  value={allowanceAddress}
                  onChange={(e) => setAllowanceAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={allowanceAmount}
                  onChange={(e) => setAllowanceAmount(e.target.value)}
                  placeholder="Amount in ETH"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSetAllowance}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Set Allowance
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Deny Sending</h2>
                <input
                  type="text"
                  value={denyAddress}
                  onChange={(e) => setDenyAddress(e.target.value)}
                  placeholder="Address to deny"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleDenySending}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Deny
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Transfer ETH</h2>
                <input
                  type="text"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  placeholder="Recipient address"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Amount in ETH"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={transferPayload}
                  onChange={(e) => setTransferPayload(e.target.value)}
                  placeholder="Optional payload (hex)"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleTransfer}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 