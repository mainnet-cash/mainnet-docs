# SmartBch REST API

SmartBch backend wallets wallets are designed after usual BCH mainnet.cash wallets to make it easy to reuse your developed code. Although SmartBch is based on Ethereum technology, we still use BCH (10 ** 18 SmartBch wei) and satoshi (10 ** 10 SmartBch wei) to denote the currency.

This documentation thus is mostly a duplication of a [BCH](/tutorial/rest) mainnet.cash documentation.

## Introduction

Our REST API allows you to create advanced, performant, and secure financial applications without the usual complexity of blockchain development.

By deploying our REST API on your server, creating enterprise-level cryptocurrency applications becomes effortless.

<b style="color: #af3e3e;">Important!</b> This tutorial shows calls to `https://rest-unstable.mainnet.cash` to ease the learning process.
You can use it to learn, but <span style="background-color: #fffdbf; padding: 0 5px 0 5px;">for production use you are expected to</span> [run your own service](/tutorial/running-rest.md) (it's very lightweight, just one docker call),
because
otherwise you actually send us your _private keys_, which is absolutely insecure. Run your own service, you'll be ok.

This REST API is in production use on noise.cash and creates hundreds of thousands of transactions daily, it's pretty stable, but...

<p style="font-size: 90%;">...this server is currently in a <span style="background-color: #fffdbf; padding: 0 5px 0 5px;">beta stage</span>. 
Things may change randomly. There is no backward compatibility guarantee yet, 
even though we try not to break things too often.</p> 

## Let's get programming


Let's first create a test SmartBch wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "testnet"}'
```

See also: Full [REST server API reference](https://rest-unstable.mainnet.cash/api-docs/).

Response:

```json
{
  "name": "",
  "address": "0x983b322E56beA81d4Bb1d4843998aaD530F29578",
  "walletId": "seed:testnet:mango coil clean moral adapt wrist feature purse job produce nominee tail:m/44'/60'/0'/0/0",
  "seed": "mango coil clean moral adapt wrist feature purse job produce nominee tail",
  "derivationPath": "m/44'/60'/0'/0/0",
  "network": "testnet"
}
```

This creates a **TestNet** wallet.  This has the address of the wallet, where you can send money, and the `walletId`.
Note the `walletId` - we're going to need it later. This wallet will not be persisted. See below for persistent wallets.

::: danger walletId contains the private key

Keep `walletId` a secret as it contains the private key that allows spending from this wallet. WalletId, Seed phrase, PrivKey - all
these are a form of a private key.

:::

::: tip What is TestNet? Where to get TestNet money and a wallet?

`TestNet` is where you test your application. TestNet money has no price. Opposite of TestNet is `MainNet`,
which is what people usually mean when they talk about Bitcoin Cash network.

You can get free TestNet money using our TestNet faucet (see below) or [here](http://34.92.246.27:8080/faucet/).

If you need a wallet that supports the TestNet install MetaMask browser extension and define a network with a following JSON-RPC endpoint https://moeing.tech:9545. See more [here](https://docs.smartbch.org/smartbch/testnets).

:::

To create a MainNet wallet (SmartBch production network):

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "mainnet"}'
```

Response:

```json
{
  "name": "",
  "address": "0x82846Ed87a8fD261b5D1270c8e8431F12Ad52C7C",
  "walletId": "seed:mainnet:either marble skin denial tip depend napkin chunk tornado rigid visit click:m/44'/60'/0'/0/0",
  "seed": "either marble skin denial tip depend napkin chunk tornado rigid visit click",
  "derivationPath": "m/44'/60'/0'/0/0",
  "network": "mainnet"
}
```

Seed phrase wallets use the derivation path `m/44'/60'/0'/0/0` by default (standard for Ethereum networks)

If you want to manually construct a walletId from a Private Key, just build a string like this:

```
privkey:mainnet:0xPRIVATEKEYHERE
```

Similarly, from a seed and a derivation path:

```
seed:mainnet:SEED WORDS HERE:m/DERIVATION/PATH
```

Networks: `mainnet`, `testnet`, `regtest` ([see below](#regtest-wallets))

Note: we generate bindings and packages for some programming languages, so that you don't have
to do the REST calls manually, see [here](/tutorial/other-languages.html). You can generate bindings for nearly
every other programming language easily.

## Named wallets (persistent)

Named wallets are used to save the private key inside the REST API server, so that you 
can refer to it by name and always get the same wallet.

To create a persistent wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "testnet", "name": "wallet_1"}'
```

Response:

```json
{
  "name": "wallet_1",
  "address": "0x4A752A89B67A94e2f9d4853fFE62C47e42437a7d",
  "walletId": "named:testnet:wallet_1",
  "seed": "embrace protect ability wave music maximum quick average drink test either analyst",
  "derivationPath": "m/44'/60'/0'/0/0",
  "network": "testnet"
}
```

The wallet's private key will be stored in the PostgreSQL database of the REST API server.

Note that `rest-unstable.mainnet.cash` will not allow you to store mainnet private keys,
you need to [run your own service](/tutorial/rest.md) for that. We really don't want to store your private keys!

To check if a named wallet already exists in the storage, you can invoke:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/named_exists \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "testnet", "name": "wallet_1"}'
```

Response:

```json
{"result":true}
```

Say a user of your application wants to change the wallet info to a new seed. Their wallet on the REST server can be replaced (recovered) with the existing `walletId`:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/replace_named \
    -H "Content-Type: application/json" \
    -d '{"name": "wallet_1", "walletId": "seed:testnet:diary caution almost ...:m/44'\''/60'\''/0'\''/0/0", "type": "seed", "network": "testnet"}'
```

Response:

```json
{"result":true}
```

If the wallet entry does not exist in the DB, it will be created. If it does - it will be replaced without exception.


### Watch-only wallets

Watch-only wallets do not have private keys and unable to send funds, however they are very useful to keep track of adress' balances, subscribe to its incoming and outgoing transactions, etc.

They are constructed from an address by building a `walletId` like this:

```
watch:testnet:0xE25ddbAF8DD61b627727e03e190E32feddBD1319
```

...and then doing the regular wallet querues like `smartbch/wallet/balance`.

## Getting the balance

To get the balance of your wallet you can do this (use the `walletId` that you got previously):

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "named:testnet:wallet_1"
  }'
```

Response:

```json
{"bch": 0.20682058, "sat": 20682058, "usd": 91.04}
```

Or you can use `unit` in the call to get just the number:

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "named:testnet:wallet_1",
    "unit": "sat"
  }'
```

Response:

```
20682058
```

You can ask for `usd`, `sat`, `bch` (or `satoshi`, `satoshis`, `sats` - just in case you forget the exact name).

- 1 satoshi = 0.00000001 Bitcoin Cash (1/100,000,000th)
- 1 Bitcoin Cash = 100,000,000 satoshis

`usd` returns the amount at the current exchange rate, fetched from CoinGecko or Bitcoin.com.

## Sending money

Let's create another wallet and send some of our money there.

Remember, that first you need to send some satoshis to the address of your original wallet (see the TestNet note above).

Check that the balance is there in the original wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/balance \
-H "Content-Type: application/json" \
-d '{"walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"}'
```

```json
{"bch": 0.000100000, "sat": 10000, "usd": 0.02}
```

Now, we can send 100 satoshis to the `...z2pu` address

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/send \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
    "to": [
      {
        "address": "0xA2263c06da00Ea7A7fBD5407ff8B8613F33369E6",
        "value": 100,
        "unit": "sat"
      }
    ],
    "options": {
      "queryBalance": true,
      "awaitTransactionPropagation": true
    },
    "overrides": {
      "gasPrice": 100000000000
    }
  }'
