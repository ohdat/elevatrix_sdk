# Elevatrix_SDK
This is a web3 sdk for elevatrix mint.

Website: https://elevatrix.xyz/

Main features:
* mint: this function can mint nft images for elevatrix website.
* modal: web3modal about @web3modal/ethers, you can use it to get methods about web3modal
* provider: the ethers provider connect with wallet if user agree.
* networks: all blockchain networks can use in elevatrix platform.

## Using in Node
````sh
npm install elevatrix --save
// or
yarn add elevatrix
````
````javascript
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

## Using in Browser
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mint demo</title>
</head>
<body>
  <button id="mint">mint test</button>
  <script src="https://cdn.jsdelivr.net/npm/elevatrix/dist/index.umd.js" />
  <script>
    const mintBtn = document.getElementById('mint');
    const elevatrix = new Elevatrix.default({
      baseUrlConfig: {
        network: 'https://creator.dev.catgpt.chat'
      }
    })
    mintBtn.addEventListener('click', async () => {
      await elevatrix.mint({
        projectId: "your projectId", // you can get it in your elevatrix project
        quantity: 1, // this is the amount you can mint nft numbers
        mintType: 1, // 1 is for normal mint, 2 is for white list mint
      })
      console.log('finished')
    });
  </script>
</body>
</html>
````

## Mint Intro
1. you should create a elevatrix though new Elevatrix, and all methods in elevatrix you created.

````javascript
let elevatrix = new Elevatrix()
// or
// every param can be empty
let elevatrix = new Elevatrix({
  /**
   * @value 'default' | 'injected'
   * @empty can be empty
   * @des elevatrix will connect wallet auto and switch network auto and more auto, if injected, you need to do it for yourself.
   */
  type: 'default',
  /**
   * @value a ethers provider or null
   * @empty can be empty
   * @des if you set type 'injected', you must to set it, this is a ethers provider connect wallet.
   * @des if you set type 'default', you can set it to null or not set.
   */
  oldProvider: null,
  /**
   * @des this is a config about backend to get network and mint base url to get info
   */
  baseUrlConfig: { // can be empty.
    network: 'https://xxx.com', // set network url you want use if you have, can be empty
    mint: 'https://xxx.com', // set mint url you want use, can be empty
  }
})
// or
let elevatrix = net Elevatrix({
  type: 'injected',
  oldProvider: ethersProvider,
})
````

2. you can mint when a button click

````javascript
function mintMethond() {
  elevatrix.mint({
    projectId: 'xxxx', // you can get this id in your elevatrix project and switch to sdk page.
    quantity: 1, // nft numbers you want to mint in, maybe a input value you get
    mintType: 1, // 1 mean normal mint, and 2 mean white list mint.
  })
}
````