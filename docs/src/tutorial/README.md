# JavaScript (client wallets)

## Introduction

Our Javascript library is designed so you can rapidly and easily provide secure financial services to your users using 
standard web development knowledge. You no longer have to be a blockchain wizard to give the powers of magic internet 
money to your customers.

With this library you will be able to create advanced, non-custodial, in-browser wallets.

## Version 3.0.0 Breaking Changes

Version 3.0.0 introduces several breaking changes:

### Satoshi values are now bigint
All balance and amount values are now `bigint` instead of `number`. Use the new conversion utilities:

```js
import { toBch, toSat, toCurrency, convert } from 'mainnet-js';

const balance = await wallet.getBalance();  // Returns bigint (satoshis)
const balanceBch = toBch(balance);          // Convert to BCH (number)
const balanceUsd = await toCurrency(balance, 'usd');  // Convert to fiat

// Convert BCH to satoshis for sending
const sendAmount = toSat(0.001);  // Returns 100000n
```

### Unit parameters removed
Methods no longer accept unit parameters. All amounts must be in satoshis (bigint):

```js
// OLD (v2.x) - no longer works
await wallet.send([{ cashaddr: addr, value: 1, unit: 'usd' }]);

// NEW (v3.0.0)
const sats = BigInt(Math.round(await convert(1, 'usd', 'sat')));
await wallet.send([{ cashaddr: addr, value: sats }]);
```

### CashTokens interface changes
Token interfaces were updated for compatibility with BCHN, CashScript, and libauth:

- `tokenId` → `category`
- Top-level `capability`, `commitment` → nested `nft: { capability, commitment }`

```js
// OLD (v2.x) - no longer works
await wallet.tokenGenesis({
  amount: 100n,
  capability: NFTCapability.minting,
  commitment: "abcd",
});

// NEW (v3.0.0)
await wallet.tokenGenesis({
  amount: 100n,
  nft: {
    capability: NFTCapability.minting,
    commitment: "abcd",
  },
});
```

### Removed methods
- `watchBalanceUsd` - Use `watchBalance` with manual currency conversion
- `getAddressUtxos` - Use `wallet.provider.getUtxos(address)` instead
- `contracts` sub-package removed

<!-- Your stack: Browser + IndexedDB PHP Other -->

## Let's get programming

Note that this tutorial mostly describes `Browser + IndexedDB` approach, which means that the wallets will be created
and persisted inside of a user browser. 

See [calling the REST API](/tutorial/rest.html) or [Other programming languages](/tutorial/other-languages.html) for other approaches.

### node.js / webpack

Install using:

```sh
npm install mainnet-js
```

::: tip

If you are bundling a production webapp, see [detailed notes](./shipping-mainnet.md) on using mainnet-js in a webapp. 

:::

### &lt;script> tag in HTML

To get started using Bitcoin Cash on your site, include these tags in your `<head>` and `<body>` sections:

```html
<head>
  <script src="https://cdn.mainnet.cash/mainnet-.js"
   integrity="sha384-TOeR2FMTFIKYqR6c1wu797r1vb4NHOaALnANwn2sVxjjyOT3G9k51vz1v2NcCckk"
   crossorigin="anonymous"></script>
</head>
<body>
  <script>
    document.addEventListener("DOMContentLoaded", async (event) => {
      globalThis.exports = globalThis.exports || {};
      Object.assign(globalThis, await __mainnetPromise);

      // your code
    });
  </script>
</body>
```

<!--
you can generate the integrity sha like in the following example:
echo sha384-`curl https://cdn.mainnet.cash/mainnet-.js | openssl dgst -sha384 -binary | openssl base64 -A`
-->

Note that the `integrity` part guarantees that the script haven't been tampered with. So if a hacker replaces it,
the user's browser will not run the script. Or you can download the library and serve it locally.

Now, you can create a test wallet:

```js
const wallet = await TestNetWallet.newRandom();
```

This wallet will not be persisted, if a user closes his browser, it's gone forever. See below for persistent wallets.

This creates a **TestNet** wallet.

::: tip What is TestNet? Where to get TestNet money and a wallet?