```

Note that you can send to many addresses at once. It is also possible to specify `options`.

Response:

```json
{
  "txId": "0xc519c3b66955a598dd1f298fcfaf92530db39b70d6d4699c57ffc5faa5aa30f7",
  "balance": {"bch": 0.00009680, "sat": 9680, "usd": 0.02}
}
```

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

Let's print the balance of `0xA22...` wallet:

```bash
{"bch": 0.00000100, "sat": 100, "usd": 0.00}
```

Great! You've just made your first transaction!

Now you can send all of your money somewhere else:

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/send_max \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
    "cashaddr": "0xA2263c06da00Ea7A7fBD5407ff8B8613F33369E6"
  }'
```

This will send the maximum amount (minus the transaction fees). Note, that you can also use here the optional parameter `options` and `overrides` to steer the network interaction (see above).

### QR codes

Let's say you want to display a QR code for you user to pay you money and show an alert when money arrives?

Let's display a QR code:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/wallet/deposit_qr \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"
  }'
```

Response:

```json
{"src":"data:image/svg+xml;base64,PD94bWwgdmVyc2...."}
```

You can use this `src` directly in the image tag:

```html
<p style="text-align: center;">
    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2...." style="width: 15em;">
</p>
```

### Waiting for blockchain events

Coming soon.

<!-- See [WebSockets](#websocket-api-reference) and [WebHooks](#webhooks). -->

## SEP20 (ERC20) token protocol

We currently fully support the SEP20 tokens [specification](https://docs.smartbch.org/smartbch/smartbch-evolution-proposals-seps/sep-20)

The interfaces were designed to be largely similar to those of BCH wallets and SLP protocol.

Note, that REST server uses strings for the token amounts in order not to lose precision or have floating point issues.

### Token creation - Genesis

To create your own token you should prepare and broadcast a special genesis transaction containing all the information about the token being created: token name, ticker, decimals - number of significant digits after comma, initial token amount. Some of these properties are optional.

With the `endBaton` parameter you can decide to keep the possibility of additional token creation, which is governed by so called minting baton or immediately discard this baton to make the token circulation amount to be fixed.

Note, that there might be many tokens with the same name. Remember, that only 42 character long string-ids do identify your token uniquely und unambiguously.

In the following example 10000.00 MNC tokens will be created.

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/genesis \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "name": "Mainnet coin",
  "ticker": "MNC",
  "initialAmount": "10000",
  "decimals": 2,
  "endBaton": false,
  "overrides": {
    "gasPrice": 100000000000
  }
}'
```

