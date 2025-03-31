'use client';

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain={Sepolia}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        dAppMeta={{
          name: "VizCoin",
          description: "A secure token with guardian functionality",
          logoUrl: "https://vizcoin.com/logo.png",
          url: "https://vizcoin.com",
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
} 