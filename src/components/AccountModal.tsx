'use client';

import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";
import { utils } from "ethers";

const TOKEN_ADDRESS = "0x8E3784E3ec0b4C03d4B9CA6df1800c6D5aDedF9c";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export function AccountModal({ isOpen, onClose, address }: AccountModalProps) {
  const [newOwnerAddress, setNewOwnerAddress] = useState("");
  const [allowanceAddress, setAllowanceAddress] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [denyAddress, setDenyAddress] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");

  const { contract } = useContract(TOKEN_ADDRESS);

  // Token reads
  const { data: balance } = useContractRead(contract, "balanceOf", [address]);
  const { data: allowance } = useContractRead(contract, "allowance", [address]);
  const { data: isAllowedToSend } = useContractRead(contract, "isAllowedToSend", [address]);
  const { data: owner } = useContractRead(contract, "owner");

  // Token writes
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
        args: [allowanceAddress, utils.parseUnits(allowanceAmount, 18)], // Assuming 18 decimals
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
      await transfer({
        args: [transferAddress, utils.parseUnits(transferAmount, 18)], // Assuming 18 decimals
      });
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error transferring:", error);
      alert("Failed to transfer");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">VizCoin Account</h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Token Information</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">Address: {address}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">VizCoin Balance: {balance ? utils.formatUnits(balance, 18) : "Loading..."} VIZ</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your Allowance: {allowance ? utils.formatUnits(allowance, 18) : "Loading..."} VIZ</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Can Send: {isAllowedToSend ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Propose New Owner</h3>
                <input
                  type="text"
                  value={newOwnerAddress}
                  onChange={(e) => setNewOwnerAddress(e.target.value)}
                  placeholder="New owner address"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleProposeNewOwner}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Propose
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Set Allowance</h3>
                <input
                  type="text"
                  value={allowanceAddress}
                  onChange={(e) => setAllowanceAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  type="text"
                  value={allowanceAmount}
                  onChange={(e) => setAllowanceAmount(e.target.value)}
                  placeholder="Amount in VIZ"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSetAllowance}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Set Allowance
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Deny Sending</h3>
                <input
                  type="text"
                  value={denyAddress}
                  onChange={(e) => setDenyAddress(e.target.value)}
                  placeholder="Address to deny"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleDenySending}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Deny
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Transfer VIZ</h3>
                <input
                  type="text"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  placeholder="Recipient address"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  type="text"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Amount in VIZ"
                  className="w-full p-2 border dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleTransfer}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 