Response:

```json
{
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e",
  "balance": {
    "name": "Mainnet Coin",
    "ticker": "MNC",
    "decimals": 8,
    "value": "10000",
    "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
  }
}
```

Optional `tokenReceiverAddress` and `batonReceiverAddress` allow to specify the receiver of tokens and minting baton.

### Looking up token information

If you want to get the genesis information of some token, you can simply call `smartbch/sep20/token_info`:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/sep20/token_info \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
}'
```

Response:

```json
{
  "name": "Mainnet Coin",
  "ticker": "MNC",
  "decimals": 8,
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e",
  "totalSupply": "10000"
}
```

### Additional token creation - Minting

If you decide to increase the token circulation supply, you would need to `mint` more tokens. You are required to have the ownership of the minting baton to do so.

In the following example we issue 50 more tokens we just created in genesis:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/mint \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "value": "50",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e",
  "tokenReceiverAddress": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
  "overrides": {
    "gasPrice": 100000000000
  }
}'
```

Optional `tokenReceiverAddress` allow to specify the receiver of tokens.

Response:

```json
{
  "txId": "0xc519c3b66955a598dd1f298fcfaf92530db39b70d6d4699c57ffc5faa5aa30f7",
  "balance": {
    "name": "Mainnet Coin",
    "ticker": "MNC",
    "decimals": 8,
    "value": "10050",
    "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
  }
}
```

### Sending tokens

Sending tokens around is easy and is very similar to sending BCH. You can include many send requests in one call too!

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/send \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "to": [
    {
      "address": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
      "value": 100,
      "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
    }
  ],
  "overrides": {
    "gasPrice": 100000000000
  }
}'
```

Response:

```json
[{
  "txId": "0xc519c3b66955a598dd1f298fcfaf92530db39b70d6d4699c57ffc5faa5aa30f7",
  "balance": {
    "value": "19900",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
  }
}]
```

Or you can send all tokens available with a simple `smartbch/sep20/send_max` method

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/send_max \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "address": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e",
  "overrides": {
    "gasPrice": 100000000000
  }
}'
```

Response:

```json
{
  "txId": "0xc519c3b66955a598dd1f298fcfaf92530db39b70d6d4699c57ffc5faa5aa30f7",
  "balance": {
    "value": "0",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
  }
}
```

### Token balances

You can get all token balances of your wallet or a balance of a specific token with the following methods:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/balance \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
}'
```

Response:

```json
{
  "value": "10000",
  "ticker": "MNC",
  "name": "Mainnet coin",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
}
```

All balances:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/smartbch/sep20/all_balances \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
}'
```

