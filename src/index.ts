import { ethers } from "ethers";
import ContractABI from "./abi/contract.json";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";

const metadata = {
  name: "ELEVATRIX",
  description:
    "ELEVATRIX, the cutting-edge zero coding platform for NFT generation and deployment. We pave the way for creators to enter the NFT space with low costs and low threshold.",
  url: "https://elevatrix.vercel.app/",
  icons: [],
};

const errorMsg = [
  "Please install MetaMask first or set other provider to Elevatrix.",
  "User rejected the request.",
];

class Elevatrix {
  ethers = ethers;
  endpoint = "https://creator.elevatrix.xyz";
  provider: ethers.Eip1193Provider | undefined = undefined;
  networks = [
    {
      chainId: 1,
      name: "Ethereum",
      currency: "ETH",
      explorerUrl: "https://etherscan.io",
      rpcUrl: "https://cloudflare-eth.com",
    },
    {
      chainId: 168587773,
      name: "Blast Sepolia",
      currency: "ETH",
      explorerUrl: "https://testnet.blastscan.io/",
      rpcUrl: "https://sepolia.blast.io",
    },
  ];
  constructor({
    endpoint,
    provider,
  }: {
    endpoint: string | undefined;
    provider: ethers.Eip1193Provider | undefined;
  }) {
    if (endpoint) this.endpoint = endpoint;
    if (provider) this.provider = provider;
  }
  async connectWallet() {
    if (this.provider) {
      const singer = await new ethers.BrowserProvider(
        this.provider
      ).getSigner();
      return singer.getAddress();
    }

    const modal = createWeb3Modal({
      ethersConfig: defaultConfig({ metadata }),
      chains: this.networks,
      projectId: "e84dcbc0387226f505ea48159e32c174",
    });

    return new Promise<string>((resolve, reject) => {
      const unsubscribe = modal.subscribeEvents((event) => {
        const data = event.data;
        if (data.event === "MODAL_CLOSE") {
          unsubscribe();
          reject(new Error(errorMsg[1]));
        }
        if (data.event === "CONNECT_SUCCESS") {
          this.provider = modal.getWalletProvider();
          setTimeout(() => {
            const address = modal.getAddress();
            if (address) {
              unsubscribe();
              resolve(address);
              return;
            }
            unsubscribe();
            reject(new Error(errorMsg[1]));
          }, 100);
        }
      });
      modal.open();
    });
  }

  async checkNetwork(id) {
    if (!this.provider) {
      throw new Error(errorMsg[0]);
    }
    const ethersProvider = new ethers.BrowserProvider(this.provider);

    const network = await ethersProvider.getNetwork();
    if (network.chainId != id) {
      return false;
    }
    return true;
  }

  /**
   * @des add Blast Sepolia network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  async addNetwork(config: any = {}) {
    if (!config || !config.chainId) {
      throw new Error("Please set right config.");
    }
    if (!this.provider) {
      throw new Error(errorMsg[0]);
    }
    const { chainId, name, currency, explorerUrl, rpcUrl } = config;
    const params = {
      chainId: "0x" + chainId.toString(16),
      chainName: name,
      nativeCurrency: {
        name: currency,
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [rpcUrl],
      blockExplorerUrls: [explorerUrl],
    };
    try {
      await this.provider.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addToken(params: {
    tokenAddress: string;
    tokenSymbol: string;
    tokenDecimals: number;
    tokenImage: string;
  }) {
    const tokenAddress = "0xd00981105e61274c8a5cd5a88fe7e037d935b513";
    const tokenSymbol = "TUT";
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/200/300";
    if (!this.provider) {
      throw new Error(errorMsg[0]);
    }
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await this.provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @des switch network to config network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  async switchNetwork(config: any = {}) {
    if (!config || !config.chainId) {
      throw new Error("Please set right config.");
    }
    const chainId = "0x" + config.chainId.toString(16);

    if (!this.provider) {
      throw new Error(errorMsg[0]);
    }
    try {
      await this.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error: any) {
      if (error?.code == 4902) {
        await this.addNetwork(config);
        return;
      }
      throw error;
    }
  }

  private async getMintInfo(params) {
    const { projectId, quantity, wallet, mintType } = params;
    const url =
      this.endpoint +
      `/v1/mint?quantity=${quantity || ""}&project_id=${
        projectId || ""
      }&wallet=${wallet || ""}&mint_type=${mintType || ""}`;
    const res = await fetch(url);
    return res.json();
  }

  /**
   * @des nft mint function
   * @param projectId [string] project id which you can get from your project
   * @param quantity [number] mint quantity
   * @param wallet [string] wallet address
   * @param mintType [1 | 2] mint type 1: common mint 2: wallet mint[pro]
   */
  async mint(params) {
    const walletAddress = await this.connectWallet();
    const res = await this.getMintInfo({
      ...params,
      wallet: walletAddress,
    });
    if (res.code != 200) {
      throw new Error(res.message || res.msg);
    }
    const isRightNetwork = await this.checkNetwork(res.data.chain_id);
    if (!isRightNetwork) {
      const rightNetworkConfig = this.networks.find(
        (item) => item.chainId == res.data.chain_id
      );
      await this.switchNetwork(rightNetworkConfig);
    }
    const amount = ethers.parseEther(
      (Number(res.data.price) * res.data.quantity).toString()
    );
    if (!this.provider) {
      throw new Error(errorMsg[0]);
    }
    const ethersProvider = new ethers.BrowserProvider(this.provider);
    const signer = await ethersProvider.getSigner();
    const contractAddress = res.data.contract;
    const contract = new ethers.Contract(
      contractAddress,
      ContractABI.abi,
      signer
    );
    const contractParams = {
      sender: res.data.sender,
      nonce: res.data.nonce,
      maxCount: res.data.max_count,
      allowMintAmount: res.data.allow_mint_count,
      tokenAddress: res.data.token_address,
      price: ethers.parseEther(res.data.price),
      mintType: res.data.mint_type,
      signature: res.data.signature,
    };
    const mintInfo = await contract.mint(
      contractParams,
      res.data.quantity.toString(),
      {
        value: amount,
      }
    );
    return mintInfo;
  }
}

export { Elevatrix };
