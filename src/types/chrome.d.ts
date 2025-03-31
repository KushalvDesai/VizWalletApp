declare namespace chrome {
  namespace runtime {
    function sendMessage(message: any, responseCallback?: (response: any) => void): void;
  }
  namespace storage {
    interface StorageData {
      theme?: string;
      connected?: boolean;
      address?: string | null;
      balance?: string;
      allowance?: string;
      canSend?: boolean;
    }
    interface Local {
      get(keys: string[], callback: (items: StorageData) => void): void;
      set(items: StorageData, callback?: () => void): void;
    }
    const local: Local;
  }
} 