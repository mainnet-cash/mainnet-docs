# Using mainnet-js on web

## Installation

To install mainnet-js in your project targeting a browser-like context use:

    yarn add mainnet-js

This should install an ECMA script module for use in your project.

You can now import the Wallet class,

    import { Wallet } from "mainnet-js";

And create a new wallet like so:

    myWallet = await Wallet()

Or use any code 

## General Notes

`mainnet-js` acts as high level wrapper for many bitcoin related toolsets. As such, the complete package with all functionality in one file would be quite large.

The core crypto library (libauth) uses about one megabyte (1MB) unpacked. Mainet-js also usually includes an indexeddb database wrapper, networking for utilities, tools for bip39 mnemonic phrases, etc. 

## `electron-cash` configuration

At the moment `electron-cash` uses `net` and `tls` for tcp connections. Which don't exist in browser-like contexts. 

So in your app, you must either exclude them as dependencies and use websockets, or transpile `electron-cash` before using it.

## Recommended usage

Without any special configuration, a single bundle shipped with the entire mainnet-js library would not be practical for the web (+30mb). 

However, mainnet-js supports tree-shaking and code splitting, but this must be turned on in the bundle configuration of the webapp using it. 

### Example VueJs v3 Config 

A simple vue3 configuration that both transpiles `electrum-cash` and limits chunks to 230kb is below.

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