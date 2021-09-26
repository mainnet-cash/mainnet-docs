# SmartBch JavaScript

SmartBch wallets are designed after usual BCH mainnet.cash wallets to make it easy to reuse your developed code. Although SmartBch is based on Ethereum technology, we still use BCH (10 ** 18 SmartBch wei) and satoshi (10 ** 10 SmartBch wei) to denote the currency. We wrap the excellent [ethers-js](https://docs.ethers.io) library for network communication, but you can still use it directly.

This documentation thus is mostly a duplication of a [BCH](/tutorial/) mainnet.cash documentation.

## Introduction

Our Javascript library is designed so you can rapidly and easily provide secure financial services to your users using 
standard web development knowledge. You no longer have to be a blockchain wizard to give the powers of magic internet 
money to your customers.

With this library you will be able to create advanced, non-custodial, in-browser wallets.

<p style="font-size: 90%;">The mainnet library is currently in a <span style="background-color: #fffdbf; padding: 0 5px 0 5px;">beta stage</span>.
Things may change randomly. There is no backward compatibility guarantee yet,
even though we try not to break things too often.</p>

<!-- Your stack: Browser + IndexedDB PHP Other -->

## Let's get programming

Note that this tutorial mostly describes `Browser + IndexedDB` approach, which means that the wallets will be created
and persisted inside of a user browser. 

See [calling the REST API](/tutorial/rest.html) or [Other programming languages](/tutorial/other-languages.html) for other approaches.

### Getting the mainnet-cash SmartBCH package

To keep the size of the packages small, both the Ethereum style SmartBch functionality and CashScript solidity contracts have been broken out into separate add-on packages (@mainnet-cash/smartbch & @mainnet-cash/contract). 

#### Via npm / yarn

If you are developing in node or for a webapp, import or require from `@mainnet-cash/smartbch` after installing the separate package using:

```sh
npm install @mainnet-cash/smartbch
# or 
yarn add @mainnet-cash/smartbch

```

#### &lt;script> tag in HTML

To get started using Bitcoin Cash on your site, include this tag in your `<head>` section:

```html
<script src="https://cdn.mainnet.cash/smartbch/smartbch-0.4.17.js"
 integrity="sha384-aqOajJn/G4iZ0yiz8nqDQ0czAJBIGO7Neh6xUsSKLxhaUpDVI0bKXVR5B+dIKG+2"
 crossorigin="anonymous"></script>
```

<!--
you can generate the integrity sha like in the following example:
echo sha384-`curl https://cdn.mainnet.cash/smartbch/smartbch-0.4.17.js | openssl dgst -sha384 -binary | openssl base64 -A`
-->

Note that the `integrity` part guarantees that the script haven't been tampered with. So if a hacker replaces it,
the user's browser will not run the script. Or you can download the library and serve it locally.

Now, you can create a test wallet:

```js
const wallet = await TestNetSmartBchWallet.newRandom();
```

This wallet will not be persisted, if a user closes his browser, it's gone forever. See below for persistent wallets.

This creates a **TestNet** SmartBch wallet.

::: tip What is TestNet? Where to get TestNet money and a wallet?

`TestNet` is where you test your application. TestNet money has no price. Opposite of TestNet is `MainNet`, 
which is what people usually mean when they talk about SmartBch network. You can get free TestNet money ~~using 
the `getTestnetSatoshis()` call (see below) or~~ [here](http://34.92.246.27:8080/faucet/).

If you need a wallet that supports the TestNet install MetaMask browser extension and define a network with a following JSON-RPC endpoint https://moeing.tech:9545. See more [here](https://docs.smartbch.org/smartbch/testnets).

:::

To create a MainNet wallet (SmartBch production network):

```js
const wallet = await SmartBchWallet.newRandom();
```

If you want to create a wallet from a mnemonic seed phrase, use this call:

```js
const wallet = await SmartBchWallet.fromSeed('.....');
```

::: tip
Seed phrase wallets use the derivation path `m/44'/60'/0'/0/0` by default (standard for Ethereum networks).
:::

Optionally, a [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) derivation path may be added as a second argument.

```js
const wallet = await SmartBchWallet.fromSeed("horse duck stapler...", "m/44'/60'/145'/0/0");
```

If you want to create a wallet from a Private Key, use this call:

```js
const wallet = await Wallet.fromPrivateKey('0x.....');
```

::: danger Keep the private key and the seed phrase secret

Remember to keep the private key and/or the seed phrase (aka "mnemonic") secret as they allow spending money from this wallet.
You can access them using `wallet.privateKey` and `wallet.mnemonic` (you'll also need the derivation path from `wallet.derivationPath`)

:::

Available networks: 

- mainnet: `SmartBchWallet`
- Testnet: `TestNetSmartBchWallet`
- RegTest: `RegTestSmartBchWallet` ([see below](#regtest-wallets))

::: tip

~~You can see a working demo [here](https://jsfiddle.net/5oc2uw9a/) and a video of it [here](https://www.youtube.com/watch?v=6Z4ef2Isod4)~~

:::

## Web3 wallets

`Web3SmartBchWallet` class provides the means to interact with Web3 providers such as [Metamask browser extension](https://metamask.io). It abstracts away all the wallet storage, transaction signing, etc., from mainnet.cash to these provider extensions while allowing for high scriptability.

To instantiate a Web3 wallet use the following snippet:

```js
const wallet = await Web3SmartBchWallet.init();
```

it will activate Metamask and prompt you to connect to the website (if not done before). For any payable action (such as fund transferring, contract interaction) it will bring up the Metamask prompt for you to confirm the action.

## Named wallets (persistent)

Named wallets are used to save the private key generated by the browser, so that you
can run ```await SmartBchWallet.named(`user`)``` and always get the same wallet back.

Note that it's better to run something like ```await SmartBchWallet.named(`user:${id}`)```, i.e. use some ID of the user,
so that if the same browser has multiple users, they'll all get their own wallet. (Like, if a user has multiple accounts on your site)

To create a persistent wallet (saved to the IndexedDB of user's browser):

```js
const wallet = await TestNetSmartBchWallet.named('user:1234');
```

`user:1234` is an optional name for the wallet. The wallet is saved in user's browser for future re-use.

To check if a named wallet already exists in the storage, you can invoke:

```js
const walletExists = await TestNetSmartBchWallet.namedExists('user:1234');
```

Say a user of your application has wiped the website data and his IndexedDB is now empty. But they still has the seed and derivation path info. A named wallet can be replaced (recovered) with the existing `walletId`:

```js
const seed = "diary caution almost ...";
const derivationPath = "m/44'/0'/0'/0/0";
const walletId = `seed:testnet:${seed}:${derivationPath}`;
const wallet = await TestNetSmartBchWallet.replaceNamed('user:1234', walletId);
```

If the wallet entry does not exist in the DB, it will be created. If it does - it will be replaced without exception.

### Watch-only wallets

Watch-only wallets do not have private keys and unable to send funds, however they are very useful to keep track of adress' balances, subscribe to its incoming and outgoing transactions, etc.

They are constructed from an address as follows:

```js
const wallet = await TestNetSmartBchWallet.watchOnly("0xE25ddbAF8DD61b627727e03e190E32feddBD1319");
```

## Getting the balance

To get the balance of the wallet you can use `getBalance` method:

```js
await wallet.getBalance() // { bch: 0.20682058, sat: 20682058, usd: 91.04 }
```

If you want to receive balance as number denominated in a unit of your choice, you can call `getBalance` with an argument:

```js
await wallet.getBalance('usd') // 91.04
await wallet.getBalance('bch') // 0.20682058
await wallet.getBalance('sat') // 20682058
```

You can ask for `usd`, `sat`, `bch` (or `satoshi`, `satoshis`, `sats` - just in case you forget the exact name).

- 1 satoshi = 0.000 000 01 Bitcoin Cash
- 1 Bitcoin Cash = 100,000,000 satoshis

`usd` returns the amount at the current exchange rate, fetched from CoinGecko or Bitcoin.com.

## Sending money

Let's create another wallet and send some of our money there:

```js
const seller = await TestNetSmartBchWallet.named('seller');

const txData = await wallet.send([
  {
    cashaddr: seller.getDepositAddress(),
    value: 0.01,
    unit: 'usd',
  }
]);

// or alternatively
const txData = await wallet.send([[seller.getDepositAddress(), 0.01, 'usd']]);
```

... which returns an object containing the remaining balance and the transaction ID:

```js
[{
  txId: "2fc2...af",
  balance: {bch: 1.0, sat: 100000000, usd: 1000.00}
}]
```

Note that you can send to many addresses at once. This will generate as many transactions as you have send requests specified in the first argument.

#### Options

There is also an `options` parameter that specifies how money is spent.

* `queryBalance` is a boolean flag (defaulting to `true`) to include the wallet balance after the successful `send` operation to the returned result. If set to false, the balance will not be queried and returned, making the `send` call faster.
* `awaitTransactionPropagation` is a boolean flag (defaulting to `true`) to wait for transaction to propagate through the network and be registered in the bitcoind and indexer. If set to false, the `send` call will be very fast, but the wallet UTXO state might be invalid for some 500ms.

#### Overrides

There is also an `overrides` parameter that specifies how network goes about your transaction.

* `gasPrice` override the price of each gas unit consumed in the transaction.
* `gasLimit` is the limit of the gas amount you allow this transaction to consume.

The total network fee you must pay for the transaction to be processed by the network is gasAmount * gasPrice

#### Getting balance

Let's print the balance of the seller's wallet:

```js
console.log(await seller.getBalance('USD'));
// 0.01
```

Great! You've just made your first transaction!

Now you can send all of your money somewhere else:

```js
const txData = await seller.sendMax(wallet.getDepositAddress());
```

... which also supports `options` object and returns:

```js
{
  txId: "0x2fc2...af",
  balance: {bch: 0, sat: 0, usd: 0}
}
```

## Watching/Waiting methods

### QR codes

Let's say you want to display a QR code for you user to pay you money and show an alert when money arrives?

Let's display a QR code first. Create a placeholder first:

```html
<p style="text-align: center;">
    <img src="https://cdn.mainnet.cash/wait.svg" style="width: 15em;" id="deposit">
</p>
```

Then you can replace it with an actual QR code of the deposit address:

```js
document.querySelector('#deposit').src = wallet.getDepositQr().src;
```

### Watching/Waiting for transaction

You can watch for incoming wallet transaction with `watchAddress` and `watchAddressTransactions` methods with the difference that the former will monitor transaction hashes and the latter will receive the decoded transactions in verbose format as per [specification](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt). Both methods return an async function which when evaluated will cancel watching.

```js
wallet.watchAddress((txHash) => {
  console.log(txHash);
});

const cancelWatch = wallet.watchAddressTransactions((tx) => {
  if (tx.transactionHash === someHash) {
    await cancelWatch();
  }
});
```

You can also wait for a wallet transaction and halt the program execution until it arrives.

```js
const options = {
  confirmations: 1,
  getTransactionInfo: true,
  getBalance: false,
  txHash: undefined
}
const response = await wallet.waitForTransaction(options);
```

If `txHash` is supplied method will wait for a transaction with this exact hash to be propagated through and registered in the network by the indexer, otherwise any address transaction will trigger a response.

Response: Object `{transactionInfo: ethers.providers.TransactionReceipt, balance: BalanceResponse}` depending on the options supplied.

`transactionInfo` Raw transaction in verbose format as per [specification](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)

`balance`: balance response object as per `getBalance` request.

`confirmations`: is amount of confirmations of the transaction. Defaults to 1.

If you are willing to ~~spy on~~ monitor transactions of an address you do not own, you can create a [watchOnly wallet](#watch-only-wallets). -->

### Watching/Waiting for balance

You can watch for wallet balance changes with `watchBalance` method (which also returns a cancellation function). The balance object sent to the callback has the same type as returned from `getBalance` method.

```js
const cancelWatch = wallet.watchBalance((balance) => {
  console.log(balance);
  await cancelWatch();
});
```

You can watch for wallet balance changes which are also sensitive to BCH/USD rate changes. The callback will be fired even if there are no actual transactions happening. You can change the polling interval by setting `usdPriceRefreshInterval` parameter, which defaults to 30000 milliseconds.

```js
const cancelWatch = wallet.watchBalanceUsd((balance) => {
  console.log(balance);
  await cancelWatch();
}, 5000);
```


You can wait for a certain minimal balance on the wallet using the `waitForBalance` function.

```js
const balance = await wallet.waitForBalance(1.0, 'usd');
```

The `balance` variable contains the actual balance of the wallet.

### Watching/Waiting for block

You can watch for incoming blocks with `watchBlocks` method:

```js
const cancelWatch = wallet.watchBlocks((block) => {
  console.log(block);
  await cancelWatch();
});
```

If you want to wait for the next block or wait for blockhain to reach certain block height you can use the following method of the wallet's network provider:

```js
const nextBlockInfo = await wallet.provider.waitForBlock();

const futureBlockInfo = await wallet.provider.waitForBlock(770000);
```

Refer to the [response object's schema](https://docs.ethers.io/v5/api/providers/types/#providers-Block).

## SEP20 (ERC20) token protocol

We currently fully support the SEP20 tokens [specification](https://docs.smartbch.org/smartbch/smartbch-evolution-proposals-seps/sep-20)

The interfaces were designed to be largely similar to those of BCH wallets and SLP protocol.

The SEP20 functions are then available via Wallet.sep20 accessor:

```js
const address = wallet.sep20.getDepositAddress();

const qrCode = wallet.sep20.getDepositQr();
```

Note, that working with SEP20 tokens requires a certain amount of BCH available in your wallet so that you can pay miners for the token transactions.

### Token creation - Genesis

To create your own token you should prepare and broadcast a special genesis transaction containing all the information about the token being created: token name, ticker, decimals - number of significant digits after comma, initial token amount. Some of these properties are optional.

With the `endBaton` parameter you can decide to keep the possibility of additional token creation, which is governed by so called minting baton or immediately discard this baton to make the token circulation amount to be fixed.

Note, that there might be many tokens with the same name. Remember, that only 42 character long string-ids do identify your token uniquely und unambiguously.

In the following example 10000.00 MNC tokens will be created.

```js
const genesisOptions = {
  name: "Mainnet coin",
  ticker: "MNC",
  decimals: 2,
  initialAmount: 10000,
  endBaton: false
};
const {tokenId} =  await wallet.sep20.genesis(genesisOptions)
```

Optional `tokenReceiverAddress` and `batonReceiverAddress` allow to specify the receiver of tokens and minting baton.

### Looking up token information

If you want to get the genesis information of some token, you can simply call getTokenInfo:

```js
const info = await wallet.slp.getTokenInfo(tokenId);
```

### Additional token creation - Minting

If you decide to increase the token circulation supply, you would need to `mint` more tokens. You are required to have the ownership of the minting baton to do so.

In the following example we issue 50 more tokens we just created in genesis:

```js
const mintOptions = {
  value: "50",
  tokenId: tokenId,
  tokenReceiverAddress: "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
}

const {txId, balance} = await wallet.slp.mint(mintOptions);
```

Optional `tokenReceiverAddress` allow to specify the receiver of tokens.

### Sending tokens

Sending tokens around is easy and is very similar to sending BCH. You can include many send requests in one call too!

```js
const {txId, balance} = await wallet.sep20.send([
  {
    address: bobWallet.sep20.getDepositAddress(),
    value: 5,
    tokenId: tokenId
  }
]);
```

Or you can send all tokens available with a simple sendMax method

```js
const result = await wallet.sep20.sendMax(otherWallet.sep20.getDepositAddress(), tokenId);
```

### Token balances

You can get token balance of a specific token with the following methods:

```js
const tokenBalance = wallet.sep20.getBalance(tokenId);
```

### Watching/waiting for transactions

Coming soon.

<!--

You can set up a hook to monitor SLP transactions with the following:

```js
const cancelFn = wallet.slp.watchTransactions((tx) => {
  ...
}, tokenId);
```

Leave out the tokenId to monitor all token transactions.

Call the `cancelFn()` to unsubscribe from receiving callback calls.

If you want just to wait for the next transaction you can use the following call:

```js
const tx = await wallet.slp.waitForTransaction(tokenId);
```

This will halt the program execution until the transaction arrives. -->

<!-- ### Watching/waiting for balance

Similarly a to transaction watching/waiting we provide the convenient methods to watch/wait for balance.

```js
const cancelFn = wallet.slp.watchBalance((balance) => {
  ...
}, tokenId);
```

You can wait for the SLP wallet to reach a certain minimal token balance:

```js
const actualBalance = await wallet.slp.waitForBalance(10, tokenId);
```

This will halt the program execution until the balance reaches the target value. -->

### Non-fungible tokens (NFT) 

Coming soon.

<!--

NFT1 is a simple extension to the SLP token type 1 protocol which allows many NFT tokens to be grouped together using a single ID. Having the ability to group NFTs in a provable manner opens the doors for many more token applications, and makes SLP more similar to other NFT protocols (e.g., ERC-721). NFT1 uses the same validation rules as SLP token type 1 with a few additional constraints. [See reference](https://slp.dev/specs/slp-nft-1/#simple-nft-vs-nft1-protocol). Non-fungible tokens can be produced by simply minting a non-divisible token supply of 1 without a minting baton.

All operations apart from genesis and minting, which are used for SLP tokens Type1, support the NFT tokens and are used the same way with same interfaces.

#### NFT Parent Genesis

To create the NFT parent group use the following code snippet

```js
const genesisOptions = {
  name: "Mainnet NFT Parent",
  ticker: "MNC_NFTP",
  decimals: 0,
  initialAmount: 10000,
  documentUrl: "https://mainnet.cash",
  endBaton: false
};
const genesisResult =  await wallet.slp.nftParentGenesis(genesisOptions);
const parentTokenId = genesisResult.tokenId;
```

Note: these tokens are transferrable and mintable. Decimal places of 0 is advised.

#### NFT Child Genesis

NFT child tokens are unique and one of a kind. To create an NFT child token use the following code snippet

```js
const genesisOptions = {
  name: "Mainnet NFT Child",
  ticker: "MNC_NFTC",
  decimals: 0,
  initialAmount: 1,
  documentUrl: "https://mainnet.cash",
  endBaton: true,
  parentTokenId: parentTokenId
};
const {tokenId} =  await wallet.slp.nftChildGenesis(genesisOptions);
```

In the process of the child genesis, a parent token of quantity 1 will be spent, so ensure you possess some. If you have more than 1 (n), the tokens will be split into (n-1) and 1.

Note: these tokens are transferrable but not mintable. Regardless of options supplied, the following options will be overridden: `endBaton` will be set to `true`, `initialAmount: 1`, `decimals: 0`. Otherwise they will be considered as invalid by the SLP validators.

#### List of your NFTs

See [Token Balances](#token-balances)

### Configuring SLP provider and endpoints

You can switch between the default SLPDB and experimental Graph Search++ SLP providers by changing the static property `Wallet.slp.defaultProvider`. Valid values are `slpdb` and `gspp`. All other values will be not recognized and will default to SLPDB provider. The changes to this property will take effect globally next time you create a new wallet. If you want to change the provider for a single wallet only, you can do `wallet.slp.setProvider(...)`.

You can change SLP provider data source and event source endpoints by changing static properties `SlpDbProvider.defaultServers` and `GsppProvider.defaultServers`. The changes will take effect globally next time you create a new wallet. If you want to change the endpoints for a single wallet only, you can do `wallet.slp.provider.servers = ...`.
-->
## TestNet faucet

Coming soon.

<!--

You can have some TestNet satoshi or SLP tokens for your convenience. Visit our ~~faucet~~ refilling station at [https://rest-unstable.mainnet.cash/faucet.html](https://rest-unstable.mainnet.cash/faucet.html)

Your address will be refilled up to 10000 TestNet satoshi or up to 10 SLP tokens upon a call. There are request rate limiters set up to prevent abuse.

We've integrated the faucet into the library so that you can do easy calls like the following:

```js
const txid = await wallet.getTestnetSatoshis();
...
const sendResponse = await wallet.returnTestnetSatoshis();
```

Same for SLP:

```js
const txid = await wallet.getTestnetSlp(tokenId);
...
const slpSendResponse = await wallet.returnTestnetSlp(tokenId);
``` -->

## Smart Contracts

`Contracts` are objects that allow one to interact with Smart Contracts already deployed on SmartBch network or to deploy new ones.

Note, that unlike the BCH contracts, SmartBch contract do not use nonce.

We allow to deploy [solidity](http://solidity.readthedocs.io) based contracts. (Browser environment to be supported yet). Example SEP20 contract:

```js
const script = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/SEP20/SEP20.sol";

contract MyToken is SEP20 {
  constructor(string memory name, string memory symbol) SEP20(name, symbol) {}
}`
```

### Creating a contract instance

To interact with already deployed contracts you need the contract address and its ABI (Application Binary Interface).

```js
// deployed contract address
const address = "0xdac17f958d2ee523a2206206994597c13d831ec7";

// ABI describing a subset of contract function we are interested in
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
];

const contract = new Contract(address, abi, Network.REGTEST);
```

This contract will be able to invoke non state-changing functions only. To be able to invoke payable state-changing functions, you would need to bind to a `signer` - a `SmartBchWallet` instance:

```js
const wallet = await SmartBchWallet.fromPrivateKey(
  "0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"
);

contract.setSigner(wallet);
```

### Contract deployment

To deploy your own contract you would need a signer ()

```js
const contract = await Contract.deploy(
  wallet,
  script,
  "Mainnet Coin",
  "MNC",
  {
    gasPrice: 10 ** 10,
  }
);
```

The above snippet deploys an SEP20 contract with constructor parameters `name`: `"Mainnet Coin"` and `symbol`: `MNC`. Note, that they are passed as function parameters.
Note the last function parameter object. It is the optional `overrides` object to steer the network interaction.

This will give you a contract object that can be serialized and deserialized just like a wallet:

```js
// serialized to a string
let contractStr = contract.toString();
//smartbchcontract:regtest:0xdac...SJd::W10=

// recreate the Contract object from a string
let contractCopy = Contract.fromId(contractStr)
```

The deposit address is available with the same interface as a wallet.

```js
contract.getDepositAddress()
//"0xdac17f958d2ee523a2206206994597c13d831ec7"
```

Contract interactions can be of two types: state-changing and non state-changing. The former requires gas to be spent the latter does not. To estimate the gas needed you can use the `estimateGas` method for this (note that you need to pass all the function call arguments and optional `overrides`):

```js
const constGas = await contract.estimateGas("decimals");
// constGas = 0

const stateChangeGas = await contract.estimateGas("transfer", to, value, overrides);
// stateChangeGas > 0
```

Invoking the contract functions is easy, there are two interfaces available:

```js
const result = contract.getContractFunction("transfer")(to, value, overrides);

// or

const result = contract.transfer(to, value, overrides)
```

In the case that a contractId is stored, or received from another party, a convenience method exists to list information contained in a contractId, the `info()` interface is available to return the parsed data.

The return should be an object with the same contractId, deposit cashaddr, script source (if deployed from mainnet.cash), constructor parameters (if deployed from mainnet.cash).

```js
contract.info()
// {
//   contractId: 'smartbchcontract:regtest:0xdac17f958d2ee523a2206206994597c13d831ec7:WyJmdW5jdGlvbiBuYW1lKCkgdmlldyByZXR1cm5zIChzdHJpbmcpIiwiZnVuY3Rpb24gc3ltYm9sKCkgdmlldyByZXR1cm5zIChzdHJpbmcpIl0=::W10=',
//   address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//   abi: [
//     'function name() view returns (string)',
//     'function symbol() view returns (string)'
//   ],
//   script: '',
//   parameters: []
// }
```

## Utilities

### Currency conversions

Need to find out how many BCH are there currently in 1 USD, or find out how many satoshis are there in 100 USD? Easy!

```js
await convert(100, "usd", "sat")
// 28067024
```

## Signed Messages

One of the perks of having a wallet is the ability to sign message text or verify the signatures of other parties using their public key.

Full-nodes and SPV wallets often include this feature as standard. 

### Signing a message with a wallet

Let's try signing with an example from a common test case:

```js
message = "Chancellor on brink of second bailout for banks"
francisWallet = await SmartBchWallet.fromPrivateKey(
      "0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"
    );

francisWallet.address
// "0xE25ddbAF8DD61b627727e03e190E32feddBD1319"

signature = (await francisWallet.sign(message)).signature;
// 0x60dc03b4f31f174f9c0577ea8140b6b13e57a0141fc27238a0c53971066fcb02511bc4aacbc8728c7f5c6cd3a9854960975968601c8381ee483580d1d57c1bd21c
```

### Verifying a message with a wallet

To verify the above signature (without having access to the private key), by using a `watchOnly` wallet to represent the party in the example above.

```js

francisPublic = await SmartBchWallet.watchOnly("0xE25ddbAF8DD61b627727e03e190E32feddBD1319")

verifyResult = await francisPublic.verify(message, sig);
```

where `verifyResult` is

```json
{
  "valid": true,
}
```

## RegTest wallets

See [reference](/tutorial/#regtest-wallets)

## WebSockets

Not supported yet.