Response:

```json
[{
  "value": "10000",
  "ticker": "MNC",
  "name": "Mainnet coin",
  "tokenId": "0xca4A3794Ba7761a480F1356CC1B22E35321C2b4e"
}]
```

`smartbch/sep20/all_balances` does a deep blockchain scan for tokens transferred to or from this address.
Might take a long time to run and time out your request.
Deep rescan will be skipped by default if a previous scan was performed for a particular wallet. If you know there were transactions including new tokens, use `forceRescan: true`.
If you want to know the full list of tokens ever transferred to or from the address, use `hideEmpty: false`.

### Sep20 deposit address

You can get the token deposit address:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/sep20/deposit_address \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"
}'
```

Response:

```json
{
  "address": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319"
}
```

### Sep20 deposit QR code

You can get the deposit address embedded in a QR code image. The response is ready to be used in HTML `src`, `title` and `alt` attributes of an `img` node.

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/sep20/deposit_qr \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45"
}'
```

Response:

```json
{
  "src": "data:image/svg+xml;base64,PD94bWwgdm... ==**",
  "title": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
  "alt": "A Bitcoin Cash Simple Ledger Protocol QR Code"
}
```

### Non-fungible tokens (NFT)

Coming soon.

<!-- NFT1 is a simple extension to the SLP token type 1 protocol which allows many NFT tokens to be grouped together using a single ID. Having the ability to group NFTs in a provable manner opens the doors for many more token applications, and makes SLP more similar to other NFT protocols (e.g., ERC-721). NFT1 uses the same validation rules as SLP token type 1 with a few additional constraints. [See reference](https://slp.dev/specs/slp-nft-1/#simple-nft-vs-nft1-protocol). Non-fungible tokens can be produced by simply minting a non-divisible token supply of 1 without a minting baton.

All operations apart from genesis and minting, which are used for SLP tokens Type1, support the NFT tokens and are used the same way with same interfaces.

#### NFT Parent Genesis

To create the NFT parent group use the following code snippet

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/nft_parent_genesis \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "name": "Mainnet NFT Parent",
  "ticker": "MNC_NFTP",
  "initialAmount": "10000",
  "decimals": 0,
  "documentUrl": "https://mainnet.cash",
  "documentHash": "db4451f11eda33950670aaf59e704da90117ff7057283b032cfaec7779313916",
  "endBaton": false,
  "tokenReceiverSlpAddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "batonReceiverSlpAddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866"
}'
```

Response:

```json
{
  "tokenId": "90a0bac9a1e3c0dfb40b8b8cb2ab04db91b57e5f2b43251e55c080d2f7c4a668",
  "balance": {
    "value": "10000",
    "ticker": "MNC_NFTP",
    "name": "Mainnet NFT Parent",
    "tokenId": "90a0bac9a1e3c0dfb40b8b8cb2ab04db91b57e5f2b43251e55c080d2f7c4a668",
    "type": 129
  }
}
```
Note: these tokens are transferrable and mintable. Decimal places of 0 is adviced.

#### NFT Child Genesis

NFT child tokens are unique and one of a kind. To create an NFT child token use the following code snippet

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/nft_child_genesis \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:testnet:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "name": "Mainnet NFT Child",
  "ticker": "MNC_NFTC",
  "initialAmount": "1",
  "decimals": 0,
  "documentUrl": "https://mainnet.cash",
  "endBaton": false,
  "tokenReceiverSlpAddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "batonReceiverSlpAddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "parentTokenId": "90a0bac9a1e3c0dfb40b8b8cb2ab04db91b57e5f2b43251e55c080d2f7c4a668"
}'
```

Response:

```json
{
  "tokenId": "ae332fa2dba4dd943f86d9f2b1ed7a3bcb40a7f30b9b7736e4ee9acabb1f0908",
  "balance": {
    "value": "1",
    "ticker": "MNC_NFTC",
    "name": "Mainnet NFT Child",
    "tokenId": "ae332fa2dba4dd943f86d9f2b1ed7a3bcb40a7f30b9b7736e4ee9acabb1f0908",
    "type": 65
  }
}
```
In the process of the child genesis, a parent token of quantity 1 will be spent, so ensure you possess some. If you have more than 1 (n), the tokens will be split into (n-1) and 1.

