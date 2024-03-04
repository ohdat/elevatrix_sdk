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
  /** web3modal inited, you can use it to get methods about web3modal */
  modal: any;
  /** provider inited, you can use it to get methods about provider */
  provider: any;
  /** blockchain networks config arr */
  networks: NetworkConfig[];
  /** mint nft */
  mint: (params: MintParams, apiBaseUrl?: string) => Promise<void>;
}

declare namespace defaultExport {
  const Elevatrix: new (type?: 'default' | 'custom', provider?: any) => Elevatrix;
}

export = defaultExport