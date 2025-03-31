'use client';

import { useAddress, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";
import { AccountModal } from "./AccountModal";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">VizCoin</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {!address ? (
              <ConnectWallet 
                theme="light"
                modalSize="wide"
                welcomeScreen={{
                  title: "Welcome to VizCoin",
                  subtitle: "Connect your wallet to get started"
                }}
                modalTitleIconUrl="https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/OP_Network_Icon.svg"
                switchToActiveChain={true}
                className="!bg-blue-600 hover:!bg-blue-700"
              />
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {address.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">{shortenAddress(address)}</span>
                </button>
                <button
                  onClick={() => disconnect()}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        address={address} 
      />
    </nav>
  );
} 