`TestNet` is where you test your application. TestNet money has no price. Opposite of TestNet is `MainNet`, 
which is what people usually mean when they talk about Bitcoin Cash network.  You can get free TestNet money using 
the `getTestnetSatoshis()` call (see below) or [here](https://faucet.fullstack.cash/).

If you need a wallet that supports the TestNet, download [Electron Cash](https://electroncash.org/) and
run it using `electron-cash --testnet` flag. For example, on MacOS that would be:

`/Applications/Electron-Cash.app/Contents/MacOS/Electron-Cash --testnet`

:::

To create a MainNet wallet (Bitcoin Cash production network):

```js
const wallet = await Wallet.newRandom();
```

If you want to create a wallet from a mnemonic seed phrase, use this call:

```js
const wallet = await Wallet.fromSeed('.....');
```

::: tip
Seed phrase wallets use the derivation path `m/44'/0'/0'/0/0` by default (Bitcoin.com wallet compatibility)
:::

Optionally, a [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) derivation path may be added as a second argument.

```js
const wallet = await Wallet.fromSeed("horse duck stapler...", "m/44'/1'/145'/0/0");
```

If you want to create a wallet from a WIF (private key), use this call:

```js
const wallet = await Wallet.fromWIF('.....');
```

::: danger Keep the private key and the seed phrase secret

Remember to keep the private key (in "WIF" form) and/or the seed phrase (aka "mnemonic") secret as they allow spending money from this wallet.
You can access them using `wallet.privateKeyWif` and `wallet.mnemonic` (you'll also need the derivation path from `wallet.derivationPath`)

:::

Available networks: 

- mainnet: `Wallet`
- Testnet: `TestNetWallet`
- RegTest: `RegTestWallet` ([see below](#regtest-wallets))

::: tip

You can see a working demo [here](https://jsfiddle.net/5oc2uw9a/) and a video of it [here](https://www.youtube.com/watch?v=6Z4ef2Isod4)

:::

## Named wallets (persistent)

::: warning Named wallet support became a plugin since v2.1.0

See the [note](#basewallet-storageprovider) below regarding migration.

:::

Named wallets are used to save the private key generated by the browser, so that you
can run ```await Wallet.named(`user`)``` and always get the same wallet back.

Note that it's better to run something like ```await Wallet.named(`user:${id}`)```, i.e. use some ID of the user,
so that if the same browser has multiple users, they'll all get their own wallet. (Like, if a user has multiple accounts on your site)

To create a persistent wallet (saved to the IndexedDB of user's browser):

```js
const wallet = await TestNetWallet.named('user:1234');
```

`user:1234` is an optional name for the wallet. The wallet is saved in user's browser for future re-use.

To check if a named wallet already exists in the storage, you can invoke:

```js
const walletExists = await TestNetWallet.namedExists('user:1234');
```

Say a user of your application has wiped the website data and his IndexedDB is now empty. But they still has the seed and derivation path info. A named wallet can be replaced (recovered) with the existing `walletId`:

```js
const seed = "diary caution almost ...";
const derivationPath = "m/44'/0'/0'/0/0";
const walletId = `seed:testnet:${seed}:${derivationPath}`;
const wallet = await TestNetWallet.replaceNamed('user:1234', walletId);
```

If the wallet entry does not exist in the DB, it will be created. If it does - it will be replaced without exception.

### BaseWallet.StorageProvider

Since mainnet.cash v2.1.0 the wallet's storage providers became a plugin and were split out of the core package into separate packages. This was an action to assess the size of the core package as well reduce the amount of platform-specific dependencies. This means that all `named` functions will throw errors unless you import `mainnet-cash/indexed-storage` or `mainnet-cash/postgresql-storage` packages and configure your code with the following statements at the most top code of your app:

In browsers:
```js
<head>
  <script src="https://cdn.mainnet.cash/indexeddb-storage/indexeddb-storage-.js"
   integrity="sha384-Xd0tbDqx9xZwSoaAj9/YPO4/wKyIQRxCn2mdZN8qiEfXsIBXvsCpX/6bPUizJg/x"
   crossorigin="anonymous"></script>
</head>

...

BaseWallet.StorageProvider = IndexedDBProvider;
```

In node.js:

```ts
import { BaseWallet } from 'mainnet-js';
import { SqlProvider } from '@mainnet-cash/postgresql-storage';

BaseWallet.StorageProvider = SqlProvider;
```

### Watch-only wallets

Watch-only wallets do not have private keys and unable to send funds, however they are very useful to keep track of address' balances, subscribe to its incoming and outgoing transactions, etc.

They are constructed from a cashaddress as follows:

```js
const wallet = await TestNetWallet.watchOnly('bchtest:qq1234567...');
```

## HD Wallets

::: tip New in v3.0.0
HD Wallets provide hierarchical deterministic key derivation with automatic address management.
:::

HD Wallets automatically manage multiple addresses for deposits and change, following BIP44 standard. They support gap limit scanning, history tracking, and can be created from mnemonic seeds or extended keys.

### Creating HD Wallets

```js
import { HDWallet, TestNetHDWallet, RegTestHDWallet } from 'mainnet-js';

// Create a new random HD wallet
const wallet = await HDWallet.newRandom();
console.log(wallet.mnemonic);  // 12-word seed phrase

// Create from existing seed phrase
const wallet2 = await HDWallet.fromSeed(
  "divide battle bulb improve hockey favorite charge save merit fatal frog cage"
);

// Create from extended private key
const wallet3 = await HDWallet.fromXPriv("xprv...");

// Create watch-only from extended public key
const watchOnly = await HDWallet.fromXPub("xpub...");
```

### HD Wallet Addresses

HD Wallets automatically derive and manage addresses:

```js
// Get next available deposit address (auto-increments)
const depositAddr = wallet.getDepositAddress();

// Get specific address by index
const addr0 = wallet.getDepositAddress(0);
const addr5 = wallet.getDepositAddress(5);

// Token-aware addresses for CashTokens
const tokenAddr = wallet.getTokenDepositAddress();

// Change addresses (used internally for transaction change)
const changeAddr = wallet.getChangeAddress();
```

### HD Wallet Balance and Sending

HD Wallets aggregate balance across all derived addresses:

```js
// Get total balance across all addresses
const balance = await wallet.getBalance();  // bigint in satoshis

// Send funds (change goes to auto-derived change address)
await wallet.send([{
  cashaddr: recipient,
  value: 50000n,
}]);

// Check indices after activity
console.log(wallet.depositIndex);  // Next unused deposit address index
console.log(wallet.changeIndex);   // Next unused change address index
```

### HD Wallet History

Query transaction history across all wallet addresses:

```js
// Get formatted transaction history
const history = await wallet.getHistory({
  fromHeight: 0,      // Start block height (0 = genesis)
  toHeight: -1,       // End block height (-1 = include mempool)
  start: 0,           // Pagination offset
  count: 20,          // Number of transactions
});

history.forEach(item => {
  console.log(`${item.hash}: ${item.valueChange} sat`);
  console.log(`Balance after: ${item.balance}`);
});

// Get raw transaction history
const rawHistory = await wallet.getRawHistory();
```

### HD Wallet Watching

Watch for activity across all wallet addresses:

```js
// Watch for any address status change
const cancel = await wallet.watchStatus((status, address) => {
  console.log(`${address} changed: ${status}`);
});

// Watch balance changes
const cancelBalance = await wallet.watchBalance((balance) => {
  console.log(`New balance: ${balance} satoshis`);
});

// Wait for specific balance
await wallet.waitForBalance(100000n);

// Watch for transactions
const cancelTx = await wallet.watchTransactions((tx) => {
  console.log(`New tx: ${tx.txid}`);
});

// Stop all watching
await wallet.stop();
```

### HD Wallet Serialization

```js
// Serialize wallet for storage
const walletId = wallet.toString();
// "hd:mainnet:seed phrase here:m/44'/0'/0':0:0"

// Restore from serialized form
const restored = await HDWallet.fromId(walletId);
```

### Extended Address Scanning

By default, HD wallets scan 20 addresses ahead (gap limit). To scan further:

```js
// Scan 30 more addresses beyond current gap
await wallet.scanMoreAddresses(30);
```

## Getting the balance

To get the balance of the wallet you can use `getBalance` method:

```js
const balance = await wallet.getBalance();  // Returns bigint in satoshis, e.g. 20682058n
```

Use conversion utilities to display in different units:

```js
import { toBch, toCurrency } from 'mainnet-js';

const balance = await wallet.getBalance();  // 20682058n (satoshis)
const balanceBch = toBch(balance);          // 0.20682058 (number)
const balanceUsd = await toCurrency(balance, 'usd');  // ~91.04 (number)
```

- 1 satoshi = 0.000 000 01 Bitcoin Cash
- 1 Bitcoin Cash = 100,000,000 satoshis

Exchange rates are fetched from Bitcoin.com or bitpay.com. You can decide to use your own exchange rate getter by setting

```ts
Config.GetExchangeRateFn = (symbol: string): Promise<number> {
  ...
}
```

## Sending money

Let's create another wallet and send some of our money there:

```js
import { toSat, convert } from 'mainnet-js';

const seller = await TestNetWallet.named('seller');

// Send a specific amount in satoshis
const txData = await wallet.send([
  {
    cashaddr: seller.getDepositAddress(),
    value: 10000n,  // 10,000 satoshis
  }
]);

// Or convert from USD first
const usdInSats = BigInt(Math.round(await convert(0.01, 'usd', 'sat')));
const txData2 = await wallet.send([
  {
    cashaddr: seller.getDepositAddress(),
    value: usdInSats,
  }
]);

// Or use toSat for BCH amounts
const txData3 = await wallet.send([
  {
    cashaddr: seller.getDepositAddress(),
    value: toSat(0.0001),  // 0.0001 BCH = 10000n satoshis
  }
]);
```

... which returns an object containing the remaining balance and the transaction ID:

```js
{
  txId: "2fc2...af",
  balance: 99990000n  // Balance in satoshis (bigint)
}
```


Note that you can send to many addresses at once.

If your address holds <span style="background-color: #fffdbf; padding: 0 5px 0 5px;">SLP tokens</span>,
you have to use the `wallet.slpSemiAware().send([...])` method to prevent accidental token burning.
It skips all UTXOs with 546 sats when counting balance and sending funds.

#### Options

There is also an `options` parameter that specifies how money is spent.

* `utxoIds` holds an array of strings and controls which UTXOs can be spent in this operation. Format is `["txid:vout",...]` , e.g., `["1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0"]`
* `slpSemiAware` is a boolean flag (defaulting to `false`) which requires an UTXO to have more than 546 sats to be spendable and counted in the balance. It protects you from spending SLP-like UTXOs without using an external SLP indexer.
* `changeAddress` cash address to receive change to
* `queryBalance` is a boolean flag (defaulting to `true`) to include the wallet balance after the successful `send` operation to the returned result. If set to false, the balance will not be queried and returned, making the `send` call faster.
* `awaitTransactionPropagation` is a boolean flag (defaulting to `true`) to wait for transaction to propagate through the network and be registered in the bitcoind and indexer. If set to false, the `send` call will be very fast, but the wallet UTXO state might be invalid for some 500ms.
* `feePaidBy` Fee allocation strategy. Convenience option to subtract fees from outputs if change is not sufficient to cover transaction costs. Options are as follows:

  - `change` - pay the fees from change or error
  - `firstOutput` - pay the fee from the first output or error
  - `lastOutput` - pay the fee from the last output or error
  - `anyOutput` - pay the fee from dust outputs or divide across all remaining non-dust outputs.
  - `changeThenFirst` - Use change then first output or error.
  - `changeThenLast` - Use change then last output or error.
  - `changeThenAny` - Use change then any output strategy or error. 

#### Building transactions

An advanced way to send funds around is to build the transaction manually. To do so we expose the `encodeTransaction` method which has the same call signature as `send` method. It hides all the weightlifting from the user: UTXO selection, fee calculation, signing, etc. and produces the binary transaction data ready to be broadcasted to the network with the `submitTransaction` method:

```js
const encodedTransaction = await wallet.encodeTransaction(
  requests, // send requests as in `send` method
  false, // discard change
  options // options as described above
);

const txId = await wallet.submitTransaction(
  encodedTransaction,
  awaitTransactionPropagation // as in options.awaitTransactionPropagation
);
```

#### Getting balance

Let's print the balance of the seller's wallet:

```js
import { toCurrency } from 'mainnet-js';

const balance = await seller.getBalance();  // bigint in satoshis
console.log(await toCurrency(balance, 'usd'));
// ~0.01
```

Great! You've just made your first transaction!

Now you can send all of your money somewhere else:

```js
const txData = await seller.sendMax(wallet.getDepositAddress());
```

... which also supports `options` object and returns:

```js
{
  txId: "2fc2...af",
  balance: 0n  // Balance in satoshis (bigint)
}
```

If you want to know the maximum amount of available funds to send, e.g. your balance minus the network fees, you can use:
```js
const sendRequestOptions = { slpSemiAware: true, utxoIds: [] };
const options = { outputCount: 1, options: sendRequestOptions };
const maxAmount = await wallet.getMaxAmountToSend(options);
```

This method returns a balance response object. The `options` object allows for fine-grained fee calculation based on the output count, slp awareness and specific UTXOs you are willing to spend. By default the method will target to spend all UTXOs into one output.

## Watching/Waiting methods

### QR codes

As of mainnet-js version 2.7.0 the built-in support for QR Code rendering was removed. Users are advised to chose the library they like most.

We put here a code snippet which uses the formerly supported `qrcode-svg` package to produce the code.

```typescript
import QRCode from "qrcode-svg";

/**
 * qrAddress returns a qr code for a given cashaddress as raw utf-8 svg
 * @param  {string} address
 * @param  {} size=256 The width and height of the returned image
 * @returns Image
 */
export function qrAddress(address: string, size = 256) {
  const svg = new QRCode({
    content: address,
    width: size,
    height: size,
  }).svg();

  const svgB64 = btoa(svg);
  return {
    src: `data:image/svg+xml;base64,${svgB64}`,
    title: address,
    alt: "a Bitcoin Cash address QR Code",
  };
}
```

Then:

Let's say you want to display a QR code for you user to pay you money and show an alert when money arrives?

Let's display a QR code first. Create a placeholder first:

```html
<p style="text-align: center;">
  <img src="https://cdn.mainnet.cash/wait.svg" style="width: 15em;" id="deposit">
</p>
```

Then you can replace it with an actual QR code of the deposit address:

```js
document.querySelector('#deposit').src = qrAddress(wallet.getDepositAddress()).src;
```

### Watching/Waiting for transaction

You can watch for incoming wallet transaction with `watchAddress` and `watchAddressTransactions` methods with the difference that the former will monitor transaction hashes and the latter will receive the decoded transactions in verbose format as per [specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-transaction-get). Both methods return an async function which when evaluated will cancel watching.

```js
await wallet.watchAddress((txHash) => {
  console.log(txHash);
});

const cancelWatch = await wallet.watchAddressTransactions((tx) => {
  if (tx.hash === someHash) {
    await cancelWatch();
  }
});
```

You can also wait for a wallet transaction and halt the program execution until it arrives:

```js
const options = {
  getTransactionInfo: true,
  getBalance: false,
  txHash: undefined
}
const response = await wallet.waitForTransaction(options);
```

If `txHash` is supplied method will wait for a transaction with this exact hash to be propagated through and registered in the network by the Fulcrum indexer, otherwise any address transaction will trigger a response.

Response: Object {transactionInfo: any, balance: any} depending on the options supplied.

`transactionInfo` Raw transaction in verbose format as per [specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-transaction-get)

`balance`: balance response object as per `getBalance` request.

If you are willing to ~~spy on~~ monitor transactions of an address you do not own, you can create a [watchOnly wallet](#watch-only-wallets).

### Watching/Waiting for balance

You can watch for wallet balance changes with `watchBalance` method (which also returns a cancellation function). The balance is returned as a bigint in satoshis.

```js
import { toBch } from 'mainnet-js';

const cancelWatch = await wallet.watchBalance((balance) => {
  console.log(`Balance: ${balance} satoshis`);
  console.log(`Balance: ${toBch(balance)} BCH`);
  await cancelWatch();
});
```

You can wait for a certain minimal balance (in satoshis) on the wallet using the `waitForBalance` function.

```js
import { toSat } from 'mainnet-js';

// Wait for at least 100,000 satoshis (0.001 BCH)
const balance = await wallet.waitForBalance(100000n);

// Or use toSat for BCH amounts
const balance2 = await wallet.waitForBalance(toSat(0.001));
```

The `balance` variable contains the actual balance of the wallet in satoshis (bigint).

### Watching/Waiting for block

You can watch for incoming blocks with `watchBlocks` method:

```js
const cancelWatch = await wallet.watchBlocks((block) => {
  console.log(block);
  await cancelWatch();
});
```

If you want to wait for the next block or wait for blockhain to reach certain block height you can use the following method:

```js
const nextBlockInfo = await wallet.waitForBlock();

const futureBlockInfo = await wallet.waitForBlock(770000);
```

The [response object's schema](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-headers-subscribe) is simple:

```json
{
  height: number;
  hex: string;
}
```

### Sending data with OP_RETURN

You can store arbitrary data on blockchain using the OP_RETURN opcode. It is useful not only to store simple text messages, many protocols such as MEMO and SLP are utilizing it to build complex applications.

You can send OP_RETURN messages as simple strings (supporting UTF8) or binary buffers as follows:

```js
await wallet.send([ OpReturnData.from("MEMO\x10LÖL😅") ]);
await wallet.send([ OpReturnData.from(Buffer.from([0x4c, 0x4f, 0x4c])) ]);

// or alternatively

await wallet.send([ ["OP_RETURN", "MEMO\x10LÖL😅"] ]);
await wallet.send([ ["OP_RETURN", Buffer.from([0x4c, 0x4f, 0x4c])] ]);
```

You can simply pass raw buffer containing your opcodes. If your buffer lacks the OP_RETURN and OP_PUSHDATA (followed by the length of the message) opcodes, they will be prepended.

Sending funds and OP_RETURN messages can be mixed together, the output order will be preserved:

```js
await wallet.send([
  OpReturnData.from("MEMO\x10LÖL😅"),
  { cashaddr: otherWallet.cashaddr!, value: 546n },
]);
```

## CashTokens

Since release 1.0.0, mainnet-js supports [CashTokens](https://github.com/bitjson/cashtokens#readme) and [BitcoinCash Metadata Registries (BCMR)](https://github.com/bitjson/chip-bcmr).

::: tip  Javascript builders take note.

To support CashTokens, mainnet-js upgraded to libauth **^v2**, which required converting the library as an ESM module.

There are minimal, react and vue sample configurations for numerous web apps in the [demo directory](https://github.com/mainnet-cash/mainnet-js/tree/master/demo) on github.

:::


All token related methods are available from `Wallet` class directly. This means that you can send BCH and CashTokens in the same transaction.

Furthermore, both fungible and non-fungible (NFT) tokens of the same category can share the same UTXO. Pure NFT just has its fungible token `amount` being 0n.

Each token UTXO contains the following structure:

```ts
interface TokenI {
  amount: bigint;           // Fungible token amount (max: 9223372036854775807)
  category: string;         // 32 bytes hex transaction hash from token genesis
  nft?: {
    capability: NFTCapability;  // none, mutable, or minting
    commitment: string;         // 0-40 bytes hex encoded data
  };
}
```

NFT capabilities:
- `none`: token is immutable (can not change its commitment) and can not mint new NFTs
- `mutable`: token can be spent to create a singular new NFT token with different commitment and optionally `mutable` capability
- `minting`: token can be spent to create any amount of new NFT tokens with different commitment and any capability

Also token carrying utxos do have a BCH value which can not be lower than 798 satoshi for p2pkh token outputs (dust limit), otherwise these inputs would be unspendable. For simplicity mainnet allows to omit the BCH value for token UTXOs. If new token UTXOs are created the value for them will be set to 1000 satoshi. If a singular token UTXO is spent to a single new UTXO its BCH value will be carried over to the new one.

By the specification the token aware wallets should signal to the user that they can handle the CashTokens. `Wallet` class received new property `tokenaddr`, and new methods `getTokenDepositAddress` and `getTokenDepositQr` which should be used and presented to the end-user.

### Token creation - Genesis

It is very easy to create new token category:

```js
const genesisResponse = await wallet.tokenGenesis({
  cashaddr: alice.cashaddr!,      // token UTXO recipient, if not specified will default to sender's address
  amount: 5n,                     // fungible token amount
  nft: {                          // NFT properties (optional)
    capability: NFTCapability.none,
    commitment: "abcd",
  },
  value: 1000n,                   // Satoshi value
});
const category = genesisResponse.categories![0];
```

### Looking up token information

If you want to get the BCMR information about your token (given you have imported it), you can use the BCMR class.

```js
import { BCMR } from '@mainnet-cash/bcmr';

const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(category);
```

Please refer to the [BCMR specification](https://github.com/bitjson/chip-bcmr) to learn more about identity snapshots and how to get the detailed token information.

### Additional token creation - Minting

If you decide to mint new NFT tokens or to mutate the existing token, you would need to use `tokenMint` method.

In the following example we mint 2 new NFTS:

```js
// mint 2 NFTs, amount reducing
const response = await wallet.tokenMint(
  category,
  [
    new TokenMintRequest({
      cashaddr: wallet.cashaddr!,
      nft: {
        commitment: "01",
        capability: NFTCapability.none,
      },
      value: 1000n,
    }),
    new TokenMintRequest({
      cashaddr: wallet.cashaddr!,
      nft: {
        commitment: "02",
        capability: NFTCapability.mutable,
      },
      value: 1000n,
    }),
  ],
  true, // reduce FT amount
);
```

The last boolean parameter might come handy in the case you want to track the amount of tokens left to be minted - for example you have created the token category with 1000 fungible tokens and if you will mint 2 new NFT tokens while this parameter being set to `true`, the minting token will have its FT amount reduced to 998. Note, that will not prevent you to mint more tokens when FT amount reaches 0.

### Sending tokens

Sending tokens around is easy and can be combined with sending BCH! You can include many token send requests in one call, even different token categories:

```js
const sendResponse = await wallet.send([
  // Send fungible tokens
  new TokenSendRequest({
    cashaddr: alice.cashaddr!,
    category: category,
    amount: 100n,
    value: 1500n,
  }),
  // Send NFT with specific capability and commitment
  new TokenSendRequest({
    cashaddr: bob.cashaddr!,
    category: category2,
    nft: {
      capability: NFTCapability.none,
      commitment: "abcd",
    },
  }),
  new SendRequest({
    cashaddr: charlie.cashaddr!,
    value: 100000n,
  }),
]);
```

### Token burning

To explicitly burn the CashTokens they must be sent to an OP_RETURN output. `tokenBurn` method does this:

```js
// burn 1 FT with minting NFT
const burnResponse = await wallet.tokenBurn(
  {
    category: category,
    amount: 1n,
    nft: {
      capability: NFTCapability.minting,
      commitment: "abcd",
    },
  },
  "burn", // optional OP_RETURN message
);
```

If token has fungible amount, the burning mechanism will reduce the token amount. If no fungible amount is left, the NFT will be burnt, effectively destroying the token category.

There is a way to implicitly burn fungible tokens without sending them to an OP_RETURN, just ensure that you send less tokens than you have, while setting the `checkTokenQuantities` of SendRequestOptions object to false:

```js
const sendAndBurnResponse = await wallet.send([...], { checkTokenQuantities: false });
```

### Token UTXOs

If you want to get the information about CashToken UTXOs of an address, look up the locked satoshi values, etc., you can do the following call:

```js
const category = undefined;
const utxos = await wallet.getTokenUtxos(category);
```

If `category` is undefined UTXOs of all token categories will be returned. If `category` is set, only tokens of this category will be returned.

### Token balances

You can get all fungible token balances of your wallet or a balance of a specific token with the following methods:

```js
const tokenBalance = await wallet.getTokenBalance(category);
const allBalances = await wallet.getAllTokenBalances();
```

To get the total amount of NFT tokens use the following methods:

```js
const nftTokenBalance = await wallet.getNftTokenBalance(category);
const allNftBalances = await wallet.getAllNftTokenBalances();
```

### Watching/waiting for fungible token balance

Similarly a to BCH transaction watching/waiting we provide the convenient methods to watch/wait for fungible token balance.

```js
const cancelFn = await wallet.watchTokenBalance(tokenId, (balance) => {
  ...
});
```

You can wait for the wallet to reach a certain minimal fungible token balance:

```js
const actualBalance = await wallet.waitForTokenBalance(category, 10n);
```

This will halt the program execution until the balance reaches the target value.

## BCMR - BitcoinCash Metadata Registries

We implement [BCMR](https://github.com/bitjson/chip-bcmr/tree/5b24b0ec93cf9316222ab2ea2e2ffe8a9f390b12) CHIP to support on-chain CashToken metadata resolution employing zeroth-descendant transaction chain (ZDTC), which authenticates and publishes all registry updates.

To add metadata registry to the list of tracked ones use one of the following methods:

1. Direct: use `BCMR.addMetadataRegistry` to add the [`Registry`](https://github.com/bitjson/chip-bcmr/blob/5b24b0ec93cf9316222ab2ea2e2ffe8a9f390b12/bcmr-v1.schema.ts#L103) object to the list of tracked
2. Using HTTPS or IPFS endpoint: use `addMetadataRegistryFromUri` to download a JSON file containing the `Registry` and add it to the list of tracked, optionally enforcing the content hash verification.
3. Using authchain resolution to optionally follow to the head of the authchain and fetching data from HTTPS or IPFS Publication Outputs

```js
const authChain = await BCMR.addMetadataRegistryAuthChain({
  transactionHash: txHash,
  followToHead: false
});
```

In this example we resolve the exact metadata registry stored in the transaction findable by its transaction hash `txHash`. If we'd wanted to resolve the latest version, we'd set `followToHead` to `true`.

After adding the registry, we will have access to token info with `BCMR.getTokenInfo`:

```js
const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(category);
```

Note, that token info resolution will prioritize the most recently added registries and return the info about first found token with matching `category`.

To get a copy of all tracked registries, use `getRegistries`, to purge the list use `resetRegistries`.

### BCMR authchain resolution

If you want to partially or fully resolve a BCMR authchain, you can use the following method:

```js
const authChain: AuthChainElement[] = await BCMR.buildAuthChain(options);
```

where AuthChainElement is defined as:
```js
interface AuthChainElement {
  txHash: string;
  contentHash: string;
  uri: string;
}
```

The options object allows you to specify the resolution process:

* `transactionHash` is a required field, and specifies the hash of a transaction from which the resolution should start
* `resolveBase` is a boolean flag which specifies if we should resolve all authchain elements towards the first element called "authbase"
* `followToHead` is a boolean flag which specifies if we should resolve all authchain elements towards the last and most recent element called "authhead". Authhead always resides in UTXO set.

So if you set both `resolveBase` and `followToHead` to true, the full authchain will be resolved.


## TestNet faucet

You can have some TestNet satoshi for your convenience. Visit our ~~faucet~~ refilling station at [https://rest-unstable.mainnet.cash/faucet.html](https://rest-unstable.mainnet.cash/faucet.html)

Your address will be refilled up to 10000 TestNet satoshi upon a call. There are request rate limiters set up to prevent abuse.

We've integrated the faucet into the library so that you can do easy calls like the following:

```js
const txid = await wallet.getTestnetSatoshis();
...
const sendResponse = await wallet.returnTestnetSatoshis();
```

## Utilities

### Decoding transactions

You can decode a transaction by its hash (if it *already exists* on the blockchain) or full raw contents in hex format using the following snippet:

```js
  const decoded = await Wallet.util.decodeTransaction("36a3692a41a8ac60b73f7f41ee23f5c917413e5b2fad9e44b34865bd0d601a3d", true);
```

The returned object is compatible with [this specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-transaction-get) with extra information about input values and cash addresses if `loadInputValues` parameter is specified and set to `true`.

### Currency conversions

Need to find out how many BCH are there currently in 1 USD, or find out how many satoshis are there in 100 USD? Easy!

```js
await convert(100, "usd", "sat")
// 28067024
```


### Extended Public Key Derivation

By default a `seed` type wallet derives and uses the cashaddr for the first non-hardened address in the `m/44'/0'/0'` path, so `m/44'/0'/0'/0/0`.

```js
const wallet = await TestNetWallet.newRandom();
wallet.derivationPath
// "m/44'/0'/0'/0/0"
```

If you wanted to check different xPubKey paths for funds,

```js
await wallet.getXPubKeys()
```

<!-- cSpell:disable -->
```json
[
  {
    "path": "m/0",
    "xPubKey": "tpubD8GnQw6feyPpQAa7Y2Zwp7LJxg9uAKwVYnVHd1okqkTkmcSheiGzcrygbJxf6xsTUxJk4Vx1SdJZvZTdfPgP8JLyne52nqMsiLTckkZUiyV"
  },
  {
    "path": "m/0'",
    "xPubKey": "tpubD8GnQw6ozdvnaPzEgcpRcdYsDgDrmmC3PDVUBXqngM26WtnMg3gUV6qjwHWK2LqPrnMmZx9gRCkSdEH352fG6wbcsabpPXB6xPdJCXJ7sir"
  },
 ... some paths omitted ...
  {
    "path": "m/44'/245'/0'",
    "xPubKey": "tpubDDnJ2bvR5UhBYUAMGKiT78Cm8C9cR5BVB24Y9qWbz6qfc7NAGFkD1bAvcETofmHmtwwYtC4Yz7pqECvnEnZb3QuNpXBtsbbSTNWY6eXuMnN"
  },
  {
    "path": "m/44'/245'/0'/0",
    "xPubKey": "tpubDFSeg9a8jxVqi9FuCuTXY5e7vRUHYFkEKCVuGcpvkhf7sGqTLc6esVMoJK7hzs6weGcCT9T3nCsuhrqvRxHaBF2fjbhk2bdxHjVmSewYDBs"
  }
]
```
<!-- cSpell:enable -->

To derive the public addresses from a given xpubkey, a `getAddrsByXpubKey()` utility.

<!-- cSpell:disable -->
```js
await Mainnet.getAddrsByXpubKey("tpubDDfazrbXYF84Xxq7XqnakjAwVyCFVUGEWrsuQY3VqzpV8QgH2X2cczoZbEAyMdRmcra4nLhf67vEZ1jSnQ2KKcq5USoTGtFGaVTsXx7XsG7","0/0",5)
```


```json
[
  "bchtest:qqncw6u2duejwku54cgg74r25r2894ar6vtpr2mye5",
  "bchtest:qzxhvrkthxtk33f9tnurz5k2h5v36ve7uqfu8mvvjz",
  "bchtest:qpvc5t4tp3nule8gv53ln9j38n36795hnc20u9wj4v",
  "bchtest:qzc826sf3mvvmnlkg7sr32d2jxt6stu84u70nqelfu",
  "bchtest:qqgd46e75y3flz6vy3vn0tfrnkzmjtnw5v42573hs7"
]
```
<!-- cSpell:enable -->

So the above addresses correspond to the cashaddrs for the paths `m/44'/0'/0'/0/0-4`.

This will allow you to check for the existence of funds on alternate child or parent derivation paths, however full hierarchical deterministic (HD) wallets are not supported at this time.

## History

Suppose your app or use case needed a list of transactions associated with an address, this is a bit more complicated than it sounds because an address may send change back to itself when sending funds, it may receive inputs from multiple outputs at once, or send funds to multiple addresses at once, etc. 

The `getHistory` function aims to simplify this for app developers by providing a list of all material changes in the balance of an address, in a linear format where every input and output are itemized to show a running tabulation. 

So for the simple case of a watch only wallet: 

<!-- cSpell:disable -->
```javascript
let eaterWallet = Wallet.watchOnly("qp6e6enhpy0fwwu7nkvlr8rgl06ru0c9lywalz8st5")
// getHistory(unit, start, count, collapseChange)
await eaterWallet.getHistory(
  'sat', // unit
  0,     // start in reverse chronological order, most recent first
  2,     // number of transactions to return
  true   // collapse "change" returned back to the address
  )
```
<!-- cSpell:enable -->

The above call would return the last two transactions received by the address in question.

<!-- cSpell:disable -->
```json
[
    {
        "from": "a35a0ef10445acb5686d04ee6f8bbcc203c973a6cf064145961eca2428c248b8:o:1;3c76effe9efaceca5845ef1edc3c6aff0746d94aef3559b858cff89fbad280ff:o:3",
        "to": "bitcoincash:qp6e6enhpy0fwwu7nkvlr8rgl06ru0c9lywalz8st5",
        "unit": "sat",
        "index": 1,
        "blockheight": 775276,
        "txn": "e4a41792b8ea19a114e031c87fb8cedffc989a0f58cb4a0d387e27c0b00f0200",
        "txId": "e4a41792b8ea19a114e031c87fb8cedffc989a0f58cb4a0d387e27c0b00f0200:o:1",
        "value": 546,
        "fee": 0,
        "balance": 1313652003
    },
    {
        "from": "e4a41792b8ea19a114e031c87fb8cedffc989a0f58cb4a0d387e27c0b00f0200:o:2;e4a41792b8ea19a114e031c87fb8cedffc989a0f58cb4a0d387e27c0b00f0200:o:3",
        "to": "bitcoincash:qp6e6enhpy0fwwu7nkvlr8rgl06ru0c9lywalz8st5",
        "unit": "sat",
        "index": 1,
        "blockheight": 775276,
        "txn": "578bbd76a87eed1d468c033efdf32d330f8fa854048d1b9768064384603a2963",
        "txId": "578bbd76a87eed1d468c033efdf32d330f8fa854048d1b9768064384603a2963:o:1",
        "value": 546,
        "fee": 0,
        "balance": 1313651457
    }
]
```
<!-- cSpell:enable -->

Alternatively, to get history formatted similar to the ElectrumX protocol, the raw history of transactions can be accessed with `getRawHistory()`

```javascript
await eater.getRawHistory()
```

The above call will return the full history, as provided by the indexer, in **chronological order**, oldest **first**:

<!-- cSpell:disable -->
```json
[
    {
        "height": 132184,
        "tx_hash": "369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1"
    },
    {
        "height": 132187,
        "tx_hash": "456b21f80179f59f519ff170afd390a4474610f4a9de7368fb3a778a7f84939f"
    },
    // .... [2-535]
    {
        "height": 775276,
        "tx_hash": "578bbd76a87eed1d468c033efdf32d330f8fa854048d1b9768064384603a2963"
    },
    {
        "height": 775276,
        "tx_hash": "e4a41792b8ea19a114e031c87fb8cedffc989a0f58cb4a0d387e27c0b00f0200"
    }
]
```
<!-- cSpell:enable -->

With the `getRawHistory` version of the call, it's possible to parse (or cache) transactions locally with your own logic and present it to users as you see fit. 

## Signed Messages

One of the perks of having a wallet is the ability to sign message text or verify the signatures of other parties using their public key.

Full-nodes and SPV wallets often include this feature as standard. 

### Signing a message with a wallet

Let's try signing with an example from a common test case:

<!-- cSpell:disable -->
```js
message = "Chancellor on brink of second bailout for banks"
francisWallet = await Wallet.fromWIF(
      `L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN`
    );

francisWallet.cashaddr
// "bitcoincash:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw"

signature = francisWallet.sign(message).signature;
// H/9jMOnj4MFbH3d7t4yCQ9i7DgZU/VZ278w3+ySv2F4yIsdqjsc5ng3kmN8OZAThgyfCZOQxZCWza9V5XzlVY0Y=

// or

sigResult = francisWallet.sign(message);
```
<!-- cSpell:enable -->

Where the full `sigResult` result is:

<!-- cSpell:disable -->
```json

{
  "raw": {
    "ecdsa": "/2Mw6ePgwVsfd3u3jIJD2LsOBlT9VnbvzDf7JK/YXjIix2qOxzmeDeSY3w5kBOGDJ8Jk5DFkJbNr1XlfOVVjRg==",
    "schnorr": "rSeWfhxN6tI+3hNQpHwU6E+pZC34rk6gR/h8hqxS0YjUd6mxsOd4OCmMkGJXsqNvVZ1F/Fs/Y81dyzSDBhxp9w==",
    "der": "MEUCIQD/YzDp4+DBWx93e7eMgkPYuw4GVP1Wdu/MN/skr9heMgIgIsdqjsc5ng3kmN8OZAThgyfCZOQxZCWza9V5XzlVY0Y="
  },
  "details": {
    "recoveryId": 0,
    "compressed": true,
    "messageHash": "gE9BDBFAOqW+yoOzABjnM+LQRWHd4dvUVrsTR+sIWsU="
  },
  "signature": "H/9jMOnj4MFbH3d7t4yCQ9i7DgZU/VZ278w3+ySv2F4yIsdqjsc5ng3kmN8OZAThgyfCZOQxZCWza9V5XzlVY0Y="
}
```
<!-- cSpell:enable -->

::: danger Please be aware
 The above contains both ECDSA and Schnorr signatures. If they had been created using the same random nonce, an attacker could derive the private key. To avoid this risk, the underlying library ([libauth](https://libauth.org/interfaces/secp256k1.html#signmessagehashschnorr)) uses nonces for Schorr signatures with the additional data field set to `Schnorr+SHA256`. Such measures are an important security requirement for any financial software producing both types of signatures. 
:::

For most cases, the relevant information here is the `"signature"` field, which can be used in an SPV wallet such as electron cash or with [bitcoin.com's verify tool](https://tools.bitcoin.com/verify-message/). The following signature will validate as belonging to Francis' address:


**Bitcoin Address:**  bitcoincash:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw

**Message:**          Chancellor on brink of second bailout for banks

**Signature:**        H/9jMOnj4MFbH3d7t4yCQ9i7DgZU/VZ278w3+ySv2F4yIsdqjsc5ng3kmN8OZAThgyfCZOQxZCWza9V5XzlVY0Y=

It should also be noted that the signature is "recoverable", meaning the `publicKey` can be derived from it and the message.  This is important when validating against a `cashaddr`, because only a `publicKeyHash` can be derived from a `cashaddr`.

If one of the `"raw"` signatures are used instead, the `publicKey` may have to be passed manually.

### Verifying a message with a wallet

To verify the above signature (without having access to the private key), by using a `watchOnly` wallet to represent the party in the example above.


```js

francisPublic = await Wallet.watchOnly("bitcoincash:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw")

message = "Chancellor on brink of second bailout for banks"
sig = "H/9jMOnj4MFbH3d7t4yCQ9i7DgZU/VZ278w3+ySv2F4yIsdqjsc5ng3kmN8OZAThgyfCZOQxZCWza9V5XzlVY0Y="

verifyResult = francisPublic.verify(message, sig);
```

where `verifyResult` is

```json
{
  "valid": true,
  "details": {
    "signatureValid": true,
    "signatureType": "recoverable",
    "messageHash": "gE9BDBFAOqW+yoOzABjnM+LQRWHd4dvUVrsTR+sIWsU=",
    "publicKeyHashMatch": true
  }
}
```

In the default case, with a `"signatureType"` of `"recoverable"`, the cashaddr `publicKeyHash` has been checked against the hashed `publicKey`, which is recovered from the provided message and signature.

Under the hood, all signature types, the message is serialized or formatted in four parts before hashing:

```
\x18                       // 1) length the prefix
Bitcoin Signed Message:\n  // 2) A prefix w/newline
<\x???>                    // 3) length of the message
<message>                  // 4) the message string as utf8 encoded binary 
```

The above message formatting is typically handled automatically by the signing software (i.e. wallet.sign(...)), and the `messageHash` is the double sha256 of the above as binary. For verification, only if the signature itself is valid **and** the recovered `publicKey` is valid for the provided `cashaddr` will the response have `"valid":true`, and the additional details given may be safely ignored in most cases.

## RegTest wallets

During the local development and testing, you might not want to use TestNet coins, so you can use so-called "RegTest wallets". 

::: tip What is RegTest?

Regression testing is the practice of testing software after a change to ensure previous code still works. Bitcoin full node software can be started in `RegTest` mode, which you can use to run your Bitcoin Cash node locally, and you can get as many test coins as you need, but they exist on your machine only. RegTest wallets are supported by the mainnet library. 

:::

A full Bitcoin node, an Electrum server and open Postgres server configuration is available for testing in a 
Docker Compose file at `jest/regtest-docker-compose.yml`

It can be brought up with:

```bash
yarn regtest:up
```

To stop it:

```bash
yarn regtest:down
```

The Electrum server (Fulcrum) is available at `ws://127.0.0.1:60003` on your local machine.  
The regtest BCHN node is on port `18443` available with RPC using credentials in `.env.regtest`. 
An open Postgres server is also available on port `15432`

A wallet is configured with the rewards from the first 215 blocks of the regtest network, you can get an instance of the wallet with this code:

```javascript
//
// configured in your testing environment ...
// ALICE_ID="wif:regtest:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
//
const alice = await RegTestWallet.fromId(process.env["ALICE_ID"]!);
```

## WebSockets

We provide some functionality over websockets where traditional REST servers would timeout. Examples are waiting for transactions and watching balances .
Websockets allow to subscribe to server events, sending responses and notifications asynchronously.

Check out the jsfiddle [demo](https://jsfiddle.net/ahq6eyd3/1/)

Websockets are supported by all major browsers and using them is easy, no external libraries are needed:

```js
let socket = new WebSocket("wss://rest-unstable.mainnet.cash/api/v1/wallet");
socket.onopen = (event) => {
  const request = {method: "watchBalance", data: {cashaddr: address}};
  socket.send(JSON.stringify(request));
};

socket.onmessage = (event) => {
  const balance = JSON.parse(event.data);
  // do something
};
```

The output of this code snippet will look like this:

```json
{
  bch: 0.00009383,
  sat: 9383,
  usd: 0.029358468699999998
}
```

See [websocket API reference](/tutorial/rest.html#websocket-api-reference)

## Changing Electrum Servers

By default, creating a new wallet will use a common connection
to a single server communicating with the [electrum cash protocol](https://bitcoincash.network/electrum/). 

These connections are stored on `globalThis` under a variable matching ticker for the network (`BCH`, `tBCH`, `rBCH`).

If you need to create a new connection manually, it can be done by 
passing the network and servers, where servers is either a single
url or an array of urls.

```js
let conn = new Connection(
  "mainnet",
  "wss://bch.imaginary.cash:50004" 
  )
await conn.networkProvider.getBlockHeight()
// 669347
```

This connection can be used to replace the common provider on `globalThis.BCH` or assigned to a particular wallet by overwriting the `provider` object of the wallet:

```js
globalThis.BCH = conn.networkProvider;
// or
wallet.provider = conn.networkProvider;
```