Note: these tokens are transferrable but not mintable. Regardless of options supplied, the following options will be overriden: `endBaton` will be set to `true`, `initialAmount: 1`, `decimals: 0`. Otherwise they will be considered as invalid by the SLP validators. -->

## TestNet faucet

You can have some SmartBch TestNet satoshi or SEP20 tokens for your convenience. Visit our ~~faucet~~ refilling station at [https://rest-unstable.mainnet.cash/faucet.html](https://rest-unstable.mainnet.cash/faucet.html)

Your address will be refilled up to 0.1 TestNet BCH or up to 10 SEP20 tokens upon a call. There are request rate limiters set up to prevent abuse.

We've integrated the faucet into the library so that you can do easy calls like the following.

### Get TestNet satoshis

```shell script
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_testnet_sbch \
  -H "Content-Type: application/json" \
  -d '{
  "address": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319"
}'
```

### Get TestNet SEP20 tokens

```shell script
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_testnet_sep20 \
  -H "Content-Type: application/json" \
  -d '{
  "address": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
  "tokenId": "0xdac17f958d2ee523a2206206994597c13d831ec7"
}'
```

Requesting testnet funds uses a queue for batch-processing. Hence, no txId is returned immediately. The request is usually settled in 1-3 blocks.

## Smart Contracts

`Contracts` are objects that allow one to interact with Smart Contracts already deployed on SmartBch network or to deploy new ones.

Note, that unlike the BCH contracts, SmartBch contract do not use nonce.

We allow to deploy [solidity](http://solidity.readthedocs.io) based contracts. Example SEP20 contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/SEP20/SEP20.sol";

contract MyToken is SEP20 {
  constructor(string memory name, string memory symbol) SEP20(name, symbol) {}
}
```

### Creating a contract interface (contractId)

To interact with already deployed contracts you need the contract address and its ABI (Application Binary Interface). You can invoke the following method:

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/contract/create \
  -H  "Content-Type: application/json" \
  -d '{
  "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "abi": "[\"function name() view returns (string)\", \"function symbol() view returns (string)\"]",
  "network": "regtest"
}'
```

Resposnse:

```json
{
  "contractId": "smartbchcontract:regtest:0xdac17f958d2ee523a2206206994597c13d831ec7:WyJmdW5jdGlvbiBuYW1lKCkgdmlldyByZXR1cm5zIChzdHJpbmcpIiwiZnVuY3Rpb24gc3ltYm9sKCkgdmlldyByZXR1cm5zIChzdHJpbmcpIl0=::W10=",
  "address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
}
```

### Deploying a contract

This contract may be used over the REST interface by passing the contract script, constructor parameters and network to the `smartbch/contract/deploy` endpoint.

```bash
curl -X POST https://rest-unstable.mainnet.cash/smartbch/contract/deploy \
  -H  "Content-Type: application/json" \
  -d '{
  "walletId": "privkey:regtest:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "script": "\n    // SPDX-License-Identifier: MIT\n    pragma solidity ^0.8.2;\n\n    import \"@openzeppelin/contracts/token/SEP20/SEP20.sol\";\n\n    contract MyToken is SEP20 {\n      constructor(string memory name, string memory symbol) SEP20(name, symbol) {\n        _mint(msg.sender, 10000);\n      }\n    }",
  "parameters": [
    "MyToken",
    "MTK"
  ],
  "overrides": {
    "gasPrice": 10000000000
  }
}'

```
Response:

The response is a serialized contract, (storing the network, raw script, and constructor parameters), as well as the deposit address for the contract.

```json
{
  "contractId": "smartbchcontract:regtest:0x904b57B6870be5528f398643fFAD655a7332D0Ee:Wy...iwiTVRLIl0=",
  "address": "0x904b57B6870be5528f398643fFAD655a7332D0Ee",
  "txId": "0xb029176d543a9850162434595d954acc38346f742007adf40e12ff48c9ba2d08",
  "receipt": {
    "to": "0x0000000000000000000000000000000000000000",
    "from": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
    ...
    "gasUsed": {
      "type": "BigNumber",
      "hex": "0x1309c0"
    },
    ...
    "blockNumber": 13420,
    "confirmations": 1,
  }
}
}
```

### Calling a contract function

Using with the `contractId` and a `walletId`, it is fairly straight-forward to call the contract function:

```bash
curl -X POST "https://rest-unstable.mainnet.cash/smartbch/contract/call" \
  -H  "Content-Type: application/json" \
'{
  "walletId": "privkey:regtest:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "contractId": "smartbchcontract:regtest:0x904b57B6870be5528f398643fFAD655a7332D0Ee:Wy...iwiTVRLIl0=",
  "function": "transfer",
  "arguments": [
    "0xbDDb9c288C0fF0803a9d56644464A00978ff7616",
    10000
  ],
  "overrides": {
    "gasPrice": 10000000000
  }
}'
```

Response:

```json
{
  "txId": "0x15aa9de7e3d0ec76a11feadf2ba803544ea22084c62c4c23078f7636cb5bd6b5",
  "receipt": {
    "to": "0xbDDb9c288C0fF0803a9d56644464A00978ff7616",
    "from": "0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
    ...
    "gasUsed": {
      "type": "BigNumber",
      "hex": "0x8fe0"
    },
    ...
    "blockNumber": 13168,
    "confirmations": 1,
  }
}
```

### Obtain contract information

If a contractId refers to a contract created by another party, or it's necessary for another party to confirm details of a contract, the contract information endpoint is available to return details of a contract, given a contractId.

Depending upon `contractId` creation (`create` or `deploy`) the information about contract script and constructor arguments may be unavailable (`create` method).

```bash
curl -X POST "https://rest-unstable.mainnet.cash/contract/info" \
   -H  "Content-Type: application/json" \
'{
  "contractId": "smartbchcontract:regtest:0x24CC5bb26a2c9F0e6428F155532878Be276CFf89:WyJj...CB9:WyJNeVRva2VuIiwiTVRLIl0=",

}'
```

This will return all the arguments to reconstruct or verify a contract.

```json
{
  "contractId": "contractId": "smartbchcontract:regtest:0x24CC5bb26a2c9F0e6428F155532878Be276CFf89:WyJj...CB9:WyJNeVRva2VuIiwiTVRLIl0=",
  "address": "0x24CC5bb26a2c9F0e6428F155532878Be276CFf89",
  "abi": [
    "constructor(string name, string symbol)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)",
    "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)"
  ],
  "script": "\n    // SPDX-License-Identifier: MIT\n    pragma solidity ^0.8.2;\n\n    import \"@openzeppelin/contracts/token/SEP20/SEP20.sol\";\n\n    contract MyToken is SEP20 {\n      constructor(string memory name, string memory symbol) SEP20(name, symbol) {\n        _mint(msg.sender, 10000);\n      }\n    }",
  "parameters": [
    "MyToken",
    "MTK"
  ]
}
```

### Estimate contract function fees

You can ask the network to estimate the gas amount of a certain contract function to be executed. Total fee is then `gasAmount * gasPrice`

```bash
curl -X POST "https://rest-unstable.mainnet.cash/smartbch/contract/estimate_gas" \
   -H  "Content-Type: application/json" \
'{
  "walletId": "privkey:regtest:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "contractId": "smartbchcontract:regtest:0x24CC5bb26a2c9F0e6428F155532878Be276CFf89:WyJj...CB9:WyJNeVRva2VuIiwiTVRLIl0=",
  "function": "transfer",
  "arguments": [
    "0x24CC5bb26a2c9F0e6428F155532878Be276CFf89",
    10000
  ],
  "overrides": {
    "gasPrice": 10000000000
  }
}'

Response:

```json
{
  "gas": {
    "type": "BigNumber",
    "hex": "0xde0c"
  }
}
```

Note, that non state-changing functions will return 0 as a result.

## Utilities

Certain tools common in bitcoin-like currencies may not be in a standard library.

### Currency conversions

Need to find out how many BCH are there currently in 1 USD, or find out how many satoshis are there in 100 USD? Easy!

```bash
curl -X POST https://rest-unstable.mainnet.cash/util/convert \
  -H "Content-Type: application/json" \
  -d '{
  "value": 100,
  "from": "usd",
  "to": "sat"
}'

```
returns something like:

```
...
28067024
...
```


## Signed Messages

One of the perks of having a wallet is the ability to sign message text or verify the signatures of other parties using their public key.

Full-nodes and SPV wallets often include this feature as standard. 

### Signing a message with a wallet

Let's try signing with an example from a common test case:

```bash
curl -X POST "https://rest-unstable.mainnet.cash/smartbch/wallet/signed/sign" \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d '{
  "walletId": "privkey:regtest:0x758c7be51a76a9b6bc6b3e1a90e5ff4cc27aa054b77b7acb6f4f08a219c1ce45",
  "message": "Chancellor on brink of second bailout for banks"
}'


