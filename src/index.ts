import { ethers } from "ethers";
import ContractABI from "./abi/contract.json";

type Metadata = {
  name: string;
  description: string;
  url: string;
  icons: string[];
};

/** mainnet network config */
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

/** blast sepolia network config */
const blastSepolia = {
  chainId: 168587773,
  name: 'Blast Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://testnet.blastscan.io/',
  rpcUrl: 'https://sepolia.blast.io'
}

const errorMsg = [
  'Please install MetaMask first or set other provider to Elevatrix.',
]

const Elevatrix = function () {
  /** 
   * @des the modal is about webmodal
   */
  let provider: any = web3?.currentProvider

  /** 
   * @des set the provider to Elevatrix, you can get provider from web3/ethers or other wallet
   */
  const setProvider = (p: any) => {
    provider = p
  }

  /**
   * @des if your are newer in web3, you can connect wallet here.
   */
  const connectWallet = async () => {
    if (!provider) {
      throw new Error(errorMsg[0])
    }
    if (provider.selectedAddress) {
      return true
    }
    try {
      await provider.enable()
    } catch (e) {
      throw e
    }
  }

  /**
   * @des check out network is or not network you need
   * @param id [number] chainId you want to diff
   * @return boolean
   */
  const checkNetwork = (id) => {
    if (!provider) {
      throw new Error(errorMsg[0])
    }
    const chainId = provider.networkVersion
    if (chainId != (id || blastSepolia.chainId)) {
      return false
    }
    return true
  }

  /**
   * @des add Blast Sepolia network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  const addNetwork = async (config = {}) => {
    if (!provider) {
      throw new Error(errorMsg[0])
    }
    const { chainId, name, currency, explorerUrl, rpcUrl } = { ...blastSepolia, ...config }
    const params = {
      chainId:"0x" + chainId.toString(16),
      chainName: name,
      nativeCurrency: {
        name: currency,
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [rpcUrl],
      blockExplorerUrls: [explorerUrl],
    }
    try {
      await provider.request({ method: 'wallet_addEthereumChain', params: [params] })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * @des switch network to config network
   * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
   */
  const switchNetwork = async (config: any = {}) => {
    if (!provider) {
      throw new Error(errorMsg[0])
    }
    try {
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x' + (config.chainId || blastSepolia.chainId).toString(16) }] })
    } catch (error: any) {
      if (error?.code == 4902) {
        await addNetwork(config)
        return
      }
      throw error
    }
  }

  const getMintInfo = async (params: MintParams, apiBaseUrl?: string) => {
    const { projectId, quantity, wallet, mintType } = params
    const backupUrl = 'https://creator.elevatrix.xyz/'
    const url = (apiBaseUrl || backupUrl) + `/v1/mint?quantity=${quantity}&project_id=${projectId}&wallet=${wallet}&mint_type=${mintType}`
    const res = await fetch(url)
    return res.json()
  }

  
  type MintParams = {
    projectId: string;
    quantity: number;
    wallet?: string;
    mintType?: 1 | 2;
    istest?: boolean;
  }

  /**
   * @des nft mint function
   * @param projectId [string] project id which you can get from your project
   * @param quantity [number] mint quantity
   * @param wallet [string] wallet address
   * @param mintType [1 | 2] mint type 1: common mint 2: wallet mint[pro]
   */
  const mint = async (params: MintParams, apiBaseUrl?: string) => {
    if (!provider) {
      throw new Error(errorMsg[0])
    }
    const res = await getMintInfo(params, apiBaseUrl)
    if (res.code != 200) {
      throw new Error(res.msg)
    }
    const isRightNetwork = checkNetwork(res.data.chain_id)
    if (!isRightNetwork) {
      await switchNetwork()
    }
    const amount = ethers.parseEther((Number(res.data.price) * res.data.quantity).toString())
    const ethersProvider = new ethers.BrowserProvider(provider)
    const signer = await ethersProvider.getSigner()
    const contractAddress = res.data.contract
    const contract = new ethers.Contract(contractAddress, ContractABI, signer)
    const contractParams = {
      sender: res.data.sender,
      nonce: res.data.nonce,
      maxCount: res.data.max_count,
      allowMintAmount: res.data.allow_mint_count,
      tokenAddress: res.data.token_address,
      price: ethers.parseEther(res.data.price),
      mintType: res.data.mint_type,
      signature: res.data.signature,
    }
    const mintInfo = await contract.mint(
      contractParams,
      res.data.quantity,
      {
        value: amount,
      }
    )
    await mintInfo.wait()
    return mintInfo
  }

  return {
    provider,
    setProvider,
    connectWallet,
    checkNetwork,
    addNetwork,
    switchNetwork,
    getMintInfo,
    mint,
  }
}

module.exports = {
  Elevatrix,
  mainnet,
  blastSepolia,
}
