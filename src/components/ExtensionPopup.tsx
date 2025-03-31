import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { utils } from 'ethers';

interface WalletInfo {
  address: string | null;
  balance: string;
  allowance: string;
  canSend: boolean;
}

export default function ExtensionPopup() {
  const { isDarkMode } = useTheme();
  const address = useAddress();
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    balance: '0',
    allowance: '0',
    canSend: true
  });

  useEffect(() => {
    if (address) {
      setWalletInfo(prev => ({ ...prev, address }));
    }
  }, [address]);

  useEffect(() => {
    // Check if we're in the extension context
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage({ type: 'GET_WALLET_INFO' }, (response) => {
        if (response) {
          setWalletInfo(response);
        }
      });
    }
  }, []);

  const copyAddress = async () => {
    if (walletInfo.address) {
      await navigator.clipboard.writeText(walletInfo.address);
    }
  };

  return (
    <div className={`w-[400px] p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">VizCoin Wallet</h2>
        <ConnectWallet 
          theme={isDarkMode ? 'dark' : 'light'}
          modalSize="wide"
          welcomeScreen={{
            title: "Welcome to VizCoin",
            subtitle: "Connect your wallet to get started"
          }}
        />
      </div>

      {walletInfo.address ? (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Wallet Address</span>
              <button
                onClick={copyAddress}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
            <p className="font-mono text-sm break-all">{walletInfo.address}</p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Balance</span>
            </div>
            <p className="text-2xl font-bold">{utils.formatEther(walletInfo.balance)} VIZ</p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Allowance</span>
            </div>
            <p className="text-2xl font-bold">{utils.formatEther(walletInfo.allowance)} VIZ</p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sending Status</span>
            </div>
            <p className={`text-sm ${walletInfo.canSend ? 'text-green-500' : 'text-red-500'}`}>
              {walletInfo.canSend ? 'Can Send' : 'Cannot Send'}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Connect your wallet to view your VizCoin balance</p>
        </div>
      )}
    </div>
  );
} 