```
Where the response is:
```json
{
  "signature": "0x60dc03b4f31f174f9c0577ea8140b6b13e57a0141fc27238a0c53971066fcb02511bc4aacbc8728c7f5c6cd3a9854960975968601c8381ee483580d1d57c1bd21c"
}
```

### Verifying a message with a wallet

To verify the above signature (without having access to the private key), by using a `watchOnly` wallet to represent the party in the example above.

```bash
curl -X POST "https://rest-unstable.mainnet.cash/wallet/signed/verify" \
-H  "accept: application/json"  \
-H  "Content-Type: application/json" \
-d '{
  "walletId": "watch:regtest:0xE25ddbAF8DD61b627727e03e190E32feddBD1319",
  "message": "Chancellor on brink of second bailout for banks",
  "signature": "0x60dc03b4f31f174f9c0577ea8140b6b13e57a0141fc27238a0c53971066fcb02511bc4aacbc8728c7f5c6cd3a9854960975968601c8381ee483580d1d57c1bd21c"
}'
```

where response is:

```json
{
  "valid": true
}
```

## RegTest wallets

See [reference](/tutorial/#regtest-wallets)

## Webhooks

Coming soon.

<!-- 
Webhooks are custom callbacks which notify user upon certain actions. Mainnet.cash provides the webhook functionality to monitor addresses and transactions.

You can register a webhook with the following `curl` call:

```bash
curl -X POST "https://rest-unstable.mainnet.cash/webhook/watch_address" \
  -H  "accept: application/json" \
  -H  "Content-Type: application/json" \
  -d '{
    "cashaddr": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
    "url": "http://example.com/webhook",
    "type": "transaction:in,out",
    "recurrence": "recurrent",
    "duration_sec": 86400
  }'
