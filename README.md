# Elevatrix_SDK
This is a web3 sdk for elevatrix mint.

Website: https://elevatrix.xyz/

Main features:
* mint: this function can mint nft images for elevatrix website.
* connectWallet: this function can connect wallet with in web3connect or provider you set.
* checkNetwork: this function can check out network is or not network you need
* addNetwork: this function can add default network or config you provide.
* switchNetwork: this function can switch network you provide or default network.
* getMintInfo: this function can give you mint info you need to diy your sdk.


## Install
Using nodejs
````sh
npm install elevatrix --save
// or
yarn add elevatrix
````
Using browser
````
<script src="https://cdn.jsdelivr.net/npm/elevatrix/dist/index.umd.js" />
````

## Demo
````
let elevatrix = null
const Component = () => {
  ...
  useEffect(() => {
    elevatrix = new Elevatrix()
    return () => {
      elevatrix = null
    }
  }, [])
  ...
  const handleMint = async () => {
    try {
      await elevatrix.mint({
        projectId: "your projectId", // you can get it in your elevatrix project
        quantity: 1,
        mintType: 1
      })
      // do anything you want to do
    } catch (e) {
      console.log(e)
    }
  }
  ...
}
````