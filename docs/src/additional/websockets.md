# WebSocket API reference

We provide some functionality over websockets where traditional REST servers would timeout. Examples are waiting for transactions and watching balances.
Websockets allow to subscribe to server events, sending responses and notifications asynchronously.

Check out the jsfiddle [demo](https://jsfiddle.net/Lm87yzuj/6/)

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

## Supported methods
### watchBalance

Receive notification upon the address' balance change. Responds recurrently.
Request:
```json
{
  method: "watchBalance",
  data: {
    address: "qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3"
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

### waitForTransaction

Waits for the next transaction of the address. Responds once.
```json
{
  method: "waitForTransaction",
  data: {
    address: "qzxzl07tth5qx4shphrpzz38wnstwac5ksqnc6yyr3"
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