'use client';

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider 
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={Sepolia}
      dAppMeta={{
        name: "VizCoin",
        description: "A secure token with guardian functionality",
        logoUrl: "https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/OP_Network_Icon.svg",
        url: "https://vizcoin.com"
      }}
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ThirdwebProvider>
  );
} 