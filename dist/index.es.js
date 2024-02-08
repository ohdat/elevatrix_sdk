
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { ethers } from 'ethers';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var ContractABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "signer_",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "ExceedTheStock",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InsufficientBalance",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidSignature",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NonceAlreadyExist",
		type: "error"
	},
	{
		inputs: [
		],
		name: "OutOfLimit",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "OwnableInvalidOwner",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "OwnableUnauthorizedAccount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "ShouldGreatThanZero",
		type: "error"
	},
	{
		inputs: [
		],
		name: "SignatureLengthNotEnough65",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bytes",
				name: "reason",
				type: "bytes"
			}
		],
		name: "DeployFailed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "symbol",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "projectId",
				type: "string"
			},
			{
				indexed: true,
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			}
		],
		name: "Deployed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "startTokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "quantity",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "mintType",
				type: "uint8"
			}
		],
		name: "Minted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "claimAllGas",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				components: [
					{
						internalType: "address",
						name: "sender",
						type: "address"
					},
					{
						internalType: "string",
						name: "nonce",
						type: "string"
					},
					{
						internalType: "string",
						name: "projectId",
						type: "string"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct Elevatrix.DeployMeta",
				name: "meta_",
				type: "tuple"
			}
		],
		name: "deploy721",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getBaseURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getSigner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "sender",
						type: "address"
					},
					{
						internalType: "string",
						name: "nonce",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "maxCount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "allowMintAmount",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "tokenAddress",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "mintType",
						type: "uint8"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct Elevatrix.MintMeta",
				name: "meta_",
				type: "tuple"
			},
			{
				internalType: "uint32",
				name: "quantity",
				type: "uint32"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "readClaimableYield",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "readGasParams",
		outputs: [
			{
				internalType: "uint256",
				name: "etherSeconds",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "etherBalance",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "lastUpdated",
				type: "uint256"
			},
			{
				internalType: "enum GasMode",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "newURI_",
				type: "string"
			}
		],
		name: "setBaseURI",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "signer_",
				type: "address"
			}
		],
		name: "setSigner",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

/** mainnet network config */
var mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
};
/** blast sepolia network config */
var blastSepolia = {
    chainId: 168587773,
    name: 'Blast Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://testnet.blastscan.io/',
    rpcUrl: 'https://sepolia.blast.io'
};
var errorMsg = [
    'Please install MetaMask first or set other provider to Elevatrix.',
];
var Elevatrix = function () {
    var _this = this;
    /**
     * @des the modal is about webmodal
     */
    var provider = web3 === null || web3 === void 0 ? void 0 : web3.currentProvider;
    /**
     * @des set the provider to Elevatrix, you can get provider from web3/ethers or other wallet
     */
    var setProvider = function (p) {
        provider = p;
    };
    /**
     * @des if your are newer in web3, you can connect wallet here.
     */
    var connectWallet = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!provider) {
                        throw new Error(errorMsg[0]);
                    }
                    if (provider.selectedAddress) {
                        return [2 /*return*/, true];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, provider.enable()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * @des check out network is or not network you need
     * @param id [number] chainId you want to diff
     * @return boolean
     */
    var checkNetwork = function (id) {
        if (!provider) {
            throw new Error(errorMsg[0]);
        }
        var chainId = provider.networkVersion;
        if (chainId != (id || blastSepolia.chainId)) {
            return false;
        }
        return true;
    };
    /**
     * @des add Blast Sepolia network
     * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
     */
    var addNetwork = function (config) {
        if (config === void 0) { config = {}; }
        return __awaiter(_this, void 0, void 0, function () {
            var _a, chainId, name, currency, explorerUrl, rpcUrl, params, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!provider) {
                            throw new Error(errorMsg[0]);
                        }
                        _a = __assign(__assign({}, blastSepolia), config), chainId = _a.chainId, name = _a.name, currency = _a.currency, explorerUrl = _a.explorerUrl, rpcUrl = _a.rpcUrl;
                        params = {
                            chainId: "0x" + chainId.toString(16),
                            chainName: name,
                            nativeCurrency: {
                                name: currency,
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            rpcUrls: [rpcUrl],
                            blockExplorerUrls: [explorerUrl],
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, provider.request({ method: 'wallet_addEthereumChain', params: [params] })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @des switch network to config network
     * @param config [NetworkConfig] network config like chainId, name, currency, explorerUrl, rpcUrl
     */
    var switchNetwork = function (config) {
        if (config === void 0) { config = {}; }
        return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!provider) {
                            throw new Error(errorMsg[0]);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        return [4 /*yield*/, provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x' + (config.chainId || blastSepolia.chainId).toString(16) }] })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_2 = _a.sent();
                        if (!((error_2 === null || error_2 === void 0 ? void 0 : error_2.code) == 4902)) return [3 /*break*/, 5];
                        return [4 /*yield*/, addNetwork(config)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5: throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    var getMintInfo = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var projectId, quantity, wallet, mintType, url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectId = params.projectId, quantity = params.quantity, wallet = params.wallet, mintType = params.mintType;
                    url = "https://creator.dev.catgpt.chat/v1/mint?quantity=".concat(quantity, "&project_id=").concat(projectId, "&wallet=").concat(wallet, "&mint_type=").concat(mintType);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    }); };
    var mint = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var res, isRightNetwork, amount, ethersProvider, signer, contractAddress, contract, contractParams, mintInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!provider) {
                        throw new Error(errorMsg[0]);
                    }
                    return [4 /*yield*/, getMintInfo(params)];
                case 1:
                    res = _a.sent();
                    if (res.code != 200) {
                        throw new Error(res.msg);
                    }
                    isRightNetwork = checkNetwork(res.data.chain_id);
                    if (!!isRightNetwork) return [3 /*break*/, 3];
                    return [4 /*yield*/, switchNetwork()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    amount = ethers.parseEther((Number(res.data.price) * res.data.quantity).toString());
                    ethersProvider = new ethers.BrowserProvider(provider);
                    return [4 /*yield*/, ethersProvider.getSigner()];
                case 4:
                    signer = _a.sent();
                    contractAddress = res.data.contract;
                    contract = new ethers.Contract(contractAddress, ContractABI, signer);
                    contractParams = {
                        sender: res.data.sender,
                        nonce: res.data.nonce,
                        maxCount: res.data.max_count,
                        allowMintAmount: res.data.allow_mint_count,
                        tokenAddress: res.data.token_address,
                        price: ethers.parseEther(res.data.price),
                        mintType: res.data.mint_type,
                        signature: res.data.signature,
                    };
                    return [4 /*yield*/, contract.mint(contractParams, res.data.quantity, {
                            value: amount,
                        })];
                case 5:
                    mintInfo = _a.sent();
                    return [4 /*yield*/, mintInfo.wait()];
                case 6:
                    _a.sent();
                    return [2 /*return*/, mintInfo];
            }
        });
    }); };
    return {
        provider: provider,
        setProvider: setProvider,
        connectWallet: connectWallet,
        checkNetwork: checkNetwork,
        addNetwork: addNetwork,
        switchNetwork: switchNetwork,
        mint: mint,
    };
};
module.exports = {
    Elevatrix: Elevatrix,
    mainnet: mainnet,
    blastSepolia: blastSepolia,
};

if(typeof window !== 'undefined') {
  window.elevatrix_sdk_Version = '0.0.1'
}
