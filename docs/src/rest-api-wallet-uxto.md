diff --git a/docs/src/tutorial/rest.md b/docs/src/tutorial/rest.md
index b049f23..412fe0c 100755
--- a/docs/src/tutorial/rest.md
+++ b/docs/src/tutorial/rest.md
@@ -226,6 +226,32 @@ You can ask for `usd`, `sat`, `bch` (or `satoshi`, `satoshis`, `sats` - just in
 
 `usd` returns the amount at the current exchange rate, fetched from CoinGecko or Bitcoin.com.
 
+
+### Getting the Coin Information
+
+To get the *shape* of the balance of your wallet:
+
+```bash
+curl -X POST https://rest-unstable.mainnet.cash/wallet/utxo \
+  -H "Content-Type: application/json" \
+  -d '{
+    "walletId": "named:testnet:wallet_1"
+  }'
+```
+
+Response:
+
+```json
+[{"txid":"e493e5261731c27faca817de395a9b4568a839879ba0c24299d6f5e4de0c7b93","vout":0,"satoshis":400000000,"height":243},
+{"txid":"396774bd42ba4a7a3383aaa33d5f14fee887ea68df0b106c0b4752e281fd3b8b","vout":0,"satoshis":400000000,"height":248},
+{"txid":"9d657dd75cbdd301edb5a4b339f6b30beceef7f406003435005a7651869a47f1","vout":0,"satoshis":1000000,"height":248},
+{"txid":"9db21361356108b07c1d692bd23b34ff7802bf416616d6e319c84752314193bd","vout":0,"satoshis":1000000,"height":248},
+{"txid":"a79c6c6ee44e665e241d87320c543df19f75e6f40b6cc470977beb874bb63059","vout":0,"satoshis":1000000,"height":248},
+{"txid":"96448c243cf8cf000499cd9b56f174cec3cb6a4c891141250a52d1f7e49555c2","vout":0,"satoshis":1000000,"height":258}]
+```
+
+
+
 ## Sending money
 
 Let's create another wallet and send some of our money there.