```

The endpoint you specify in the `url` parameter will be called with HTTP POST method and data with the webhook response. After the `duration_sec` seconds the registered webhook will expire and you stop receiving notifications.

Webhooks can be set up to fire once and expire if the `recurrence` parameter is set to `once` or continuously until they expire by the timeout.

We also support SLP-enabled webhooks to monitor token balance or token transactions. When using SLP webhooks you have to pass `tokenId` parameter. `cashaddr` param can be either cash address or SLP address, the necessary conversions will happen under the hood.

See full webhook REST documentation in the [Swagger UI](https://rest-unstable.mainnet.cash/api-docs/#/webhook/watchAddress).

When deploying your own mainnet.cash REST server you cat set webhook specific parameters like postgres `DATABASE_URL` or `WEBHOOK_EXPIRE_TIMEOUT_SECONDS`. See related documentation [here](https://github.com/mainnet-cash/mainnet-js/blob/master/generated/serve/docker/README.md). -->

## WebSocket API reference

Coming soon.

<!-- We provide some functionality over websockets where traditional REST servers would timeout. Examples are waiting for transactions and watching balances.
Websockets allow to subscribe to server events, sending responses and notifications asynchronously.

Check out the jsfiddle [demo](https://jsfiddle.net/ahq6eyd3/1/)

The client-server communication is in JSON format.

Server expects the messages in the following form:
```json
{
  method: "methodName",
  data: {
    dataMember: "dataValue"
  }
}
```

Responses are JSON objects, depending on the method invoked. If an error is encountered the response will contain the error message:
```json
{
  "error": "Mainnet websockets: unsupported method watchBirds"
}
```

### Supported methods
#### watchBalance

Receive notification upon the address' balance change. Responds recurrently.
Request:
```json
{
  method: "watchBalance",
  data: {
    cashaddr: "bitcoincash:qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3"
  }
}
```

Response:
```json
{
  bch: 0.00009383,
  sat: 9383,
  usd: 0.029358468699999998
}
```

#### waitForBalance

Waits for the address balance to reach the minimum target value.

```json
{
  method: "waitForBalance",
  data: {
    cashaddr: "bitcoincash:qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3",
    value: 1000,
    unit: "satoshi"
  }
}
```

Response: actual balance of the address in the units you specified.
```json
{
  balance: 1200
}
```

#### waitForTransaction

Waits for the next transaction of the address. Responds once.
```json
{
  method: "waitForTransaction",
  data: {
    cashaddr: "bitcoincash:qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3",
    options: {
      getTransactionInfo: true,
      getBalance: false,
      txHash: undefined
    }
  }
}
```

If `txHash` is supplied method will wait for a transaction with this exact hash to be propagated through and registered in the network by the Fulcrum indexer, otherwise any address transaction will trigger a response.

Response: Object {transactionInfo: any, balance: any} depending on the options supplied.

`transactionInfo` Raw transaction in verbose format as per [specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-transaction-get)
```json
{
  hash: '0f617203d936386c4ed6a828f911e577394cd753b652745d5207fbb139c0d924',
  hex: '02000000011f6f174a63236d4d32e256dbf92b86ee5fc37fdd11b9ce82ad1950bf2e799f2100000000644124778cbd7e22a2e4ddbc06901205f3c818a380945c696d012aae47dee8dd1fdfe7edfda93d165ceaa53501690d268d1acae405c7e635e864be71bbc8e6264f1a412103410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a70000000002e8030000000000001976a91446df42ac56b164b81f36a93210a04a30293659aa88ac3ced052a010000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac00000000',
  locktime: 0,
  size: 219,
  txid: '0f617203d936386c4ed6a828f911e577394cd753b652745d5207fbb139c0d924',
  version: 2,
  vin: [
    {
      scriptSig: [Object],
      sequence: 0,
      txid: '219f792ebf5019ad82ceb911dd7fc35fee862bf9db56e2324d6d23634a176f1f',
      vout: 0
    }
  ],
  vout: [
    { n: 0, scriptPubKey: [Object], value: 0.00001 },
    { n: 1, scriptPubKey: [Object], value: 49.9999878 }
  ]
}
```

`balance`: balance response object as per `getBalance` request.

#### waitForBlock

Waits for the next block or for the blockchain to reach a certain height.
```json
{
  method: "waitForBlock",
  data: {}
}
```

```json
{
  method: "waitForBlock",
  data: {
    height: 770000
  }
}
```

Response: Block header as per [specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-headers-subscribe)
```json
{
  height: 770000,
  hex: "000000209107e04f2eee18fa36c70f00cdb8a9e35c669a7d5ada13c945a130db2389bc116cc61e2d285d78c5a8b62e6df23037c9fbfea2b58df6e649c0a1e7d7a8f94393fe760c60ffff7f2000000000"
}
```

#### slpWatchBalance

Receive notification upon the address' SLP balance change. Responds recurrently.

If `tokenId` is supplied, the response will be narrowed down to only this token.

Request:
```json
{
  method: "slpWatchBalance",
  data: {
    cashaddr: "simpleledger:qzxzl07tth5qx4shphrpzz38wnstwac5ksvgnp3ya0",
    tokenId: "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

Response:
```json
{
  value: "10000",
  ticker: "MNC",
  name: "Mainnet coin"
  tokenId: "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}
```

#### slpWaitForBalance

Wait for the SLP wallet to reach a certain minimal token balance. Returns actual wallet balance. Responds once.

Request:
```json
{
  method: "slpWaitForBalance",
  data: {
    cashaddr: "simpleledger:qzxzl07tth5qx4shphrpzz38wnstwac5ksvgnp3ya0",
    value: "1000",
    tokenId: "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

Response:
```json
{
  value: "10000",
  ticker: "MNC",
  name: "Mainnet coin"
  tokenId: "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}
```

#### slpWaitForTransaction

Wait for the next SLP transaction to happen. Responds once.

If `tokenId` is supplied, the response will arrive only for the transactions with this tokenId.

```json
{
  method: "slpWaitForTransaction",
  data: {
    cashaddr: "simpleledger:qzxzl07tth5qx4shphrpzz38wnstwac5ksvgnp3ya0",
    tokenId: "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

Response follows this [schema](https://slp.dev/tooling/slpdb/#mongodb-collections-data-schema) -->
