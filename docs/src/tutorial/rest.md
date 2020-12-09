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
to do the REST calls manually, see [here](/tutorial/other_langs.html). You can generate bindings for nearly 
every other programming language easily.

**You can find the full latest REST API reference at [https://rest-unstable.mainnet.cash/api-docs/](https://rest-unstable.mainnet.cash/api-docs/).**

Let's first create a test wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type":"wif","network":"testnet"}'
```

::: tip rest-unstable

This tutorial shows calls to `https://rest-unstable.mainnet.cash`, which as the name implies is **unstable** by design.
You can use it to learn, but for production you are expected to [run your own service](/tutorial/rest.md), because 
otherwise you actually send us your _private keys_, which is absolutely insecure.

:::

Response:

```json
{
  "cashaddr": "bchtest:qzlvqad8gappn6r3sceq65n9r9x8fq7phccsdtn8gm",
  "walletId": "wif:testnet:cPbT8t2hDS2ZianEQJ3tdeHzH7ebphmv4kYMxNVLAgJSCGSRnqYa",
  "network": "testnet"
}
```

This creates a **TestNet** wallet.  This has the cashaddress of the wallet, where you can send money, and the `walletId`. 
Note the `walletId` - we're going to need it later. This wallet will not be persisted. See below for persistent wallets. 

::: danger walletId contains the private key

Keep `walletId` a secret as it contains the private key that allows spending from this wallet.

:::

::: tip What is TestNet? Where to get TestNet money and a wallet?

`TestNet` is where you test your application. TestNet money has no price. Opposite of TestNet is `MainNet`, 
which is what people usually mean when they talk about Bitcoin Cash network.  You can get free TestNet money [here](https://faucet.fullstack.cash/).
If you need a wallet that supports the TestNet, download [Electron Cash](https://electroncash.org/) and 
run it using `electron-cash --testnet` flag. For example, on MacOS that would be:

`/Applications/Electron-Cash.app/Contents/MacOS/Electron-Cash --testnet`


:::

To create a MainNet wallet (Bitcoin Cash production network): 

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type":"wif","network":"mainnet"}'
```

If you want to create a wallet (walletId) from a WIF (a private key), just build a string like this:

```bash
wif:mainnet:PrivateKeyWifHere
```

## Named wallets (persistent)

Named wallets are used to save the private key inside the REST API server, so that you 
can refer to it by name and always get the same wallet.

To create a persistent wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type":"wif","network":"testnet","name":"wallet_1"}'
```

Response:

```json
{
  "name":"wallet_1",
  "cashaddr":"bchtest:qrj8ryftxwjhtv43v7an0svv3tqrqa48t5z2ynkfqw",
  "walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB", 
  "network":"testnet"
}
```
BUG TOFIX: `walletId` should be something like `named:testnet:wallet_1` in this case. 

The wallet's private key will be stored in the PostgreSQL database of the REST API server. 

Note that `rest-unstable.mainnet.cash` will not allow you to store mainnet private keys, 
you need to [run your own service](/tutorial/rest.md) for that. We really don't want to store your private keys! 

## Getting the balance

To get the balance of your wallet you can do this (use the `walletId` that you got previously):

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"
  }'
```

Response:

```json
{"bch":0,"sat":0,"usd":0}
```

Or you can use `unit` in the call to get just the number:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
  -H "Content-Type: application/json" \
  -d '{
    "walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB", 
    "unit": "sat"
  }'
```

Response:

```
0
```

You can ask for `usd`, `sat`, `bch` (or `satoshi`, `satoshis`, `sats` - just in case you forget the exact name).

- 1 satoshi = 0.000 000 01 Bitcoin Cash
- 1 Bitcoin Cash = 100,000,000 satoshis

`USD` returns the amount at the current exchange rate. 

## Sending money

Let's create another wallet and send some of our money there. 

Remember, that first you need to send some satoshis to the cashaddr of your original wallet (see the TestNet note above).

Check that the balance is there in the original wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
-H "Content-Type: application/json" \
-d '{"walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"}'
```

```json
{"bch":0.0001,"sat":10000,"usd":0.026558}
```

Now we can send 100 satoshis it to `...z2pu` address

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

Note that you can send to many addresses at once.

Response:

```json
{
  "txId":"316f923a1f4c47ac6562779fe6870943eec4f98a622a931f2cc1acd0790ebd69",
  "balance":{"bch":0.0000968,"sat":9680,"usd":0.025755576}
}
```

You get the transaction ID (txid) that [you can see on the TestNet block explorer](https://explorer.bitcoin.com/tbch/tx/316f923a1f4c47ac6562779fe6870943eec4f98a622a931f2cc1acd0790ebd69)
and the balance left in the original wallet.

Let's print the balance of `...z2pu` wallet:

```bash
{"bch":0.000001,"sat":100,"usd":0.00026607}
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

This will send the maximum amount (minus the transaction fees of 1 satoshi per byte).

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

## Escrow contracts

::: warning 
Not fully tested yet
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
    "buyerAddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
    "arbiterAddr": "bchtest:qpsm4nm7talhxhl05mlhms3ys43u76rn0ttdv3qg2u",
    "sellerAddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
  }'
```

Response:

```
CashAddress decoding error: please review the address for errors.

Should be:
{
  "contractId": "....",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}
```

TODO: Yes, this doesn't work yet.

The `contractId` has all the data needed about the contract (but it's pretty big). Store it in your database, so
that you can execute all the necessary functions later.

You can now send money to the contract (just use the `cashaddr` from the response) and check the balance of the contract.

Note: Escrow contract is big (in bytes) and requires a big fee, so the minimum what you can send to it is about 3700 satoshis. 

TODO: a function to convert satoshis to USD and vice versa - that's coming

Now, we can execute the necessary functions:

1) Buyer releases the funds
```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/call \
  -H "Content-Type: application/json" \
  -d '{
    "contractId": "....",
    "walletId": "wif:testnet:....",
    "action": "spend"
  }`
```

You can optionally provide `"getHexOnly": true` flag if you want to get the raw transaction to broadcast later, otherwise the
transaction will be broadcast immediately. You can also specify the exact UTXO IDs to spend 
(you can use [utxos call](https://rest-unstable.mainnet.cash/api-docs/#/contract/escrowUtxos) to list them):

```
...
"utxoIds": [ 
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0" 
]
...
```


2) Seller refunds
```bash
```bash
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/call \
  -H "Content-Type: application/json" \
  -d '{
    "contractId": "....",
    "walletId": "wif:testnet:....",
    "action": "refund"
  }`
```
```

3) Arbiter releases the funds or refunds 

(the same: spend or refund, just relace the walletId with the arbiter's one)

## CashScript

Somewhat done, but not yet documented...

## RegTest wallets

TODO: How to run the local development environment

RegTest (local development) wallets, use this:

::: tip What is RegTest?

You might also hear about `RegTest` mode, which is when you run your Bitcoin Cash node 
locally and you can get as many test coins as you need, but they exist on your machine only. 
RegTest wallets are supported by mainnet library.

:::

```bash
TODO
```

To be continued...
