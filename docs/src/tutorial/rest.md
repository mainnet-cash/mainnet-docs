# Via the REST API

::: danger

Note: This site is work-in-progress and the mainnet library is currently in a prototype stage. 
Things may and will change randomly. There is no backward compatibility guarantee yet, 
even though we try not to break things too often. Use at your own risk. To see the old site with the full plan 
(yet to be implemented), go [here](https://web.archive.org/web/20200810182937/https://mainnet.cash/).

:::

## Let's get programming

Note that this tutorial describes calling the REST API approach. See [JavaScript](/tutorial/) or [Other programming languages](/tutorial/other_langs.html) for other approaches.

TODO: rest-unstable warning

Let's first create a test wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type":"wif","network":"testnet"}'
```

Response:

```json
{
  "name": "",
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

If you want to create a wallet from a WIF (private key), just build a string like this:

```bash
wif:mainnet:privatekey
```

## Named wallets (persistent)

Named wallets are used to saved the private key inside the REST API servser, so that you 
can refer to it by name later and always get the same wallet back.

The wallet's private key will be stored in the PostgreSQL database of the REST API server (note that `rest-unstable.mainnet.cash` 
will not allow you to store mainnet private keys, you need to [run your own server](/tutorial/rest.md) for that) 

To create a persistent wallet:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
    -H "Content-Type: application/json" \
    -d '{"type":"wif","network":"testnet","name":"wallet_1"}'
```

Response:

```shell script
{
  "name":"wallet_1",
  "cashaddr":"bchtest:qrj8ryftxwjhtv43v7an0svv3tqrqa48t5z2ynkfqw",
  "walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB", 
  "network":"testnet"
}
```

BUG TOFIX: `walletId` should be something like `named:testnet:wallet_1` in this case. 

## Getting the balance

To get the balance of the wallet you can do this:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
    -H "Content-Type: application/json" \
    -d '{"walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB"}'
```

Response:

```
{"bch":0,"sat":0,"usd":0}
```

Or you can use `unit` in the call to get just the number:

```bash
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
    -H "Content-Type: application/json" \
    -d '{"walletId":"wif:testnet:cRqxZECspKgkuBbdCnnWrRsMsYLUeTWULYRRW3VgHKedSMbM6SXB", "unit": "sat"}'
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

Let's create another wallet and send some of our money there:

```bash
TODO
```

Note that you can send to many addresses at once.

Let's print the balance of the seller's wallet:

```bash
TODO
```

Great! You've just made your first transaction!

Now you can send all of your money somewhere else:

```bash
TODO
```

## Waiting for a transaction

### QR codes

Let's say you want to display a QR code for you user to pay you money and show an alert when money arrives?

Let's display a QR code first. Create a placeholder first:

```html
<p style="text-align: center;">
    <img src="https://cdn.mainnet.cash/wait.svg" style="width: 15em;" id="deposit">
</p>
```

Then you can replace it with an actual QR code of the deposit address:

```bash
TODO
```

### Waiting

Currently, the only way to wait for a tx is to poll the balance (this will improve later):

```bash
TODO
````

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
TODO
```

You can now send money to the contract:

```bash
TODO
``` 

Check the balance of the contract (in satoshis):

```bash
TODO
```

Note: Escrow contract is big (in bytes) and requires a big fee, so the minimum what you can send to it is about 3700 satoshis. 

TODO: a function to convert satoshis to USD and vice versa - that's coming

Now, we can execute the necessary functions:

1) Buyer releases the funds
```bash
TODO
```

2) Seller refunds
```bash
TODO
```

3) Arbiter releases the funds or refunds
```bash
TODO
```

### Saving the contract to the database

The arbiter needs to save the contract somewhere (in a database or some other storage), so that when the time comes,
he could execure the necessary functions:

Save:

```bash
TODO
```

Restore it later:

```bash
TODO
```

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