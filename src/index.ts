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

const Elevatrix = function (props: any = {}) {
  let { type, provider, baseUrlConfig } = props || {};
  let modal: any = null;
  // provider = type === "default" ? null : provider;
  const backupUrlConfig = {
    url: "https://creator.elevatrix.xyz",
    ...baseUrlConfig,
  };
  let networks = [
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

  async function getNetworks() {
    const res = await fetch(backupUrlConfig.url + "/v2/chains/networks");
    const resJson = await res.json();
    networks = resJson.data;
    return networks;
  }

  const initDefault = async () => {
    await getNetworks();
    if (type === "default") {
      modal = createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: networks,
        projectId: "e84dcbc0387226f505ea48159e32c174",
      });
    }
  };

  initDefault();

  /**
   * @des if your are newer in web3, you can connect wallet here.
   */
  const connectWallet = () => {
    return new Promise<void>((resolve, reject) => {
      if (type === "default") {
        if (!modal.getAddress()) {
          const unsubscribe = modal.subscribeEvents((event) => {
            const data = event.data;
            if (data.event === "MODAL_CLOSE") {
              unsubscribe();
              reject(new Error(errorMsg[1]));
            }
            if (data.event === "CONNECT_SUCCESS") {
              setTimeout(() => {
                if (modal.getAddress()) {
                  unsubscribe();
                  resolve();
                  return;
                }
                unsubscribe();
                reject(new Error(errorMsg[1]));
              }, 100);
            }
          });
          modal.open();
          return;
        }
        provider = modal.getWalletProvider();
        resolve();
      } else {
        if (!provider) {
          reject(new Error(errorMsg[0]));
        }
        provider
          .getSigner()
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  /**
   * @des check out network is or not network you need
   * @param id [number] chainId you want to diff
   * @return boolean
   */
  const checkNetwork = (id) => {
    if (!provider) {
      throw new Error(errorMsg[0]);
    }
    const chainId = provider.networkVersion;
    if (chainId != id) {
      return false;
    }
    return true;
  };

  /**
   * @des add Blast Sepolia network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  const addNetwork = async (config: any = {}) => {
    if (!config || !config.chainId) {
      throw new Error("Please set right config.");
    }
    if (!provider) {
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
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * @des switch network to config network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  const switchNetwork = async (config: any = {}) => {
    if (!config || !config.chainId) {
      throw new Error("Please set right config.");
    }
    const chainId = "0x" + config.chainId.toString(16);
    if (type === "default") {
      await modal.switchNetwork(config.chainId);
    } else {
      if (!provider) {
        throw new Error(errorMsg[0]);
      }
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (error: any) {
        if (error?.code == 4902) {
          await addNetwork(config);
          return;
        }
        throw error;
      }
    }
  };

  const getMintInfo = async (params, apiBaseUrl) => {
    const { projectId, quantity, wallet, mintType } = params;
    const url =
      (apiBaseUrl || backupUrlConfig.url) +
      `/v1/mint?quantity=${quantity || ""}&project_id=${
        projectId || ""
      }&wallet=${wallet || ""}&mint_type=${mintType || ""}`;
    const res = await fetch(url);
    return res.json();
  };

  /**
   * @des nft mint function
   * @param projectId [string] project id which you can get from your project
   * @param quantity [number] mint quantity
   * @param wallet [string] wallet address
   * @param mintType [1 | 2] mint type 1: common mint 2: wallet mint[pro]
   */
  const mint = async (params, apiBaseUrl) => {
    await connectWallet();
    const res = await getMintInfo(
      {
        ...params,
        wallet:
          type === "default" ? modal.getAddress() : provider.selectedAddress,
      },
      apiBaseUrl
    );
    if (res.code != 200) {
      throw new Error(res.message || res.msg);
    }
    const isRightNetwork = checkNetwork(res.data.chain_id);
    if (!isRightNetwork) {
      const rightNetworkConfig = networks.find(
        (item) => item.chainId == res.data.chain_id
      );
      await switchNetwork(rightNetworkConfig);
    }
    const amount = ethers.parseEther(
      (Number(res.data.price) * res.data.quantity).toString()
    );
    const ethersProvider = new ethers.BrowserProvider(provider);
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
  };

  return {
    modal,
    provider,
    networks,
    mint,
  };
};

export { Elevatrix };
