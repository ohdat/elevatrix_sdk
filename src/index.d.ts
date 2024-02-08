declare type Metadata = {
  name: string
  description: string
  url: string
  icons: string[]
}

declare type NetworkConfig = {
  chainId: number
  name: string
  currency: string
  explorerUrl: string
  rpcUrl: string
}

declare type MintParams = {
  projectId: string;
  quantity: number;
} | {
  projectId: string;
  quantity: number;
  wallet: string;
  mintType: 1 | 2;

}

declare interface Elevatrix {
  modal: any;
  setProvider: (p: any) => void;
  connectWallet: () => Promise<void>;
  disConnectWallet: () => Promise<void>;
  checkNetwork: (chainId?: number) => boolean;
  addNetwork: (config?: NetworkConfig) => Promise<void>;
  switchNetwork: (config?: NetworkConfig) => Promise<void>;
  getMintInfo: (params: MintParams, apiBaseUrl?: string) => Promise<any>;
  mint: (params: MintParams) => Promise<void>;
}

declare namespace defaultExport {
  const mainnet: Metadata;
  const blastnet: Metadata;
  const Elevatrix: new () => Elevatrix;
}

export = defaultExport