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

Without any special configuration, a single bundle shipped with the entire mainnet-js library (with addons) would not be practical for the web.

However, mainnet-js supports tree-shaking and code splitting, but this must be turned on in the bundle configuration of the webapp using it.


See the [webpack](https://webpack.js.org/guides/tree-shaking/) or [rollup](https://rollupjs.org/guide/en/#tree-shaking) documentation regarding this.

Efficient caching, tree-shaking and code splitting, can help alleviate chunk sizes for users with limited connectivity.

## Configuring Webpack

Currently mainnet-js uses some packages that depend on node packages.  

The `bip39` package is used for mnemonic phrases. This package will likely be replaced in the future, but for now it requires browserified versions of the `stream` and `crypto` packages.

The contract package uses `cashscript` to transpile solidity style contracts, which depends on some node modules not available in the browser, but they may safely be ommited.

For networking, the package `electrum-cash` is configured to connect using websockets within mainnet-js. The code to connect using tcp is not available when using the package on the web.

Finally, solc compile is currently not available in the browser and there are a number of node related packages in ethers which may need to be shimmed.


Below is a sample webpack configuration, only the fallbacks for the library used need to be included. See full webpack config at: [https://github.com/mainnet-cash/mainnet-js/blob/master/packages/mainnet-js/webpack.config.cjs](https://github.com/mainnet-cash/mainnet-js/blob/master/packages/mainnet-js/webpack.config.cjs)


```js

module.exports = {
    resolve:{
        alias:{

            // mainnet-js
            "child_process": false,

            // @mainnet-cash/contract
            "fs": false,  // cashscript/utils
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