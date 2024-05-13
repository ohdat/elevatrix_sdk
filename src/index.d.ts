declare type Metadata = {
  name: string;
  description: string;
  url: string;
  icons: string[];
};

declare type NetworkConfig = {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
};

declare type MintParams =
  | {
      projectId: string;
      quantity: number;
    }
  | {
      projectId: string;
      quantity: number;
      mintType: 1 | 2;
    };

/** every param can be empty */
declare type InitElevatrix = {
  type?: "default" | "injected";
  provider?: any;
  // set the backend api base url about network get and mintInfo get,
  // if not set, will use prod info.
  baseUrlConfig?: {
    url?: string;
  };
};

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
  const Elevatrix: new ({
    type,
    provider,
    baseUrlConfig,
  }: InitElevatrix) => Elevatrix;
}

export = defaultExport;
