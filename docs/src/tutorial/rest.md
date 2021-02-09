# Via the REST API

::: danger

Note: This site is work-in-progress and the mainnet library is currently in a prototype stage. 
Things may and will change randomly. There is no backward compatibility guarantee yet, 
even though we try not to break things too often. Use at your own risk. To see the old site with the full plan 
(yet to be implemented), go [here](https://web.archive.org/web/20200810182937/https://mainnet.cash/).

:::

## Let's get programming

Note that this tutorial describes calling the REST API approach (for server-side programming languages, like PHP, Go, Java). 
Alternatively, see [JavaScript (browser)](/tutorial/). 

We generate bindings and packages for some programming languages, so that you don't have
to do the REST calls manually, see [here](/tutorial/other-languages.html). You can generate bindings for nearly 
every other programming language easily.

**You can find the full latest REST API reference at [https://rest-unstable.mainnet.cash/api-docs/](https://rest-unstable.mainnet.cash/api-docs/).**

Let's first create a test wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "testnet"}'
```

Response:

```json
{
  "name": "",
  "cashaddr": "bchtest:qrau3n8tzcv2a4yqsr603unhxx4vp9ph0yg2g9449d",
  "walletId": "seed:testnet:table later ... stove kitten pluck:m/44'/0'/0'/0/0",
  "network": "testnet"
}
```

This creates a **TestNet** wallet.  This has the cashaddress of the wallet, where you can send money, and the `walletId`. 
Note the `walletId` - we're going to need it later. This wallet will not be persisted. See below for persistent wallets. 

::: tip rest-unstable

This tutorial shows calls to `https://rest-unstable.mainnet.cash`, which as the name implies is **unstable** by design.
You can use it to learn, but for production you are expected to [run your own service](/tutorial/running-rest.md), because
otherwise you actually send us your _private keys_, which is absolutely insecure.

:::

::: danger walletId contains the private key

Keep `walletId` a secret as it contains the private key that allows spending from this wallet. Seed phrase, WIF - all
these contain the private key. 

:::

::: tip What is TestNet? Where to get TestNet money and a wallet?

`TestNet` is where you test your application. TestNet money has no price. Opposite of TestNet is `MainNet`, 
which is what people usually mean when they talk about Bitcoin Cash network.  

You can get free TestNet money [here](https://faucet.fullstack.cash/).


If you need a wallet that supports the TestNet, download [Electron Cash](https://electroncash.org/) and 
run it using `electron-cash --testnet` flag. For example, on MacOS that would be:

`/Applications/Electron-Cash.app/Contents/MacOS/Electron-Cash --testnet`


:::

To create a MainNet wallet (Bitcoin Cash production network): 

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type": "seed", "network": "mainnet"}'
```

Response:

```json
{
  "name": "",
  "cashaddr": "bitcoincash:qr70hzy3sfmrcknd7apksmxhhf48cwkuavckm7lt8f",
  "walletId": "seed:mainnet:cave blue ... skill shoot faculty:m/44'/0'/0'/0/0",
  "network": "mainnet"
}
```

Seed phrase wallets use the derivation path `m/44'/0'/0'/0/0` by default (Bitcoin.com wallet compatibility)

If you want to manually construct a walletId from a WIF (a private key), just build a string like this:

```
wif:mainnet:WIFHERE
```

Similarly, from a seed and a derivation path:

```
seed:mainnet:SEED WORDS HERE:m/DERIVATION/PATH
```

Networks: `mainnet`, `testnet`, `regtest` ([see below](#regtest-wallets))

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
  "cashaddr": "bchtest:qp3wsgxkeezy3rumwzja0yxlmgra2jt74ymtrmayyl",
  "walletId": "named:testnet:wallet_1",
  "seed": {
    "seed": "parade vocal foil key orchard pact mansion arena bounce caught perfect true",
    "derivationPath": "m/44'/1'/0'/0/0"
  },
  "network": "testnet"
}
```

The wallet's private key will be stored in the PostgreSQL database of the REST API server. 

Note that `rest-unstable.mainnet.cash` will not allow you to store mainnet private keys, 
you need to [run your own service](/tutorial/rest.md) for that. We really don't want to store your private keys! 

## Getting the balance

To get the balance of your wallet you can do this (use the `walletId` that you got previously):

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "named:testnet:wallet_1"
  }'
```

Response:

```json
{"bch": 0, "sat": 0, "usd": 0}
```

Or you can use `unit` in the call to get just the number:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "named:testnet:wallet_1", 
    "unit": "sat"
  }'
```

Response:

```
0
```

You can ask for `usd`, `sat`, `bch` (or `satoshi`, `satoshis`, `sats` - just in case you forget the exact name).

- 1 satoshi = 0.00000001 Bitcoin Cash (1/100,000,000th)
- 1 Bitcoin Cash = 100,000,000 satoshis

`USD` returns the amount at the current exchange rate. 


### Watch-only wallets

You can find out a balance of any cashaddr (say `bchtest:qq1234567`) by building a `walletId` like this:

```
watch:testnet:bchtest:qq1234567
```

...and then doing the regular `wallet/balance` query.

## Sending money

Let's create another wallet and send some of our money there. 

Remember, that first you need to send some satoshis to the cashaddr of your original wallet (see the TestNet note above).

Check that the balance is there in the original wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
-H "Content-Type: application/json" \
-d '{"walletId": "wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"}'
```

```json
{"bch": 0.000100000, "sat": 10000, "usd": 0.02}
```

Now, we can send 100 satoshis to the `...z2pu` address

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/send \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB",
    "to": [
      {
        "cashaddr": "bchtest:qz73ul3zy8mvpjt4upw64n58t8gt2ru735qn0dz2pu",
        "value": 100,
        "unit": "sat"
      }
    ]
  }'
```

Note that you can send to many addresses at once. It is also possible to specify which unspent outputs are used to send funds from by specifying a list of `utxoIds` in `options`.

Response:

```json
{
  "txId": "316f923a1f4c47ac6562779fe6870943eec4f98a622a931f2cc1acd0790ebd69",
  "balance": {"bch": 0.00009680, "sat": 9680, "usd": 0.02}
}
```

You get the transaction ID (txid) that [you can see on the TestNet block explorer](https://explorer.bitcoin.com/tbch/tx/316f923a1f4c47ac6562779fe6870943eec4f98a622a931f2cc1acd0790ebd69)
and the balance left in the original wallet.

Let's print the balance of `...z2pu` wallet:

```bash
{"bch": 0.00000100, "sat": 100, "usd": 0.00}
```

Great! You've just made your first transaction!

Now you can send all of your money somewhere else:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/send_max \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB",
    "cashaddr": "bchtest:qz73ul3zy8mvpjt4upw64n58t8gt2ru735qn0dz2pu"
  }'
```

This will send the maximum amount (minus the transaction fees of 1 satoshi per byte, there are usually 200-300 bytes per transaction).

## Waiting for a transaction

### QR codes

Let's say you want to display a QR code for you user to pay you money and show an alert when money arrives?

Let's display a QR code:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/deposit_qr \
  -H "Content-Type: application/json" \
  -d '{
    "walletId": "wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"
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

### Waiting

Currently, the only way to wait for a tx is to poll the balance (this will improve later)

## Simple Ledger Protocol (SLP)

We currently fully support the SLP type 1 tokens [specification](https://slp.dev/specs/slp-token-type-1/)

The interfaces were designed to be largely similar to those of BCH wallets.

SLP methods can use the `walletId` created in `wallet/create` calls.

Rest server uses strings for the SLP amounts in order not to lose precision or have floating point issues

### Token creation - Genesis

To create your own token you should prepare and broadcast a special genesis transaction containing all the information about the token being created: token name, ticker, decimals - number of significant digits after comma, initial token amount, url you want to associate with token. Some of these properties are optional.

With the `endBaton` parameter you can decide to keep the possibility of additional token creation, which is governed by so called minting baton or immediately discard this baton to make the token circulation amount to be fixed.

The transaction id in which the token is created will become its permanent and unique identifier.

Note, that there might be many tokens with the same name. Remember, that only 64 character long string-ids do identify your token uniquely und unambiguously.

In the following example 10000.00 MNC tokens will be created.

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/genesis \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "name": "Mainnet coin",
  "ticker": "MNC",
  "initialAmount": "10000",
  "decimals": 2,
  "documentUrl": "https://mainnet.cash",
  "documentHash": "db4451f11eda33950670aaf59e704da90117ff7057283b032cfaec7779313916",
  "endBaton": false
}'
```

Response:

```json
{
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15",
  "balances": {
    "value": "10000",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

### Looking up token information

If you want to get the genesis information of some token, you can simply call getTokenInfo:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/token_info \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}'
```

Response:

```json
{
  "name": "Mainnet coin",
  "ticker": "MNC",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15",
  "initialAmount": "10000",
  "decimals": 2,
  "documentUrl": "https://mainnet.cash",
  "documentHash": "db4451f11eda33950670aaf59e704da90117ff7057283b032cfaec7779313916"
}
```


### Additional token creation - Minting

If you decide to increase the token circulation supply, you would need to `mint` more tokens. You are required to have the ownership of the minting baton to do so. Similarly to genesis, you can keep the baton or discard it.

In the following example we issue 50 more tokens we just created in genesis:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/mint \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "value": "10000",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15",
  "endBaton": false
}'
```

Response:

```json
{
  "txId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15",
  "balances": {
    "value": "20000",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

### Sending tokens

Sending tokens around is easy and is very similar to sending BCH. You can include many send requests in one call too!

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/send \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "to": [
    {
      "slpaddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
      "value": 100,
      "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    }
  ]
}'
```

Response:

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "value": "19900",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

Or you can send all tokens available with a simple sendMax method

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/send_max \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "slpaddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}'
```

Response:

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "value": "0",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
}
```

Note, you can not send several different tokens in one go.


### Token balances

You can get all token balances of your wallet or a balance of a specific token with the following methods:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/balance \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}'
```

Response:

```json
{
  "value": "1000",
  "ticker": "MNC",
  "name": "Mainnet coin",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}
```

All balances:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/all_balances \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}'
```

Response:

```json
[
  {
    "value": "1000",
    "ticker": "MNC",
    "name": "Mainnet coin",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
]
```

### SLP address UTXOs

If you want to get the information about SLP UTXOs of an address, look up the locked satoshi values, etc., you can do the following call:

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/utxo \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}'
```

Response:

```json
[
  {
    "index": 0,
    "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 546,
    "utxoId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0",
    "value": "10000",
    "decimals": 2,
    "ticker": "MNC",
    "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
  }
]
```

### SLP deposit address

You can get the token deposit address in cashaddress format: `simpleledger:qq...`, `slptest:qq...` or `slpreg:qq...` for MainNet, TestNet and RegTest networks, respectively

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/deposit_address \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}'
```

Response:

```json
{
  "slpaddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866"
}
```

### SLP deposit QR code

You can get the deposit address embedded in a QR code image. The response is ready to be used in HTML `src`, `title` and `alt` attributes of an `img` node.

```shell script
curl -X POST https://rest-unstable.mainnet.cash/wallet/slp/deposit_qr \
  -H "Content-Type: application/json" \
  -d '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}'
```

Response:

```json
{
  "src": "data:image/svg+xml;base64,PD94bWwgdm... ==**",
  "title": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "alt": "A Bitcoin Cash Simple Ledger Protocol QR Code"
}
```

## TestNet faucet

You can have some TestNet satoshi or SLP tokens for your convenience. Visit our ~~faucet~~ refilling station at [https://rest-unstable.mainnet.cash/faucet.html](https://rest-unstable.mainnet.cash/faucet.html)

Your address will be refilled up to 10000 TestNet satoshi or up to 10 SLP tokens upon a call. There are request rate limiters set up to prevent abuse.

We've integrated the faucet into the library so that you can do easy calls like the following.

### Get TestNet satoshis

```shell script
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_testnet_bch \
  -H "Content-Type: application/json" \
  -d '{
  "cashaddr": "bchtest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq27mxesg8"
}'
```

Response:

```json
{
  "txId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}
```

### Get TestNet SLP tokens

```shell script
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_testnet_slp \
  -H "Content-Type: application/json" \
  -d '{
  "slpaddr": "slptest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq32uar866",
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}'
```

Response:

```json
{
  "txId": "dc38ee5d4233163e69144e4ec6e49257d41f5605e297d05c0af8f1d81ae1a387"
}
```

## Escrow contracts

::: warning 
Alpha release
:::

Ok, let's now assume that you are building a service where you want to connect a buyer and a seller (a freelance marketplace 
or a non-custodial exchange), but at the same time you don't want to hold anyone's money, 
but only act as an arbiter in case something goes wrong. It's possible in Bitcoin Cash and it's called "an escrow contract".

You'll need three addresses for this: `buyer`, `seller` and `arbiter`. 

Note: The source for the contract is [here](https://github.com/mainnet-cash/mainnet-js/blob/a35c3ff9590eb04e03b122d7bb2d4bbb12150d66/src/contract/escrow/EscrowContract.ts#L98-L118). 

1) Buyer sends the money to the contract and could then release the money to the seller 
2) The seller could refund the buyer
3) Arbiter can either complete the transaction to the seller or refund to the buyer, but cannot steal the money 

```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/create \
  -H "Content-Type: application/json" \
  -d '{
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000
}'
```

Response:

```json
{
  "contractId": "testnet␝MTU4LDI0MCwyMTYsMTkxLDc2LDMxLDk4LDE2NiwxNDAsNzYsMTAwLDEyMywyMzUsNjQsNzgsMTkzLDIxMiw4OCwyNDMsMTk3␞MjMxLDI1NCwxMTMsMjUsMTY2LDE4NywxMTUsNjQsMTU0LDgsMTI2LDEwLDE5NiwxMDgsMjM5LDE3MywxNjgsMjEsMTgyLDE1OQ==␞MTYwLDI4LDE3LDE5OCwyMjIsMjM0LDE0NCw5MywzNywxODAsMTM1LDEwNSwxNDMsMTcsNjQsMjI0LDE5Nyw1MSwxNTAsMjAw␞MTAwMDA=␞ODA4␝cHJhZ21hIGNhc2hzY3JpcHQgXjAuNS4zOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg",
  "cashaddr": "bchtest:pz77d0jkycc6kfrv5cdvxg5afd8qnlj495tfqt60hs"
}
```

The `contractId` has all the data needed about the contract (but it's pretty big). Store it in your database, so
that you can execute all the necessary functions later.

You can now send money to the contract (just use the `cashaddr` from the response) and check the balance of the contract.

Note: Escrow contract is big (in bytes) and requires a big fee, so the minimum that you can send to it is about 3700 satoshis. 

Now, we can execute the necessary functions:

1) Buyer releases the funds
```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/call \
  -H "Content-Type: application/json" \
  -d '{
    "contractId": "....",
    "walletId": "seed:testnet:....",
    "function": "spend"
  }'
```

By *default* the above command will build and transmit the transaction.  To **only** build the transaction hex, (without transmitting) and inspect the hex or transmit the hex manually, simply pass `"action": "build"` and the hex will be returned on the `"hex"` field.  In addition, to inspect the contract in the Bitcoin Script debugger, as a `meep` action may be passed, `"action": "meep"`.

You can also specify the exact UTXO IDs to spend 
(you can use [utxos call](https://rest-unstable.mainnet.cash/api-docs/#/contract/escrowUtxos) to list them):

```
...
"utxoIds": [ 
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0" 
]
...
```


1) Seller refunds
```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/call \
  -H "Content-Type: application/json" \
  -d '{
      "contractId": "....",
      "walletId": "seed:testnet:....",
      "function": "refund"
    }'
```

3) Arbiter releases the funds or refunds 

(the same: spend or refund, just replace the walletId with the arbiter's one)

## Generic CashScript

::: warning 
Alpha release
:::

::: tip What is CashScript?

*From CashScript.org:*

[CashScript](https://cashscript.org/) is a high-level programming language for smart contracts on Bitcoin Cash. It offers a strong abstraction layer over Bitcoin Cash' native virtual machine, Bitcoin Script. Its syntax is based on Ethereum's smart contract language Solidity, but its functionality is very different since smart contracts on Bitcoin Cash differ greatly from smart contracts on Ethereum. For a detailed comparison of them, refer to the blog post [Smart Contracts on Ethereum, Bitcoin and Bitcoin Cash](https://kalis.me/smart-contracts-eth-btc-bch/). 


:::

In the `EscrowContract` example in the previous section, the contract source is hardcoded. But with a generic `Contract`, the full script is defined by the user.

`Contracts` are objects that simply wrap a CashScript Contract, with utilities to serialize and deserialize them. In addition, there are some functions on wallets to facilitate sending arguments to the contract.

For example, taking a simple pay with timeout example from the [CashScript playground](https://playground.cashscript.org/):


```solidity
pragma cashscript ^0.5.0;

contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {
    // Require recipient's signature to match
    function transfer(sig recipientSig) {
        require(checkSig(recipientSig, recipient));
    }

    // Require timeout time to be reached and sender's signature to match
    function timeout(sig senderSig) {
        require(checkSig(senderSig, sender));
        require(tx.time >= timeout);
    }
}
```

This contract may be used over the REST interface by passing the contract script, parameters and network to the `contract/create` endpoint.

::: tip 
All byte arguments to the constructor or function should be passed as hexidecimal. Byte arguments can only be passed as Uint8Arrays with the native javascript.
:::

```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/create \
  -H  "Content-Type: application/json" \
  -d '{
  "network": "testnet",
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ]
}'

```
Response:

The response is a serialized contract, (storing the network, raw script, and constructor parameters), as well as the deposit cashaddr for the contract.

```json
{
  "contractId": "testnet:TURNME1UQmxaakEwT0dJelpHRXpOVEUzT1RObU5tVmtNVFJqWXpKbVpHVTBOakJpWldOak5XSTJOVGhrT1RFek9EUTBNMkk1WVRNd01EQTNNRGRoTm1FMzpNRE0wT1RjNFlXTTBOalJtTXpVNFlqSXpOV1l4TVRJeE1tVmlObVV3TVRkaFpqa3dNakUxWWprd1lqRm1aamMwTnpGa09XRmxNbUZpWWpWbE1Ea3lOak5pOk1qRTE=:Y29udHJhY3QgVHJhbnNmZXJXaXRoVGltZW91dChwdWJrZXkgc2VuZGVyLCBwdWJrZXkgcmVjaXBpZW50LCBpbnQgdGltZW91dCkgewogICAgZnVuY3Rpb24gdHJhbnNmZXIoc2lnIHJlY2lwaWVudFNpZykgewogICAgICAgIHJlcXVpcmUoY2hlY2tTaWcocmVjaXBpZW50U2lnLCByZWNpcGllbnQpKTsKICAgIH0KCiAgICBmdW5jdGlvbiB0aW1lb3V0KHNpZyBzZW5kZXJTaWcpIHsKICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHNlbmRlclNpZywgc2VuZGVyKSk7CiAgICAgICAgcmVxdWlyZSh0eC50aW1lID49IHRpbWVvdXQpOwogICAgfQp9Cg==:310978053",
  "cashaddr": "bchtest:pz29r0fy4q50ctszguqlze9e9cxh3etdqqnpdn4eg5"
}
```

Now with the `contractId`, it is fairly straight-forward to call the function in CashScript:

```bash
curl -X POST "https://rest-unstable.mainnet.cash/contract/call" \
  -H  "Content-Type: application/json" \
'{
  "contractId": "testnet:TU ... qRTE=:Y29udHJhY3... Qp9Cg==:310978053",
  "function": "transfer",
  "arguments": [
    "wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"
  ],
  "to": {
    "cashaddr":"bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0", 
    "value":100,
    "unit":"sat"
    }
}'
```
The above call is a simple example with minimum required arguments:

- The `function` is the method on the contract to call. 
- In this case, the argument is a keypair signature (`sig`), so the **walletId** is passed to generate the CashScript SignatureTemplate server-side.
- Finally, a transaction output is required, and the argument was passed in mainnet-js send format, but CashScript (`to`/`amount`) format is also accepted, as well as lists of either format.
- The `action` is the CashScript method to perform (`build`, `meep`, or the default `send`)

If a contract calls for public key hashes as input, this may be derived by creating a watch only wallet and using the `wallet/info` endpoint to obtain any available data about a wallet as hex.

Full access to the CashScript SDK (opReturn, fees, change, age, time) is documented further in [the full specification](https://rest-unstable.mainnet.cash/api-docs/#/contract/call).

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

## RegTest wallets

During the local development and testing, you might not want to use TestNet coins, so you can use so-called "RegTest wallets".

::: tip What is RegTest?

`RegTest` is a mode, in which you can run your Bitcoin Cash node locally, and you can get as many test coins as you need,
but they exist on your machine only. RegTest wallets are supported by the mainnet library.

:::

A full Bitcoin node, an Electrum server and open Postgres server configuration is available for testing in a
Docker Compose file at `jest/regtest-docker-compose.yml`

It can be brought up with:

```bash
./jest/docker/start.sh 
```

To stop it:

```bash
./jest/docker/stop.sh
```

The Electrum server (Fulcrum) is available at `ws://127.0.0.1:60003` on your local machine.  
The regtest BCHN node is on port `18443` available with RPC using credentials in `.env.regtest`.
An open Postgres server is also available on port `15432`

To use this wallet from your code, just use `network`: `RegTest` in your calls.

## Webhooks

Webhooks are custom callbacks which notify user upon certain actions. Mainnet provides the webhook functionality to monitor addresses and transactions.

You can register a webhook with the following `curl` call:

```bash
curl -X POST "https://rest-unstable.mainnet.cash/webhook/watch_address" \
  -H  "accept: application/json"
  -H  "Content-Type: application/json"
  -d '{
    "cashaddr":"bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
    "url":"http://example.com/webhook",
    "type":"transaction:in,out",
    "recurrence":"recurrent",
    "duration_sec":86400
  }'
```

The endpoint you specify in the `url` parameter will be called with HTTP POST method and data with the webhook response. After the `duration_sec` seconds the registered webhook will expire and you stop receiving notifications.

Webhooks can be set up to fire once and expire if the `recurrence` parameter is set to `once` or continuously until they expire by the timeout.

See full webhook REST documentation in the [Swagger UI](https://rest-unstable.mainnet.cash/api-docs/#/webhook/watchAddress)

## WebSocket API reference

We provide some functionality over websockets where traditional REST servers would timeout. Examples are waiting for transactions and watching balances.
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
    cashaddr: "bitcoincash:qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3"
  }
}
```

Response: Raw transaction in verbose format as per [specification](https://electrum-cash-protocol.readthedocs.io/en/latest/protocol-methods.html#blockchain-transaction-get)
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

#### waitForBlock

Waits for the next next block or for the blockchain to reach a certain height.
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

Response follows this [schema](https://slp.dev/tooling/slpdb/#mongodb-collections-data-schema)
