# Using mainnet-js on web

## Installation

To install mainnet-js in your project targeting a browser-like context use:

    yarn add mainnet-js

The above command should install an ECMA script module for use in your project.

You can now import the Wallet class,

    import { Wallet } from "mainnet-js";

And create a new wallet like so:

    myWallet = await Wallet()



## General Notes

`mainnet-js` acts as high level wrapper for many bitcoin related toolsets. As such, the complete package with all functionality in one file would be quite large.

The core crypto library uses about one megabyte (1MB) unpacked. Mainnet-js core can also include an indexeddb database wrapper, networking for utilities, tools for bip39 mnemonic phrases, etc. 

## Recommended usage 

Without any special configuration, a single bundle shipped with the entire mainnet-js library (with addons) would not be practical for the web (+27 mb with SmartBCH). 

However, mainnet-js supports tree-shaking and code splitting, but this must be turned on in the bundle configuration of the webapp using it. 


See the [webpack](https://webpack.js.org/guides/tree-shaking/) or [rollup](https://rollupjs.org/guide/en/#tree-shaking) documentation regarding this.

Efficient caching, tree-shaking and code splitting, can help alleviate chunk sizes for users with limited connectivity.

## Note about using smartbch

Check the console of your application to assure that a insecure random source is not being used, if not in a browser. 

You may have to call ethers browser shims before loading `@mainnet-cash/smartbch` to shim objects not available in your environment.

```js
import "@ethersproject/shims"
```

Check the [ethers cookbook](https://docs.ethers.io/v5/cookbook/react-native/#cookbook-reactnative-shims) for more details.

## Configuring Webpack

Currently mainnet-js uses some packages that depend on node packages.  

The `bip39` package is used for mnemonic phrases. This package will likely be replaced in the future, but for now it requires browserified versions of the `stream` and `crypto` packages.

The contract package uses `cashscript` to transpile solidity style contracts, which depends on some node modules not available in the browser, but they may safely be ommited.

For networking, the package `electrum-cash` is configured to connect using websockets within mainnet-js. The code to connect using tcp is not available when using the package on the web.

Finally, solc compile is currently not available in the browser and there are a number of node related packages in ethers which may need to be shimmed.


Below is a sample webpack configuration, only the fallbacks for the library used need to be included.


```js

module.exports = {
    resolve:{
        fallback:{

            // mainnet-js
            "stream": require.resolve("stream-browserify"), // bip39
            "crypto": require.resolve('crypto-browserify'), // bip39
            "net":false, // electrum-cash tcp connections
            "tls":false, // electrum-cash tcp connections

            // @mainnet-cash/contract
            "fs":false,    // cashscript/utils
            "url":false,   // cashscript/bitcoind-rpc
            "https":false, // cashscript/bitcoind-rpc
            "http":false,  // cashscript/bitcoind-rpc

            // @mainnet-cash/smartbch
            "require-from-string":false,
            "module":false,
            "path":false,
            "child_process":false
        }
    }
}

```




### Example VueJs v3 Config 

A simple vue3 configuration that both transpiles `electrum-cash` and limits chunks to 230kb for the `mainnet-js` package alone is below.

This configuration should be used with babel enabled. 

```js
# vue.config.js
module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
              minSize: 50000,
              maxSize: 230000,
            }
          }
    },
    transpileDependencies: [
        'electrum-cash'
    ]
}
```