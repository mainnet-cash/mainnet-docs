---
title: Mainnet Cash v2.6.4
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers:
  - <a href="https://mainnet.cash">Find out more about mainnet-js</a>
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="mainnet-cash">Mainnet Cash v2.6.4</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A developer friendly bitcoin cash wallet api

This API is currently in *active* development, breaking changes may
be made prior to official release of version 1.0.0.

Base URLs:

* <a href="https://rest-unstable.mainnet.cash/">https://rest-unstable.mainnet.cash/</a>

* <a href="http://localhost:3000/">http://localhost:3000/</a>

<a href="https://mainnet.cash/terms/">Terms of service</a>
Email: <a href="mailto:hello@mainnet.cash">Support</a> 
License: <a href="https://github.com/mainnet-cash/mainnet-js/blob/master/LICENSE">MIT Licence</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="mainnet-cash-contract">contract</h1>

Use Cashscript contracts

<a href="https://rest-unstable.mainnet.cash/api-docs/#/contract/">Find out more</a>

## contractFn

<a id="opIdcontractFn"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/call \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/call HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "contractId": "string",
  "action": "send",
  "function": "string",
  "arguments": [
    "string"
  ],
  "to": [
    "string"
  ],
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ],
  "opReturn": [
    "string"
  ],
  "feePerByte": 0,
  "hardcodedFee": 0,
  "minChange": 0,
  "withoutChange": false,
  "age": 0,
  "time": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/call',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/call',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/call', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/call', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/call");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/call", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/call`

*Call a method on a contract*

> Body parameter

```json
{
  "contractId": "string",
  "action": "send",
  "function": "string",
  "arguments": [
    "string"
  ],
  "to": [
    "string"
  ],
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ],
  "opReturn": [
    "string"
  ],
  "feePerByte": 0,
  "hardcodedFee": 0,
  "minChange": 0,
  "withoutChange": false,
  "age": 0,
  "time": 0
}
```

<h3 id="contractfn-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ContractFnRequest](#schemacontractfnrequest)|true|Request a new cashscript contract|

> Example responses

> 200 Response

```json
{
  "contractId": "string",
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "hex": "0200000001f6d804c0a2f33936dd8b535d1... bdf0e43b30135be5251"
}
```

<h3 id="contractfn-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ContractFnResponse](#schemacontractfnresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## createContract

<a id="opIdcreateContract"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/create \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/create HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ],
  "network": "testnet"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/create',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/create', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/create', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/create");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/create", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/create`

*Create a cashscript contract*

> Body parameter

```json
{
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ],
  "network": "testnet"
}
```

<h3 id="createcontract-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ContractRequest](#schemacontractrequest)|true|Request a new cashscript contract|

> Example responses

> 200 Response

```json
{
  "contractId": "testnet:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok5EZ3dOVE01TWpreg==:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNS4zOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:480539293",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}
```

<h3 id="createcontract-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ContractResponse](#schemacontractresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## contractInfo

<a id="opIdcontractInfo"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/info \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/info HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "contractId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/info',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/info',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/info', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/info`

*Get information about a contract from the contractId*

> Body parameter

```json
{
  "contractId": "string"
}
```

<h3 id="contractinfo-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ContractInfoRequest](#schemacontractinforequest)|true|Request parsed information regarding a contract from the contractId|

> Example responses

> 200 Response

```json
{
  "contractId": "string",
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ],
  "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
  "tokenaddr": "bchreg:zpttdv3qg2usm4nm7talhxhl05mlhms3ysjm0q59vu"
}
```

<h3 id="contractinfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ContractInfoResponse](#schemacontractinforesponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## contractUtxos

<a id="opIdcontractUtxos"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/utxos \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/utxos HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "contractId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/utxos',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/utxos',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/utxos', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/utxos', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/utxos");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/utxos", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/utxos`

*List specific utxos on any contract*

Returns all UTXOs that can be spent by the
contract. Both confirmed and unconfirmed UTXOs are included. The endpoint works with contracts generated from templates (i.e. escrow).

> Body parameter

```json
{
  "contractId": "string"
}
```

<h3 id="contractutxos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Contract](#schemacontract)|true|none|

> Example responses

> 200 Response

```json
[
  {
    "vout": 0,
    "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 100,
    "token": {
      "amount": 0,
      "tokenId": "string",
      "capability": "none",
      "commitment": "string"
    }
  }
]
```

<h3 id="contractutxos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[UtxoResponse](#schemautxoresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="contractutxos-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-contract-escrow">contract/escrow</h1>

Use a stock escrow contract, with some helpers.

<a href="https://rest-unstable.mainnet.cash/api-docs/#/contract/escrow/">Find out more</a>

## createEscrow

<a id="opIdcreateEscrow"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/create \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/escrow/create HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/escrow/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/escrow/create',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/escrow/create', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/escrow/create', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/escrow/create");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/escrow/create", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/escrow/create`

*Create an escrow contract*

> Body parameter

```json
{
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000
}
```

<h3 id="createescrow-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EscrowRequest](#schemaescrowrequest)|true|Request a new escrow contract from a template|

> Example responses

> 200 Response

```json
{
  "escrowContractId": "escrowContract:testnet:WW1Ob2RHVnpkRHB4ZWpBd2NHczViR1p6TUdzNVpqVjJaak5xT0dnMk5uRm1iWEZoWjJzNGJtTTFObVZzY1RSa2RqST06WW1Ob2RHVnpkRHB4Y201c2RYVm5aVFUyWVdoNGMzazJjSEJzY1RRemNuWmhOMnMyY3psa2EyNTFOSEExTWpjNFlXZz06WW1Ob2RHVnpkRHB4ZW5Od1kzbDNlRzF0TkdaeGFHWTVhMnB5YTI1eVl6Tm5jbk4yTW5aMWEyVnhlV3B4YkdFd2JuUT06TVRBd01EQT0=:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok1UQTNOVEU0TkRjeU53PT0=:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNi4xOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:1075184727",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}
```

<h3 id="createescrow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[EscrowResponse](#schemaescrowresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## escrowFn

<a id="opIdescrowFn"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/call \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/escrow/call HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "escrowContractId": "string",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "function": "spend",
  "to": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "action": "build",
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/escrow/call',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/escrow/call',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/escrow/call', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/escrow/call', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/escrow/call");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/escrow/call", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/escrow/call`

*Finalize an escrow contract*

> Body parameter

```json
{
  "escrowContractId": "string",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "function": "spend",
  "to": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "action": "build",
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ]
}
```

<h3 id="escrowfn-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EscrowFnRequest](#schemaescrowfnrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "contractId": "string",
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "hex": "0200000001f6d804c0a2f33936dd8b535d1... bdf0e43b30135be5251"
}
```

<h3 id="escrowfn-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ContractFnResponse](#schemacontractfnresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## escrowInfo

<a id="opIdescrowInfo"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/info \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/escrow/info HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "escrowContractId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/escrow/info',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/escrow/info',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/escrow/info', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/escrow/info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/escrow/info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/escrow/info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/escrow/info`

*Get information about an escrow contract from the escrowContractId*

> Body parameter

```json
{
  "escrowContractId": "string"
}
```

<h3 id="escrowinfo-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EscrowInfoRequest](#schemaescrowinforequest)|true|Request parsed information regarding a contract from the escrowContractId|

> Example responses

> 200 Response

```json
{
  "escrowContractId": "escrowContract:testnet:WW1Ob2RHVnpkRHB4ZWpBd2NHczViR1p6TUdzNVpqVjJaak5xT0dnMk5uRm1iWEZoWjJzNGJtTTFObVZzY1RSa2RqST06WW1Ob2RHVnpkRHB4Y201c2RYVm5aVFUyWVdoNGMzazJjSEJzY1RRemNuWmhOMnMyY3psa2EyNTFOSEExTWpjNFlXZz06WW1Ob2RHVnpkRHB4ZW5Od1kzbDNlRzF0TkdaeGFHWTVhMnB5YTI1eVl6Tm5jbk4yTW5aMWEyVnhlV3B4YkdFd2JuUT06TVRBd01EQT0=:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok1UQTNOVEU0TkRjeU53PT0=:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNi4xOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:1075184727",
  "script": "pragma cashscript ^0.6.1;\ncontract escrow(bytes20 sellerPkh, bytes20 buyerPkh, bytes20 arbiterPkh, int contractAmount, int contractNonce) {\n\n    function spend(pubkey signingPk, sig s, int amount, int nonce) {\n        require(hash160(signingPk) == arbiterPkh || hash160(signingPk) == buyerPkh);\n        require(checkSig(s, signingPk));\n        require(amount >= contractAmount);\n        require(nonce == contractNonce);\n        bytes34 output = new OutputP2PKH(bytes8(amount), sellerPkh);\n        require(hash256(output) == tx.hashOutputs);\n    }\n\n    function refund(pubkey signingPk, sig s, int amount, int nonce) {\n        require(hash160(signingPk) == arbiterPkh||hash160(signingPk) == sellerPkh);\n        require(checkSig(s, signingPk));\n        require(amount >= contractAmount);\n        require(nonce == contractNonce);\n        bytes34 output = new OutputP2PKH(bytes8(amount), buyerPkh);\n        require(hash256(output) == tx.hashOutputs);\n    }\n}\n",
  "parameters": [
    "9ef0d8bf4c1f62a68c4c647beb404ec1d458f3c5",
    "e7fe7119a6bb73409a087e0ac46cefada815b69f",
    "a01c11c6deea905d25b487698f1140e0c53396c8",
    10000,
    1996128042
  ],
  "cashaddr": "bchtest:prxla49zwqm8m2nzgn82qza3ssrqnpt8vgv60hlwm2",
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000,
  "nonce": 1996128042
}
```

<h3 id="escrowinfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[EscrowInfoResponse](#schemaescrowinforesponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## escrowUtxos

<a id="opIdescrowUtxos"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/contract/escrow/utxos \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/contract/escrow/utxos HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "escrowContractId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/contract/escrow/utxos',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/contract/escrow/utxos',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/contract/escrow/utxos', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/contract/escrow/utxos', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/contract/escrow/utxos");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/contract/escrow/utxos", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /contract/escrow/utxos`

*List specific utxos on any escrow contract*

Returns all UTXOs that can be spent by the
contract. Both confirmed and unconfirmed UTXOs are included. The endpoint works with contracts generated from templates (i.e. escrow).

> Body parameter

```json
{
  "escrowContractId": "string"
}
```

<h3 id="escrowutxos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EscrowContract](#schemaescrowcontract)|true|none|

> Example responses

> 200 Response

```json
[
  {
    "vout": 0,
    "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 100,
    "token": {
      "amount": 0,
      "tokenId": "string",
      "capability": "none",
      "commitment": "string"
    }
  }
]
```

<h3 id="escrowutxos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[UtxoResponse](#schemautxoresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="escrowutxos-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-faucet">faucet</h1>

Testnet faucet

<a href="https://rest-unstable.mainnet.cash/api-docs/#/faucet/">Find out more</a>

## getTestnetBch

<a id="opIdgetTestnetBch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_testnet_bch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/faucet/get_testnet_bch HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "cashaddr": "bchtest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq27mxesg8"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/faucet/get_testnet_bch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/faucet/get_testnet_bch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/faucet/get_testnet_bch', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/faucet/get_testnet_bch', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/faucet/get_testnet_bch");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/faucet/get_testnet_bch", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /faucet/get_testnet_bch`

*Get testnet bch
*

> Body parameter

```json
{
  "cashaddr": "bchtest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq27mxesg8"
}
```

<h3 id="gettestnetbch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[GetTestnetBchRequest](#schemagettestnetbchrequest)|true|Request to bch faucet|

#### Detailed descriptions

**body**: Request to bch faucet

> Example responses

> 200 Response

```json
{
  "txId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}
```

<h3 id="gettestnetbch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[GetTestnetBchResponse](#schemagettestnetbchresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="gettestnetbch-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getAddresses

<a id="opIdgetAddresses"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/faucet/get_addresses \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/faucet/get_addresses HTTP/1.1
Host: rest-unstable.mainnet.cash
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/faucet/get_addresses',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/faucet/get_addresses',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/faucet/get_addresses', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/faucet/get_addresses', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/faucet/get_addresses");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/faucet/get_addresses", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /faucet/get_addresses`

*Get addresses to return back or donate the testnet bch and tokens
*

> Example responses

> 200 Response

```json
{
  "bchtest": "bchtest:qzxkd5achtj6v46m9vdqv6gj2pvrac5q0qd2qqa2ga"
}
```

<h3 id="getaddresses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[GetAddressesResponse](#schemagetaddressesresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="getaddresses-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-mine">mine</h1>

Mine regtest coins

<a href="https://rest-unstable.mainnet.cash/api-docs/#/mine/">Find out more</a>

## mine

<a id="opIdmine"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/mine \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/mine HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "cashaddr": "bchreg:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "blocks": 105
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/mine',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/mine',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/mine', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/mine', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/mine");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/mine", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /mine`

*Mine regtest coins to a specified address*

> Body parameter

```json
{
  "cashaddr": "bchreg:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "blocks": 105
}
```

<h3 id="mine-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[MineRequest](#schemaminerequest)|false|none|

> Example responses

> 200 Response

```json
[
  "string"
]
```

<h3 id="mine-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|request accepted|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|

<h3 id="mine-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-util">util</h1>

Stateless convenience utilities

<a href="https://rest-unstable.mainnet.cash/api-docs/#/util/">Find out more</a>

## convert

<a id="opIdconvert"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/util/convert \
  -H 'Content-Type: application/json' \
  -H 'Accept: text/plain' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/util/convert HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: text/plain

```

```javascript
const inputBody = '{
  "value": 100,
  "from": "bch",
  "to": "usd"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'text/plain',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/util/convert',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'text/plain',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/util/convert',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'text/plain',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/util/convert', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'text/plain',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/util/convert', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/util/convert");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"text/plain"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/util/convert", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /util/convert`

*convert between units*

> Body parameter

```json
{
  "value": 100,
  "from": "bch",
  "to": "usd"
}
```

<h3 id="convert-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ConvertRequest](#schemaconvertrequest)|false|none|

> Example responses

> 200 Response

```
0
```

<h3 id="convert-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|number|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="convert-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getAddrsByXpubKey

<a id="opIdgetAddrsByXpubKey"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey \
  -H 'Content-Type: application/json' \
  -H 'Accept: text/plain' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: text/plain

```

```javascript
const inputBody = '{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj",
  "path": "0/0",
  "count": 3
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'text/plain',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'text/plain',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'text/plain',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'text/plain',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"text/plain"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/util/get_addrs_by_xpubkey", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /util/get_addrs_by_xpubkey`

*Derive heristic determined addresses from an extended public key, per BIP32*

> Body parameter

```json
{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj",
  "path": "0/0",
  "count": 3
}
```

<h3 id="getaddrsbyxpubkey-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[getAddrsByXpubKeyRequest](#schemagetaddrsbyxpubkeyrequest)|false|none|

> Example responses

> 200 Response

```
["bitcoincash:qrvcdmgpk73zyfd8pmdl9wnuld36zh9n4gms8s0u59","bitcoincash:qp4wzvqu73x22ft4r5tk8tz0aufdz9fescwtpcmhc7","bitcoincash:qr0kwqzf2h3wvjjhn4pg895lrxwp96wqgyhkksq2nh"]
```

<h3 id="getaddrsbyxpubkey-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[getAddrsByXpubKeyResponse](#schemagetaddrsbyxpubkeyresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="getaddrsbyxpubkey-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getXpubKeyInfo

<a id="opIdgetXpubKeyInfo"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/util/get_xpubkey_info \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/util/get_xpubkey_info HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/util/get_xpubkey_info',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/util/get_xpubkey_info',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/util/get_xpubkey_info', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/util/get_xpubkey_info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/util/get_xpubkey_info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/util/get_xpubkey_info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /util/get_xpubkey_info`

*Decode information about an extended public key, per BIP32*

> Body parameter

```json
{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj"
}
```

<h3 id="getxpubkeyinfo-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[getXpubKeyInfoRequest](#schemagetxpubkeyinforequest)|true|Decode information about an extended public key, per BIP32|

> Example responses

> 200 Response

```json
{
  "version": "mainnet",
  "depth": 3,
  "parentFingerprint": "155bca59",
  "childNumber": "2147483648,",
  "chain": "3da4bc190a2680111d31fadfdc905f2a7f6ce77c6f109919116f253d43445219",
  "data": "03774c910fcf07fa96886ea794f0d5caed9afe30b44b83f7e213bb92930e7df4bd",
  "fingerprint": "6cc9f252"
}
```

<h3 id="getxpubkeyinfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[getXpubKeyInfoResponse](#schemagetxpubkeyinforesponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="getxpubkeyinfo-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-wallet">wallet</h1>

Interact with wallets

<a href="https://rest-unstable.mainnet.cash/api-docs/#/wallet/">Find out more</a>

## createWallet

<a id="opIdcreateWallet"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/create \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/create HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "type": "seed",
  "network": "testnet",
  "name": "username1"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/create',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/create', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/create', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/create");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/create", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/create`

*create a new wallet*

> Body parameter

```json
{
  "type": "seed",
  "network": "testnet",
  "name": "username1"
}
```

<h3 id="createwallet-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WalletRequest](#schemawalletrequest)|true|Request a new random wallet|

> Example responses

> 200 Response

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "name": "username1",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "wif": "cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "network": "testnet"
}
```

<h3 id="createwallet-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[WalletResponse](#schemawalletresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="createwallet-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## replaceNamed

<a id="opIdreplaceNamed"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/replace_named \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/replace_named HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "walletName",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "network": "testnet",
  "type": "seed"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/replace_named',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/replace_named',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/replace_named', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/replace_named', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/replace_named");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/replace_named", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/replace_named`

*Replace (recover) named wallet with a new walletId.
If wallet with a provided name does not exist yet, it will be creted with a `walletId` supplied
If wallet exists it will be overwritten without exception
*

> Body parameter

```json
{
  "name": "walletName",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "network": "testnet",
  "type": "seed"
}
```

<h3 id="replacenamed-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WalletReplaceNamedRequest](#schemawalletreplacenamedrequest)|true|Request parameters|

> Example responses

> 200 Response

```json
true
```

<h3 id="replacenamed-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[WalletReplaceNamedResponse](#schemawalletreplacenamedresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="replacenamed-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## namedExists

<a id="opIdnamedExists"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/named_exists \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/named_exists HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "walletName",
  "network": "testnet",
  "type": "seed"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/named_exists',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/named_exists',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/named_exists', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/named_exists', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/named_exists");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/named_exists", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/named_exists`

*Check if a named wallet already exists*

> Body parameter

```json
{
  "name": "walletName",
  "network": "testnet",
  "type": "seed"
}
```

<h3 id="namedexists-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WalletNamedExistsRequest](#schemawalletnamedexistsrequest)|true|Request parameters|

> Example responses

> 200 Response

```json
true
```

<h3 id="namedexists-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[WalletNamedExistsResponse](#schemawalletnamedexistsresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="namedexists-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## info

<a id="opIdinfo"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/info \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/info HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/info',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/info',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/info', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/info`

*Get information about a wallet*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="info-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|The wallet to request information about, in serialized form.|

#### Detailed descriptions

**body**: The wallet to request information about, in serialized form.

> Example responses

> 200 Response

```json
{
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys0d2lessf",
  "tokenaddr": "bchreg:zpttdv3qg2usm4nm7talhxhl05mlhms3ysjm0q59vu",
  "isTestnet": true,
  "name": "",
  "network": "testnet",
  "seed": "empty solar plunge document bridge announce purse erupt joy vague illegal angle",
  "derivationPath": "m/44'/0'/0'/0/0",
  "publicKey": "04410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a72e8d04d8a1634f35a05d6bd59d20c545e165f5d7dd6043fe3e843e7ec547b6df",
  "publicKeyHash": "56b6b22042b90dd67bf2fbfb9aff7d37fbee1124",
  "privateKey": "207efc5233effadd4f2df00410526dc4d0ca901ca8f0b7a1e92a42d3baf14e7f",
  "privateKeyWif": "cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "walletId": "wif:testnet:empty solar plunge document bridge announce purse erupt joy vague illegal angle:m/44'/0'/0'/0/0",
  "walletDbEntry": "wif:testnet:empty solar plunge document bridge announce purse erupt joy vague illegal angle:m/44'/0'/0'/0/0"
}
```

<h3 id="info-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Information about the wallet network, type, and keys|[WalletInfo](#schemawalletinfo)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## balance

<a id="opIdbalance"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/balance \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/balance HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "slpSemiAware": true,
  "unit": "sat"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/balance',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/balance',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/balance', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/balance', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/balance");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/balance", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/balance`

*Get total balance for wallet*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "slpSemiAware": true,
  "unit": "sat"
}
```

<h3 id="balance-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BalanceRequest](#schemabalancerequest)|true|Request for a wallet balance|

#### Detailed descriptions

**body**: Request for a wallet balance

> Example responses

> 200 Response

```json
{
  "bch": 1,
  "sat": 100000000,
  "usd": 438.02
}
```

```
0
```

<h3 id="balance-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|number|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getHistory

<a id="opIdgetHistory"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_history \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_history HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "unit": "sat",
  "fromHeight": 0,
  "toHeight": -1,
  "start": 0,
  "count": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_history',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_history', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_history', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_history");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_history", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_history`

*Get a list of transactions related to a wallet*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "unit": "sat",
  "fromHeight": 0,
  "toHeight": -1,
  "start": 0,
  "count": 0
}
```

<h3 id="gethistory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[HistoryRequest](#schemahistoryrequest)|true|Gets transaction history of this wallet with most data decoded and ready to present to user|

#### Detailed descriptions

**body**: Gets transaction history of this wallet with most data decoded and ready to present to user
  Note: balance calculations are valid only if querying to the blockchain tip (`toHeight` === -1, `count` === -1)
  Note: this method is heavy on network calls, if invoked in browser use of cache is advised, @see `Config.UseLocalStorageCache`
  Note: this method tries to recreate the history tab view of Electron Cash wallet, however, it may not be 100% accurate if the tnransaction value changes are the same in the same block (ordering)

> Example responses

> 200 Response

```json
[
  {
    "inputs": [
      {
        "address": "string",
        "value": 0,
        "token": {
          "amount": 0,
          "tokenId": "string",
          "capability": "none",
          "commitment": "string"
        }
      }
    ],
    "outputs": [
      {
        "address": "string",
        "value": 0,
        "token": {
          "amount": 0,
          "tokenId": "string",
          "capability": "none",
          "commitment": "string"
        }
      }
    ],
    "blockheight": 0,
    "timestamp": "string",
    "hash": "string",
    "size": 0,
    "fee": 0,
    "balance": 0,
    "valueChange": 0,
    "tokenAmountChanges": [
      {
        "tokenId": "string",
        "amount": 0,
        "nftAmount": 0
      }
    ]
  }
]
```

<h3 id="gethistory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="gethistory-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[TransactionHistoryItem](#schematransactionhistoryitem)]|false|none|none|
|» inputs|[[InOutput](#schemainoutput)]|false|none|none|
|»» address|string|false|none|address in cashaddr format|
|»» value|number|false|none|value in satoshis|
|»» token|[Token](#schematoken)¦null|false|none|none|
|»»» amount|number|false|none|Fungible token amount|
|»»» tokenId|string|false|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|»»» capability|string¦null|false|none|Capability of the NFT|
|»»» commitment|string¦null|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|
|» outputs|[[InOutput](#schemainoutput)]|false|none|none|
|» blockheight|number|false|none|The blockheight of transaction|
|» timestamp|string¦null|false|none|The timestamp of transaction, undefined if unconfirmed|
|» hash|string|false|none|The hash of the transaction|
|» size|number|false|none|The size of the transaction|
|» fee|number|false|none|Transaction fee|
|» balance|number|false|none|A running balance, in units|
|» valueChange|number|false|none|Change of value in the transaction, in units|
|» tokenAmountChanges|[[TokenAmountChange](#schematokenamountchange)]|false|none|none|
|»» tokenId|string|false|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|»» amount|number|false|none|Fungible token amount|
|»» nftAmount|number|false|none|Non-fungible token amount|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## maxAmountToSend

<a id="opIdmaxAmountToSend"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/max_amount_to_send \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/max_amount_to_send HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "output_count": 0,
  "options": {
    "slpSemiAware": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/max_amount_to_send',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/max_amount_to_send',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/max_amount_to_send', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/max_amount_to_send', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/max_amount_to_send");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/max_amount_to_send", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/max_amount_to_send`

*Get maximum spendable amount*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "output_count": 0,
  "options": {
    "slpSemiAware": true
  }
}
```

<h3 id="maxamounttosend-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[MaxAmountToSendRequest](#schemamaxamounttosendrequest)|true|get amount that will be spend with a spend max request. If a unit type is specified, a numeric value will be returned.|

> Example responses

> 200 Response

```json
{
  "bch": 1,
  "sat": 100000000,
  "usd": 438.02
}
```

<h3 id="maxamounttosend-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|transaction accepted|[BalanceResponse](#schemabalanceresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|
|418|[I'm a teapot](https://tools.ietf.org/html/rfc2324#section-2.3.1)|Invalid network for given address|None|

<h3 id="maxamounttosend-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## depositAddress

<a id="opIddepositAddress"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/deposit_address \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/deposit_address HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/deposit_address',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/deposit_address',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/deposit_address', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/deposit_address', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/deposit_address");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/deposit_address", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/deposit_address`

*Get a deposit address in cash address format*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="depositaddress-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|Request for a deposit address given a wallet|

#### Detailed descriptions

**body**: Request for a deposit address given a wallet

> Example responses

> 200 Response

```json
{
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}
```

<h3 id="depositaddress-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[DepositAddressResponse](#schemadepositaddressresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## tokenDepositAddress

<a id="opIdtokenDepositAddress"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/token_deposit_address \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/token_deposit_address HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/token_deposit_address',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/token_deposit_address',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/token_deposit_address', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/token_deposit_address', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/token_deposit_address");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/token_deposit_address", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/token_deposit_address`

*Get a token aware deposit address in cash address format*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="tokendepositaddress-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|Request for a token aware deposit address given a wallet|

#### Detailed descriptions

**body**: Request for a token aware deposit address given a wallet

> Example responses

> 200 Response

```json
{
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}
```

<h3 id="tokendepositaddress-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[DepositAddressResponse](#schemadepositaddressresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## depositQr

<a id="opIddepositQr"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/deposit_qr \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/deposit_qr HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/deposit_qr',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/deposit_qr',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/deposit_qr', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/deposit_qr', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/deposit_qr");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/deposit_qr", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/deposit_qr`

*Get receiving cash address as a qrcode*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="depositqr-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|Request for a deposit cash address as a Quick Response code (qrcode)|

#### Detailed descriptions

**body**: Request for a deposit cash address as a Quick Response code (qrcode)

> Example responses

> 200 Response

```json
{
  "src": "data:image/svg+xml;base64,PD94bWwgdm... ==**",
  "title": "bitcoincash:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "alt": "A Bitcoin Cash Qr Code"
}
```

<h3 id="depositqr-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Qr code image data encoded string in the src field suitable for inclusion in html using:
   - \<img src\=\"{response.src}"\>|[ScalableVectorGraphic](#schemascalablevectorgraphic)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## tokenDepositQr

<a id="opIdtokenDepositQr"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/token_deposit_qr \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/token_deposit_qr HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/token_deposit_qr',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/token_deposit_qr',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/token_deposit_qr', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/token_deposit_qr', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/token_deposit_qr");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/token_deposit_qr", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/token_deposit_qr`

*Get receiving token aware cash address as a qrcode*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="tokendepositqr-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|Request for a token aware deposit cash address as a Quick Response code (qrcode)|

#### Detailed descriptions

**body**: Request for a token aware deposit cash address as a Quick Response code (qrcode)

> Example responses

> 200 Response

```json
{
  "src": "data:image/svg+xml;base64,PD94bWwgdm... ==**",
  "title": "bitcoincash:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "alt": "A Bitcoin Cash Qr Code"
}
```

<h3 id="tokendepositqr-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Qr code image data encoded string in the src field suitable for inclusion in html using:
   - \<img src\=\"{response.src}"\>|[ScalableVectorGraphic](#schemascalablevectorgraphic)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## send

<a id="opIdsend"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/send \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/send HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "to": {
    "unit": "sat",
    "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
    "value": 1000
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/send',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/send',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/send', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/send', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/send");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/send", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/send`

*Send some amount to a given address*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "to": {
    "unit": "sat",
    "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
    "value": 1000
  }
}
```

<h3 id="send-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SendRequest](#schemasendrequest)|true|place a send request|

> Example responses

> 202 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 1,
    "sat": 100000000,
    "usd": 438.02
  },
  "explorerUrl": "https://www.blockchain.com/bch-testnet/tx/1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "tokenIds": [
    [
      "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    ]
  ]
}
```

<h3 id="send-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|transaction accepted|[SendResponse](#schemasendresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|
|418|[I'm a teapot](https://tools.ietf.org/html/rfc2324#section-2.3.1)|Invalid network for given address|None|

<h3 id="send-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## sendMax

<a id="opIdsendMax"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/send_max \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/send_max HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/send_max',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/send_max',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/send_max', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/send_max', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/send_max");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/send_max", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/send_max`

*Send all available funds to a given address*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t"
}
```

<h3 id="sendmax-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SendMaxRequest](#schemasendmaxrequest)|true|Request to send all available funds to a given address|

> Example responses

> 202 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 0,
    "sat": 0,
    "usd": 0
  }
}
```

<h3 id="sendmax-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|transaction accepted|[SendMaxResponse](#schemasendmaxresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|

<h3 id="sendmax-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## encodeTransaction

<a id="opIdencodeTransaction"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/encode_transaction \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/encode_transaction HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "discardChange": false,
  "to": [
    "string"
  ],
  "options": {
    "utxoIds": [
      "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:5000"
    ],
    "changeAddress": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
    "slpSemiAware": true,
    "queryBalance": false,
    "awaitTransactionPropagation": false,
    "feePaidBy": "change",
    "checkTokenQuantities": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/encode_transaction',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/encode_transaction',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/encode_transaction', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/encode_transaction', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/encode_transaction");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/encode_transaction", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/encode_transaction`

*Encode and sign a transaction given a list of sendRequests, options and estimate fees*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "discardChange": false,
  "to": [
    "string"
  ],
  "options": {
    "utxoIds": [
      "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:5000"
    ],
    "changeAddress": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
    "slpSemiAware": true,
    "queryBalance": false,
    "awaitTransactionPropagation": false,
    "feePaidBy": "change",
    "checkTokenQuantities": true
  }
}
```

<h3 id="encodetransaction-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EncodeTransactionRequest](#schemaencodetransactionrequest)|true|encode a transaction|

> Example responses

> 202 Response

```json
{
  "transactionHex": "string"
}
```

<h3 id="encodetransaction-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|transaction accepted|[EncodeTransactionResponse](#schemaencodetransactionresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|
|418|[I'm a teapot](https://tools.ietf.org/html/rfc2324#section-2.3.1)|Invalid network for given address|None|

<h3 id="encodetransaction-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## submitTransaction

<a id="opIdsubmitTransaction"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/submit_transaction \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/submit_transaction HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "transactionHex": "string",
  "awaitPropagation": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/submit_transaction',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/submit_transaction',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/submit_transaction', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/submit_transaction', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/submit_transaction");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/submit_transaction", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/submit_transaction`

*submit an encoded and signed transaction to the network*

> Body parameter

```json
{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "transactionHex": "string",
  "awaitPropagation": true
}
```

<h3 id="submittransaction-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SubmitTransactionRequest](#schemasubmittransactionrequest)|true|submit an encoded and signed transaction to the network|

> Example responses

> 202 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f"
}
```

<h3 id="submittransaction-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|transaction accepted|[SubmitTransactionResponse](#schemasubmittransactionresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request|None|
|418|[I'm a teapot](https://tools.ietf.org/html/rfc2324#section-2.3.1)|Invalid network for given address|None|

<h3 id="submittransaction-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## utxos

<a id="opIdutxos"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/utxo \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/utxo HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/utxo',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/utxo',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/utxo', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/utxo', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/utxo");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/utxo", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/utxo`

*Get detailed information about unspent outputs (utxos)*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="utxos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SerializedWallet](#schemaserializedwallet)|true|Request detailed list of unspent transaction outputs|

#### Detailed descriptions

**body**: Request detailed list of unspent transaction outputs

> Example responses

> 200 Response

```json
[
  {
    "vout": 0,
    "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 100,
    "token": {
      "amount": 0,
      "tokenId": "string",
      "capability": "none",
      "commitment": "string"
    }
  }
]
```

<h3 id="utxos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[UtxoResponse](#schemautxoresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## xpubkeys

<a id="opIdxpubkeys"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/xpubkeys \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/xpubkeys HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "seed:testnet:anchor stone process they donkey foam danger boat palace kind west cute:m/44'/0'/0'/0/0",
  "paths": [
    "m/44'/0'/0'"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/xpubkeys',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/xpubkeys',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/xpubkeys', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/xpubkeys', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/xpubkeys");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/xpubkeys", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/xpubkeys`

*A set of xpubkeys and paths for the wallet.*

> Body parameter

```json
{
  "walletId": "seed:testnet:anchor stone process they donkey foam danger boat palace kind west cute:m/44'/0'/0'/0/0",
  "paths": [
    "m/44'/0'/0'"
  ]
}
```

<h3 id="xpubkeys-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[XPubKeyRequest](#schemaxpubkeyrequest)|true|x|

#### Detailed descriptions

**body**: x

> Example responses

> 200 Response

```json
{
  "xpubkeys": [
    {
      "path": "string",
      "xpubkey": "string"
    }
  ]
}
```

<h3 id="xpubkeys-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[XPubKeyResponse](#schemaxpubkeyresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## tokenGenesis

<a id="opIdtokenGenesis"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/token_genesis \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/token_genesis HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "string",
  "amount": 0,
  "capability": "none",
  "commitment": "string",
  "cashaddr": "string",
  "value": 1000,
  "sendRequests": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/token_genesis',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/token_genesis',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/token_genesis', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/token_genesis', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/token_genesis");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/token_genesis", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/token_genesis`

*Create new token category*

> Body parameter

```json
{
  "walletId": "string",
  "amount": 0,
  "capability": "none",
  "commitment": "string",
  "cashaddr": "string",
  "value": 1000,
  "sendRequests": [
    "string"
  ]
}
```

<h3 id="tokengenesis-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TokenGenesisRequest](#schematokengenesisrequest)|true|Create new cashtoken, both funglible and/or non-fungible (NFT)|

#### Detailed descriptions

**body**: Create new cashtoken, both funglible and/or non-fungible (NFT)
Refer to spec https://github.com/bitjson/cashtokens
Newly created token identifier can be found in `tokenIds` field.

> Example responses

> 200 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 1,
    "sat": 100000000,
    "usd": 438.02
  },
  "explorerUrl": "https://www.blockchain.com/bch-testnet/tx/1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "tokenIds": [
    [
      "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    ]
  ]
}
```

<h3 id="tokengenesis-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[SendResponse](#schemasendresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## tokenMint

<a id="opIdtokenMint"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/token_mint \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/token_mint HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "string",
  "tokenId": "string",
  "requests": [
    {
      "capability": "none",
      "commitment": "string",
      "cashaddr": "string",
      "value": 1000
    }
  ],
  "deductTokenAmount": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/token_mint',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/token_mint',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/token_mint', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/token_mint', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/token_mint");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/token_mint", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/token_mint`

*Mint new non-fungible tokens*

> Body parameter

```json
{
  "walletId": "string",
  "tokenId": "string",
  "requests": [
    {
      "capability": "none",
      "commitment": "string",
      "cashaddr": "string",
      "value": 1000
    }
  ],
  "deductTokenAmount": false
}
```

<h3 id="tokenmint-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TokenMintRequest](#schematokenmintrequest)|true|Mint new NFT cashtokens using an existing minting token|

#### Detailed descriptions

**body**: Mint new NFT cashtokens using an existing minting token
Refer to spec https://github.com/bitjson/cashtokens
Newly minted tokens will retain the parent's `tokenId`.

> Example responses

> 200 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 1,
    "sat": 100000000,
    "usd": 438.02
  },
  "explorerUrl": "https://www.blockchain.com/bch-testnet/tx/1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "tokenIds": [
    [
      "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    ]
  ]
}
```

<h3 id="tokenmint-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[SendResponse](#schemasendresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## tokenBurn

<a id="opIdtokenBurn"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/token_burn \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/token_burn HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "string",
  "tokenId": "string",
  "capability": "none",
  "commitment": "string",
  "amount": 0,
  "cashaddr": "string",
  "message": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/token_burn',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/token_burn',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/token_burn', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/token_burn', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/token_burn");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/token_burn", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/token_burn`

*Perform an explicit token burn*

> Body parameter

```json
{
  "walletId": "string",
  "tokenId": "string",
  "capability": "none",
  "commitment": "string",
  "amount": 0,
  "cashaddr": "string",
  "message": "string"
}
```

<h3 id="tokenburn-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TokenBurnRequest](#schematokenburnrequest)|true|Perform an explicit token burning by spending a token utxo to an OP_RETURN|

#### Detailed descriptions

**body**: Perform an explicit token burning by spending a token utxo to an OP_RETURN
Behaves differently for fungible and non-fungible tokens:
 * NFTs are always "destroyed"
 * FTs' amount is reduced by the amount specified, if 0 FT amount is left and no NFT present, the token is "destroyed"
Refer to spec https://github.com/bitjson/cashtokens

> Example responses

> 200 Response

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 1,
    "sat": 100000000,
    "usd": 438.02
  },
  "explorerUrl": "https://www.blockchain.com/bch-testnet/tx/1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "tokenIds": [
    [
      "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    ]
  ]
}
```

<h3 id="tokenburn-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[SendResponse](#schemasendresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getTokenUtxos

<a id="opIdgetTokenUtxos"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_token_utxos \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_token_utxos HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_token_utxos',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_token_utxos',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_token_utxos', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_token_utxos', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_token_utxos");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_token_utxos", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_token_utxos`

*Get token utxos*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}
```

<h3 id="gettokenutxos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Get unspent token outputs for the wallet|
|» walletId|body|string|true|The walletId to make a request to.|
|» tokenId|body|string|false|tokenId (category) to filter utxos by, if not set will return utxos from all tokens|

#### Detailed descriptions

**body**: Get unspent token outputs for the wallet
will return utxos only for the specified token if `tokenId` provided

> Example responses

> 200 Response

```json
[
  {
    "vout": 0,
    "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 100,
    "token": {
      "amount": 0,
      "tokenId": "string",
      "capability": "none",
      "commitment": "string"
    }
  }
]
```

<h3 id="gettokenutxos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[UtxoResponse](#schemautxoresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getTokenBalance

<a id="opIdgetTokenBalance"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_token_balance \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_token_balance HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_token_balance',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_token_balance',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_token_balance', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_token_balance', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_token_balance");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_token_balance", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_token_balance`

*Get fungible token balance*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}
```

<h3 id="gettokenbalance-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Gets fungible token balance|
|» walletId|body|string|true|The walletId to make a request to.|
|» tokenId|body|string|true|tokenId to get balance for|

#### Detailed descriptions

**body**: Gets fungible token balance
for NFT token balance see @ref getNftTokenBalance

> Example responses

> 200 Response

```json
{
  "balance": 0
}
```

<h3 id="gettokenbalance-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="gettokenbalance-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» balance|number(integer)|false|none|Fungible token balance|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getNftTokenBalance

<a id="opIdgetNftTokenBalance"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_nft_token_balance", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_nft_token_balance`

*Get non-fungible token balance*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "tokenId": "string"
}
```

<h3 id="getnfttokenbalance-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Gets non-fungible token (NFT) balance for a particula tokenId|
|» walletId|body|string|true|The walletId to make a request to.|
|» tokenId|body|string|true|tokenId to get balance for|

#### Detailed descriptions

**body**: Gets non-fungible token (NFT) balance for a particula tokenId
disregards fungible token balances
for fungible token balance see @ref getTokenBalance

> Example responses

> 200 Response

```json
{
  "balance": 0
}
```

<h3 id="getnfttokenbalance-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getnfttokenbalance-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» balance|number(integer)|false|none|Non-fungible token balance|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getAllTokenBalances

<a id="opIdgetAllTokenBalances"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_all_token_balances \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_all_token_balances HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_all_token_balances',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_all_token_balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_all_token_balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_all_token_balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_all_token_balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_all_token_balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_all_token_balances`

*Get non-fungible token balance*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="getalltokenbalances-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Gets all fungible token balances in this wallet|
|» walletId|body|string|true|The walletId to make a request to.|

#### Detailed descriptions

**body**: Gets all fungible token balances in this wallet

> Example responses

> 200 Response

```json
{
  "property1": 0,
  "property2": 0
}
```

<h3 id="getalltokenbalances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getalltokenbalances-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» **additionalProperties**|number|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getAllNftTokenBalances

<a id="opIdgetAllNftTokenBalances"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/get_all_nft_token_balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/get_all_nft_token_balances`

*Get non-fungible token balance*

> Body parameter

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}
```

<h3 id="getallnfttokenbalances-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Gets all non-fungible token (NFT) balances in this wallet|
|» walletId|body|string|true|The walletId to make a request to.|

#### Detailed descriptions

**body**: Gets all non-fungible token (NFT) balances in this wallet

> Example responses

> 200 Response

```json
{
  "property1": 0,
  "property2": 0
}
```

<h3 id="getallnfttokenbalances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getallnfttokenbalances-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» **additionalProperties**|number|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-wallet-bcmr">wallet/bcmr</h1>

Interact with BitcoinCash Metadata Registries (BCMR)

<a href="https://rest-unstable.mainnet.cash/api-docs/#/wallet/bcmr">Find out more</a>

## bcmrGetRegistries

<a id="opIdbcmrGetRegistries"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/get_registries", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/get_registries`

*Get tracked BCMR registries*

> Body parameter

```json
{}
```

<h3 id="bcmrgetregistries-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|Get tracked BCMR registries.|

#### Detailed descriptions

**body**: Get tracked BCMR registries.

> Example responses

> 200 Response

```json
[
  {}
]
```

<h3 id="bcmrgetregistries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="bcmrgetregistries-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrResetRegistries

<a id="opIdbcmrResetRegistries"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/reset_registries", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/reset_registries`

*Reset tracked BCMR registries*

> Body parameter

```json
{}
```

<h3 id="bcmrresetregistries-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|Reset tracked BCMR registries, dropping all token info.|

#### Detailed descriptions

**body**: Reset tracked BCMR registries, dropping all token info.

> Example responses

> 200 Response

```json
{}
```

<h3 id="bcmrresetregistries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="bcmrresetregistries-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrAddRegistry

<a id="opIdbcmrAddRegistry"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/add_registry`

*Add BCMR registry from parameter*

> Body parameter

```json
{}
```

<h3 id="bcmraddregistry-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Add a BCMR registry to the list of tracked, allowing for token info lookup|

#### Detailed descriptions

**body**: Add a BCMR registry to the list of tracked, allowing for token info lookup

> Example responses

> 200 Response

```json
{}
```

<h3 id="bcmraddregistry-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="bcmraddregistry-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrAddRegistryFromUri

<a id="opIdbcmrAddRegistryFromUri"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "uri": "string",
  "contentHash": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_from_uri", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/add_registry_from_uri`

*Reset tracked BCMR registries*

> Body parameter

```json
{
  "uri": "string",
  "contentHash": "string"
}
```

<h3 id="bcmraddregistryfromuri-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Add a BCMR registry from remote URI to the list of tracked, allowing for token info lookup|

#### Detailed descriptions

**body**: Add a BCMR registry from remote URI to the list of tracked, allowing for token info lookup

> Example responses

> 200 Response

```json
{}
```

<h3 id="bcmraddregistryfromuri-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="bcmraddregistryfromuri-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrAddMetadataRegistryAuthChain

<a id="opIdbcmrAddMetadataRegistryAuthChain"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "transactionHash": "string",
  "followToHead": true,
  "rawTx": {
    "blockhash": "string",
    "blocktime": 0,
    "confirmations": 0,
    "hash": "string",
    "hex": "string",
    "locktime": 0,
    "size": 0,
    "time": 0,
    "txid": "string",
    "version": 0,
    "vin": [
      {
        "scriptSig": {
          "asm": "string",
          "hex": "string"
        },
        "sequence": 0,
        "txid": "string",
        "vout": 0,
        "value": 0,
        "address": "string"
      }
    ],
    "vout": [
      {
        "n": 0,
        "scriptPubKey": {
          "addresses": [
            "string"
          ],
          "asm": "string",
          "hex": "string",
          "reqSigs": 0,
          "type": "string"
        },
        "value": 0
      }
    ]
  },
  "network": "testnet"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/add_registry_authchain", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/add_registry_authchain`

*Add BCMR metadata registry from autchain, returning the built chain*

> Body parameter

```json
{
  "transactionHash": "string",
  "followToHead": true,
  "rawTx": {
    "blockhash": "string",
    "blocktime": 0,
    "confirmations": 0,
    "hash": "string",
    "hex": "string",
    "locktime": 0,
    "size": 0,
    "time": 0,
    "txid": "string",
    "version": 0,
    "vin": [
      {
        "scriptSig": {
          "asm": "string",
          "hex": "string"
        },
        "sequence": 0,
        "txid": "string",
        "vout": 0,
        "value": 0,
        "address": "string"
      }
    ],
    "vout": [
      {
        "n": 0,
        "scriptPubKey": {
          "addresses": [
            "string"
          ],
          "asm": "string",
          "hex": "string",
          "reqSigs": 0,
          "type": "string"
        },
        "value": 0
      }
    ]
  },
  "network": "testnet"
}
```

<h3 id="bcmraddmetadataregistryauthchain-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Add BCMR metadata registry by resolving an authchain, allowing for token info lookup|

#### Detailed descriptions

**body**: Add BCMR metadata registry by resolving an authchain, allowing for token info lookup

> Example responses

> 200 Response

```json
[
  {
    "txHash": "string",
    "contentHash": "string",
    "uris": [
      "string"
    ],
    "httpsUrl": "string"
  }
]
```

<h3 id="bcmraddmetadataregistryauthchain-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[AuthChain](#schemaauthchain)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrBuildAuthChain

<a id="opIdbcmrBuildAuthChain"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "transactionHash": "string",
  "resolveBase": false,
  "followToHead": true,
  "rawTx": {
    "blockhash": "string",
    "blocktime": 0,
    "confirmations": 0,
    "hash": "string",
    "hex": "string",
    "locktime": 0,
    "size": 0,
    "time": 0,
    "txid": "string",
    "version": 0,
    "vin": [
      {
        "scriptSig": {
          "asm": "string",
          "hex": "string"
        },
        "sequence": 0,
        "txid": "string",
        "vout": 0,
        "value": 0,
        "address": "string"
      }
    ],
    "vout": [
      {
        "n": 0,
        "scriptPubKey": {
          "addresses": [
            "string"
          ],
          "asm": "string",
          "hex": "string",
          "reqSigs": 0,
          "type": "string"
        },
        "value": 0
      }
    ]
  },
  "historyCache": [
    {
      "inputs": [
        {
          "address": "string",
          "value": 0,
          "token": {
            "amount": 0,
            "tokenId": "string",
            "capability": "none",
            "commitment": "string"
          }
        }
      ],
      "outputs": [
        {
          "address": "string",
          "value": 0,
          "token": {
            "amount": 0,
            "tokenId": "string",
            "capability": "none",
            "commitment": "string"
          }
        }
      ],
      "blockheight": 0,
      "timestamp": "string",
      "hash": "string",
      "size": 0,
      "fee": 0,
      "balance": 0,
      "valueChange": 0,
      "tokenAmountChanges": [
        {
          "tokenId": "string",
          "amount": 0,
          "nftAmount": 0
        }
      ]
    }
  ],
  "network": "testnet"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/build_authchain", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/build_authchain`

*Build a BCMR authchain*

> Body parameter

```json
{
  "transactionHash": "string",
  "resolveBase": false,
  "followToHead": true,
  "rawTx": {
    "blockhash": "string",
    "blocktime": 0,
    "confirmations": 0,
    "hash": "string",
    "hex": "string",
    "locktime": 0,
    "size": 0,
    "time": 0,
    "txid": "string",
    "version": 0,
    "vin": [
      {
        "scriptSig": {
          "asm": "string",
          "hex": "string"
        },
        "sequence": 0,
        "txid": "string",
        "vout": 0,
        "value": 0,
        "address": "string"
      }
    ],
    "vout": [
      {
        "n": 0,
        "scriptPubKey": {
          "addresses": [
            "string"
          ],
          "asm": "string",
          "hex": "string",
          "reqSigs": 0,
          "type": "string"
        },
        "value": 0
      }
    ]
  },
  "historyCache": [
    {
      "inputs": [
        {
          "address": "string",
          "value": 0,
          "token": {
            "amount": 0,
            "tokenId": "string",
            "capability": "none",
            "commitment": "string"
          }
        }
      ],
      "outputs": [
        {
          "address": "string",
          "value": 0,
          "token": {
            "amount": 0,
            "tokenId": "string",
            "capability": "none",
            "commitment": "string"
          }
        }
      ],
      "blockheight": 0,
      "timestamp": "string",
      "hash": "string",
      "size": 0,
      "fee": 0,
      "balance": 0,
      "valueChange": 0,
      "tokenAmountChanges": [
        {
          "tokenId": "string",
          "amount": 0,
          "nftAmount": 0
        }
      ]
    }
  ],
  "network": "testnet"
}
```

<h3 id="bcmrbuildauthchain-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Build an authchain - Zeroth-Descendant Transaction Chain, refer to https://github.com/bitjson/chip-bcmr#zeroth-descendant-transaction-chains|

#### Detailed descriptions

**body**: Build an authchain - Zeroth-Descendant Transaction Chain, refer to https://github.com/bitjson/chip-bcmr#zeroth-descendant-transaction-chains
The authchain in this implementation is specific to resolve to a valid metadata registy

> Example responses

> 200 Response

```json
[
  {
    "txHash": "string",
    "contentHash": "string",
    "uris": [
      "string"
    ],
    "httpsUrl": "string"
  }
]
```

<h3 id="bcmrbuildauthchain-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[AuthChain](#schemaauthchain)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## bcmrGetTokenInfo

<a id="opIdbcmrGetTokenInfo"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "tokenId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/bcmr/get_token_info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/bcmr/get_token_info`

*Get token info*

> Body parameter

```json
{
  "tokenId": "string"
}
```

<h3 id="bcmrgettokeninfo-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Return the token info (the identity snapshot as per BCMR spec)|

#### Detailed descriptions

**body**: Return the token info (the identity snapshot as per BCMR spec)

> Example responses

> 200 Response

```json
{
  "tokenInfo": {}
}
```

<h3 id="bcmrgettokeninfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="bcmrgettokeninfo-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» tokenInfo|object¦null|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-wallet-signed">wallet/signed</h1>

Sign and verify messages

<a href="https://rest-unstable.mainnet.cash/api-docs/#/wallet/sign">Find out more</a>

## signedMessageSign

<a id="opIdsignedMessageSign"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/signed/sign \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/signed/sign HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "message": "Chancellor on brink of second bailout for banks"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/signed/sign',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/signed/sign',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/signed/sign', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/signed/sign', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/signed/sign");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/signed/sign", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/signed/sign`

*Returns the message signature*

> Body parameter

```json
{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "message": "Chancellor on brink of second bailout for banks"
}
```

<h3 id="signedmessagesign-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateSignedMessageRequest](#schemacreatesignedmessagerequest)|false|Sign a message|

#### Detailed descriptions

**body**: Sign a message

> Example responses

> 200 Response

```json
{
  "signature": "IA+oq/uGz4kKA2bNgxPcM+T216abyUiBhofMg1J8fC5BLAbbIpF2toCHaO7/LQAxhQBtu5D6ROq1JjXiRwPAASg=",
  "raw": {
    "ecdsa": "string",
    "schnorr": "string",
    "der": "string"
  },
  "details": {
    "recoveryId": 0,
    "compressed": true,
    "messageHash": "string"
  }
}
```

<h3 id="signedmessagesign-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[SignedMessageResponse](#schemasignedmessageresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## signedMessageVerify

<a id="opIdsignedMessageVerify"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/signed/verify \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/signed/verify HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "walletId": "watch:mainnet:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw",
  "message": "Chancellor on brink of second bailout for banks",
  "signature": "IA+oq/uGz4kKA2bNgxPcM+T216abyUiBhofMg1J8fC5BLAbbIpF2toCHaO7/LQAxhQBtu5D6ROq1JjXiRwPAASg="
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/signed/verify',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/signed/verify',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/signed/verify', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/signed/verify', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/signed/verify");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/signed/verify", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/signed/verify`

*Returns a boolean indicating whether message was valid for a given address*

> Body parameter

```json
{
  "walletId": "watch:mainnet:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw",
  "message": "Chancellor on brink of second bailout for banks",
  "signature": "IA+oq/uGz4kKA2bNgxPcM+T216abyUiBhofMg1J8fC5BLAbbIpF2toCHaO7/LQAxhQBtu5D6ROq1JjXiRwPAASg="
}
```

<h3 id="signedmessageverify-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VerifySignedMessageRequest](#schemaverifysignedmessagerequest)|false|Sign a message|

#### Detailed descriptions

**body**: Sign a message

> Example responses

> 200 Response

```json
{
  "valid": true,
  "details": {
    "signatureType": "string",
    "messageHash": "string",
    "signatureValid": true,
    "publicKeyHashMatch": true
  }
}
```

<h3 id="signedmessageverify-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[VerifySignedMessageResponse](#schemaverifysignedmessageresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-wallet-util">wallet/util</h1>

Invoke wallet utility functions

<a href="https://rest-unstable.mainnet.cash/api-docs/#/wallet/util">Find out more</a>

## utilDecodeTransaction

<a id="opIdutilDecodeTransaction"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/util/decode_transaction \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/util/decode_transaction HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "transactionHashOrHex": "string",
  "loadInputValues": true,
  "network": "testnet"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/util/decode_transaction',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/util/decode_transaction',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/util/decode_transaction', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/util/decode_transaction', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/util/decode_transaction");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/util/decode_transaction", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/util/decode_transaction`

*Decode a bitcoin transaction. Accepts both transaction hash or raw transaction in hex format.*

> Body parameter

```json
{
  "transactionHashOrHex": "string",
  "loadInputValues": true,
  "network": "testnet"
}
```

<h3 id="utildecodetransaction-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UtilDecodeTransactionRequest](#schemautildecodetransactionrequest)|true|Request to decode a transaction|

#### Detailed descriptions

**body**: Request to decode a transaction

> Example responses

> 200 Response

```json
{
  "blockhash": "string",
  "blocktime": 0,
  "confirmations": 0,
  "hash": "string",
  "hex": "string",
  "locktime": 0,
  "size": 0,
  "time": 0,
  "txid": "string",
  "version": 0,
  "vin": [
    {
      "scriptSig": {
        "asm": "string",
        "hex": "string"
      },
      "sequence": 0,
      "txid": "string",
      "vout": 0,
      "value": 0,
      "address": "string"
    }
  ],
  "vout": [
    {
      "n": 0,
      "scriptPubKey": {
        "addresses": [
          "string"
        ],
        "asm": "string",
        "hex": "string",
        "reqSigs": 0,
        "type": "string"
      },
      "value": 0
    }
  ]
}
```

<h3 id="utildecodetransaction-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ElectrumRawTransaction](#schemaelectrumrawtransaction)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## utilGetRawTransaction

<a id="opIdutilGetRawTransaction"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "txHash": "string",
  "verbose": false,
  "network": "testnet"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/wallet/util/get_raw_transaction", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /wallet/util/get_raw_transaction`

*Get bitcoin raw transaction*

> Body parameter

```json
{
  "txHash": "string",
  "verbose": false,
  "network": "testnet"
}
```

<h3 id="utilgetrawtransaction-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Request to get raw transaction|

#### Detailed descriptions

**body**: Request to get raw transaction

> Example responses

> 200 Response

```json
{
  "txHex": "string"
}
```

<h3 id="utilgetrawtransaction-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="utilgetrawtransaction-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="mainnet-cash-webhook">webhook</h1>

Create webhooks

<a href="https://rest-unstable.mainnet.cash/api-docs/#/webhook/">Find out more</a>

## watchAddress

<a id="opIdwatchAddress"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://rest-unstable.mainnet.cash/webhook/watch_address \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://rest-unstable.mainnet.cash/webhook/watch_address HTTP/1.1
Host: rest-unstable.mainnet.cash
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "cashaddr": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
  "url": "http://example.com/webhook",
  "type": "transaction:in,out",
  "recurrence": "recurrent",
  "duration_sec": 86400
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://rest-unstable.mainnet.cash/webhook/watch_address',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://rest-unstable.mainnet.cash/webhook/watch_address',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://rest-unstable.mainnet.cash/webhook/watch_address', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://rest-unstable.mainnet.cash/webhook/watch_address', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://rest-unstable.mainnet.cash/webhook/watch_address");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://rest-unstable.mainnet.cash/webhook/watch_address", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /webhook/watch_address`

*Create a webhook to watch cashaddress balance and transactions.
*

> Body parameter

```json
{
  "cashaddr": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
  "url": "http://example.com/webhook",
  "type": "transaction:in,out",
  "recurrence": "recurrent",
  "duration_sec": 86400
}
```

<h3 id="watchaddress-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WatchAddressRequest](#schemawatchaddressrequest)|true|Based on the 'type' parameter the webhook will be triggered to either post balance or raw transactions to the 'url':|

#### Detailed descriptions

**body**: Based on the 'type' parameter the webhook will be triggered to either post balance or raw transactions to the 'url':
- 'transaction:in' for incoming BCH transactions
- 'transaction:out' for outgoing BCH transactions
- 'transaction:in,out' both for incoming and outgoing BCH transactions
- 'balance' will post the object according to 'BalanceResponse' schema

> Example responses

> 200 Response

```json
{
  "id": 1
}
```

<h3 id="watchaddress-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[WatchAddressResponse](#schemawatchaddressresponse)|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Invalid input|None|

<h3 id="watchaddress-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_UnitType">UnitType</h2>
<!-- backwards compatibility -->
<a id="schemaunittype"></a>
<a id="schema_UnitType"></a>
<a id="tocSunittype"></a>
<a id="tocsunittype"></a>

```json
{
  "unit": "sat"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unit|string|false|none|Unit of account.|

#### Enumerated Values

|Property|Value|
|---|---|
|unit|bch|
|unit|BCH|
|unit|usd|
|unit|USD|
|unit|bit|
|unit|bits|
|unit|sat|
|unit|SAT|
|unit|sats|
|unit|satoshi|
|unit|satoshis|

<h2 id="tocS_Utxo">Utxo</h2>
<!-- backwards compatibility -->
<a id="schemautxo"></a>
<a id="schema_Utxo"></a>
<a id="tocSutxo"></a>
<a id="tocsutxo"></a>

```json
{
  "vout": 0,
  "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "satoshis": 100,
  "token": {
    "amount": 0,
    "tokenId": "string",
    "capability": "none",
    "commitment": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|vout|number|true|none|none|
|txid|string|true|none|The hash of a transaction|
|satoshis|number|true|none|none|
|token|[Token](#schematoken)|false|none|none|

<h2 id="tocS_BalanceRequest">BalanceRequest</h2>
<!-- backwards compatibility -->
<a id="schemabalancerequest"></a>
<a id="schema_BalanceRequest"></a>
<a id="tocSbalancerequest"></a>
<a id="tocsbalancerequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "slpSemiAware": true,
  "unit": "sat"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId to get a balance for.|
|slpSemiAware|boolean|false|none|This flag requires an utxo to have more than 546 sats to be spendable and counted in the balance This option is not switched on by default|

<h2 id="tocS_HistoryRequest">HistoryRequest</h2>
<!-- backwards compatibility -->
<a id="schemahistoryrequest"></a>
<a id="schema_HistoryRequest"></a>
<a id="tocShistoryrequest"></a>
<a id="tocshistoryrequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "unit": "sat",
  "fromHeight": 0,
  "toHeight": -1,
  "start": 0,
  "count": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId to get a history for.|
|unit|string|false|none|Unit of account for running balance.|
|fromHeight|number|false|none|optional, if set, history will be limited. Default 0|
|toHeight|number|false|none|optional, if set, history will be limited. Default -1, meaning that all history items will be returned, including mempool|
|start|number|false|none|optional, if set, the result set will be paginated with offset `start`. Default 0|
|count|number|false|none|optional, if set, the result set will be paginated with `count`. Default -1, meaning that all history items will be returned|

#### Enumerated Values

|Property|Value|
|---|---|
|unit|bch|
|unit|BCH|
|unit|usd|
|unit|USD|
|unit|bit|
|unit|bits|
|unit|sat|
|unit|SAT|
|unit|sats|
|unit|satoshi|
|unit|satoshis|

<h2 id="tocS_Token">Token</h2>
<!-- backwards compatibility -->
<a id="schematoken"></a>
<a id="schema_Token"></a>
<a id="tocStoken"></a>
<a id="tocstoken"></a>

```json
{
  "amount": 0,
  "tokenId": "string",
  "capability": "none",
  "commitment": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|amount|number|false|none|Fungible token amount|
|tokenId|string|false|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|capability|string¦null|false|none|Capability of the NFT|
|commitment|string¦null|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<h2 id="tocS_InOutput">InOutput</h2>
<!-- backwards compatibility -->
<a id="schemainoutput"></a>
<a id="schema_InOutput"></a>
<a id="tocSinoutput"></a>
<a id="tocsinoutput"></a>

```json
{
  "address": "string",
  "value": 0,
  "token": {
    "amount": 0,
    "tokenId": "string",
    "capability": "none",
    "commitment": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|address|string|false|none|address in cashaddr format|
|value|number|false|none|value in satoshis|
|token|[Token](#schematoken)|false|none|none|

<h2 id="tocS_TokenAmountChange">TokenAmountChange</h2>
<!-- backwards compatibility -->
<a id="schematokenamountchange"></a>
<a id="schema_TokenAmountChange"></a>
<a id="tocStokenamountchange"></a>
<a id="tocstokenamountchange"></a>

```json
{
  "tokenId": "string",
  "amount": 0,
  "nftAmount": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tokenId|string|false|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|amount|number|false|none|Fungible token amount|
|nftAmount|number|false|none|Non-fungible token amount|

<h2 id="tocS_TransactionHistoryItem">TransactionHistoryItem</h2>
<!-- backwards compatibility -->
<a id="schematransactionhistoryitem"></a>
<a id="schema_TransactionHistoryItem"></a>
<a id="tocStransactionhistoryitem"></a>
<a id="tocstransactionhistoryitem"></a>

```json
{
  "inputs": [
    {
      "address": "string",
      "value": 0,
      "token": {
        "amount": 0,
        "tokenId": "string",
        "capability": "none",
        "commitment": "string"
      }
    }
  ],
  "outputs": [
    {
      "address": "string",
      "value": 0,
      "token": {
        "amount": 0,
        "tokenId": "string",
        "capability": "none",
        "commitment": "string"
      }
    }
  ],
  "blockheight": 0,
  "timestamp": "string",
  "hash": "string",
  "size": 0,
  "fee": 0,
  "balance": 0,
  "valueChange": 0,
  "tokenAmountChanges": [
    {
      "tokenId": "string",
      "amount": 0,
      "nftAmount": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inputs|[[InOutput](#schemainoutput)]|false|none|none|
|outputs|[[InOutput](#schemainoutput)]|false|none|none|
|blockheight|number|false|none|The blockheight of transaction|
|timestamp|string¦null|false|none|The timestamp of transaction, undefined if unconfirmed|
|hash|string|false|none|The hash of the transaction|
|size|number|false|none|The size of the transaction|
|fee|number|false|none|Transaction fee|
|balance|number|false|none|A running balance, in units|
|valueChange|number|false|none|Change of value in the transaction, in units|
|tokenAmountChanges|[[TokenAmountChange](#schematokenamountchange)]|false|none|none|

<h2 id="tocS_SendRequestItem">SendRequestItem</h2>
<!-- backwards compatibility -->
<a id="schemasendrequestitem"></a>
<a id="schema_SendRequestItem"></a>
<a id="tocSsendrequestitem"></a>
<a id="tocssendrequestitem"></a>

```json
[
  "string"
]

```

### Properties

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[anyOf]|false|none|Send request in array form ['cashadr', 100, 'sats']|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or - discriminator: UnitType.unit_type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UnitType](#schemaunittype)|false|none|Send request in object notation|
|» cashaddr|string|true|none|none|
|» value|number|true|none|none|

<h2 id="tocS_TokenSendRequest">TokenSendRequest</h2>
<!-- backwards compatibility -->
<a id="schematokensendrequest"></a>
<a id="schema_TokenSendRequest"></a>
<a id="tocStokensendrequest"></a>
<a id="tocstokensendrequest"></a>

```json
{
  "slpaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
  "amount": 100,
  "tokenId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|true|none|Cashaddress to send tokens to|
|value|number|false|none|Satoshi value to send alongside with tokens|
|amount|number|false|none|Fungible token amount to send|
|tokenId|string|true|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|capability|string|false|none|Capability of the NFT|
|commitment|string|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<h2 id="tocS_TokenGenesisRequest">TokenGenesisRequest</h2>
<!-- backwards compatibility -->
<a id="schematokengenesisrequest"></a>
<a id="schema_TokenGenesisRequest"></a>
<a id="tocStokengenesisrequest"></a>
<a id="tocstokengenesisrequest"></a>

```json
{
  "walletId": "string",
  "amount": 0,
  "capability": "none",
  "commitment": "string",
  "cashaddr": "string",
  "value": 1000,
  "sendRequests": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId to make a request to.|
|amount|number|false|none|amount of *fungible* tokens to create|
|capability|string|false|none|Capability of the new NFT|
|commitment|string|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|
|cashaddr|string|false|none|Cashaddress to send tokens to|
|value|number|false|none|Satoshi value to send alongside with tokens|
|sendRequests|any|false|none|Single or an array of extra send requests (OP_RETURN, value transfer, etc.) to include in genesis transaction.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestItem](#schemasendrequestitem)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestArray](#schemasendrequestarray)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TokenSendRequest](#schematokensendrequest)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[OpReturnData](#schemaopreturndata)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<h2 id="tocS_TokenMintRequest">TokenMintRequest</h2>
<!-- backwards compatibility -->
<a id="schematokenmintrequest"></a>
<a id="schema_TokenMintRequest"></a>
<a id="tocStokenmintrequest"></a>
<a id="tocstokenmintrequest"></a>

```json
{
  "walletId": "string",
  "tokenId": "string",
  "requests": [
    {
      "capability": "none",
      "commitment": "string",
      "cashaddr": "string",
      "value": 1000
    }
  ],
  "deductTokenAmount": false
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId to make a request to.|
|tokenId|string|true|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|requests|[object]|false|none|none|
|» capability|string|false|none|Capability of the new NFT|
|» commitment|string|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|
|» cashaddr|string|false|none|Cashaddress to send tokens to|
|» value|number|false|none|Satoshi value to send alongside with tokens|
|deductTokenAmount|boolean|false|none|if minting token contains fungible amount, deduct from it by amount of minted tokens|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<h2 id="tocS_TokenBurnRequest">TokenBurnRequest</h2>
<!-- backwards compatibility -->
<a id="schematokenburnrequest"></a>
<a id="schema_TokenBurnRequest"></a>
<a id="tocStokenburnrequest"></a>
<a id="tocstokenburnrequest"></a>

```json
{
  "walletId": "string",
  "tokenId": "string",
  "capability": "none",
  "commitment": "string",
  "amount": 0,
  "cashaddr": "string",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId to make a request to.|
|tokenId|string|true|none|Token unique hexadecimal identifier, also the id of the token creation transaction|
|capability|string|false|none|Capability of the new NFT|
|commitment|string|false|none|Token commitment message, hexadecimal encoded, 40 bytes max length|
|amount|number|false|none|amount of fungible tokens to burn|
|cashaddr|string|false|none|address to return token and satoshi change to, default to the sender's cashaddr|
|message|string|false|none|optional message to include in OP_RETURN|

#### Enumerated Values

|Property|Value|
|---|---|
|capability|none|
|capability|mutable|
|capability|minting|

<h2 id="tocS_OpReturnData">OpReturnData</h2>
<!-- backwards compatibility -->
<a id="schemaopreturndata"></a>
<a id="schema_OpReturnData"></a>
<a id="tocSopreturndata"></a>
<a id="tocsopreturndata"></a>

```json
[
  "string"
]

```

### Properties

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[anyOf]|false|none|OP_RETURN message in format ['OP_RETURN', 'MEMO\x10LÖL😅'] or ['OP_RETURNB64', 'TUVNTxBMw5ZM8J+YhQ==']|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(byte)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|any|false|none|OP_RETURN message in object notation, either in plain text or as a base64 encoded byte buffer If buffer lacks the OP_RETURN and OP_PUSHDATA opcodes, they will be prepended.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» dataString|string|true|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» dataBuffer|string(byte)|true|none|none|

<h2 id="tocS_SendRequestArray">SendRequestArray</h2>
<!-- backwards compatibility -->
<a id="schemasendrequestarray"></a>
<a id="schema_SendRequestArray"></a>
<a id="tocSsendrequestarray"></a>
<a id="tocssendrequestarray"></a>

```json
[
  [
    "string"
  ]
]

```

### Properties

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[SendRequestItem](#schemasendrequestitem)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TokenSendRequest](#schematokensendrequest)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[OpReturnData](#schemaopreturndata)|false|none|none|

<h2 id="tocS_CashscriptReceipt">CashscriptReceipt</h2>
<!-- backwards compatibility -->
<a id="schemacashscriptreceipt"></a>
<a id="schema_CashscriptReceipt"></a>
<a id="tocScashscriptreceipt"></a>
<a id="tocscashscriptreceipt"></a>

```json
{
  "to": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
  "amount": 100
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|to|string|false|none|none|
|amount|number|false|none|none|

<h2 id="tocS_CashscriptReceiptArray">CashscriptReceiptArray</h2>
<!-- backwards compatibility -->
<a id="schemacashscriptreceiptarray"></a>
<a id="schema_CashscriptReceiptArray"></a>
<a id="tocScashscriptreceiptarray"></a>
<a id="tocscashscriptreceiptarray"></a>

```json
[
  {
    "to": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
    "amount": 100
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CashscriptReceipt](#schemacashscriptreceipt)]|false|none|none|

<h2 id="tocS_ContractFnRequest">ContractFnRequest</h2>
<!-- backwards compatibility -->
<a id="schemacontractfnrequest"></a>
<a id="schema_ContractFnRequest"></a>
<a id="tocScontractfnrequest"></a>
<a id="tocscontractfnrequest"></a>

```json
{
  "contractId": "string",
  "action": "send",
  "function": "string",
  "arguments": [
    "string"
  ],
  "to": [
    "string"
  ],
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ],
  "opReturn": [
    "string"
  ],
  "feePerByte": 0,
  "hardcodedFee": 0,
  "minChange": 0,
  "withoutChange": false,
  "age": 0,
  "time": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|true|none|serialized contract|
|action|string|false|none|In addition to `send`ing the built transaction, the built transaction hex may be returned (without broadcasting) with `build` action.|
|function|string|true|none|Function to call on the cashscript contract.|
|arguments|[string]|false|none|Arguments for the contract function call as strings.  Binary data should be passed as hexidecimal. <br>Signatures may be passed as wallet import format (WIF) or wallet strings (walletId). Cashscript expects `pubkey`s to be compressed 35 byte values.|
|to|any|true|none|The output destination, as a SendRequest, cashscript style output(s), array of either.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestItem](#schemasendrequestitem)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestArray](#schemasendrequestarray)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CashscriptReceipt](#schemacashscriptreceipt)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CashscriptReceiptArray](#schemacashscriptreceiptarray)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|utxoIds|[string]|false|none|Serialized utxoId(s) to spend from|
|opReturn|[string]|false|none|Add OP_RETURN outputs to the transaction. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withopreturn)|
|feePerByte|number|false|none|The withFeePerByte() function allows you to specify the fee per per bytes for the transaction. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withfeeperbyte)|
|hardcodedFee|number|false|none|Specify a hardcoded fee to the transaction. By default the transaction fee is automatically calculated by the CashScript SDK. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withhardcodedfee)|
|minChange|number|false|none|Set a threshold for including a change output. Any remaining amount under this threshold will be added to the transaction fee instead. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withminchange)|
|withoutChange|boolean|false|none|Disable the change output. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withoutchange)|
|age|number|false|none|Specify the minimum age of the transaction inputs. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withage)|
|time|number|false|none|Specify the minimum block number that the transaction can be included in. See [cashscript docs](https://cashscript.org/docs/sdk/transactions#withtime)|

#### Enumerated Values

|Property|Value|
|---|---|
|action|build|
|action|send|

<h2 id="tocS_ContractFnResponse">ContractFnResponse</h2>
<!-- backwards compatibility -->
<a id="schemacontractfnresponse"></a>
<a id="schema_ContractFnResponse"></a>
<a id="tocScontractfnresponse"></a>
<a id="tocscontractfnresponse"></a>

```json
{
  "contractId": "string",
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "hex": "0200000001f6d804c0a2f33936dd8b535d1... bdf0e43b30135be5251"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|false|none|serialized contract|
|txId|string|false|none|The hash of a transaction|
|hex|string|false|none|The transaction as bitcoin encoded hex.|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "message": "An server error occurred",
  "code": 500
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|code|number|false|none|none|

<h2 id="tocS_NetworkEnum">NetworkEnum</h2>
<!-- backwards compatibility -->
<a id="schemanetworkenum"></a>
<a id="schema_NetworkEnum"></a>
<a id="tocSnetworkenum"></a>
<a id="tocsnetworkenum"></a>

```json
{
  "network": "testnet"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|network|string|false|none|network type|

#### Enumerated Values

|Property|Value|
|---|---|
|network|mainnet|
|network|testnet|
|network|regtest|

<h2 id="tocS_ContractRequest">ContractRequest</h2>
<!-- backwards compatibility -->
<a id="schemacontractrequest"></a>
<a id="schema_ContractRequest"></a>
<a id="tocScontractrequest"></a>
<a id="tocscontractrequest"></a>

```json
{
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ],
  "network": "testnet"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|script|string|true|none|The smart contract in cashscript syntax|
|parameters|[string]|true|none|Parameters to construct the contract|

<h2 id="tocS_ContractResponse">ContractResponse</h2>
<!-- backwards compatibility -->
<a id="schemacontractresponse"></a>
<a id="schema_ContractResponse"></a>
<a id="tocScontractresponse"></a>
<a id="tocscontractresponse"></a>

```json
{
  "contractId": "testnet:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok5EZ3dOVE01TWpreg==:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNS4zOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:480539293",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|false|none|serialized contract|
|cashaddr|any|false|none|The funding address for the contract|

<h2 id="tocS_EscrowRequest">EscrowRequest</h2>
<!-- backwards compatibility -->
<a id="schemaescrowrequest"></a>
<a id="schema_EscrowRequest"></a>
<a id="tocSescrowrequest"></a>
<a id="tocsescrowrequest"></a>

```json
{
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|buyerAddr|any|true|none|The cashaddress of the buyer|
|arbiterAddr|any|true|none|The cashaddress of the arbiter|
|sellerAddr|any|true|none|The cashaddress of the seller|
|amount|number|true|none|Numeric amount to be transferred by the contract in satoshi, amount must be less than 21 BCH.|

<h2 id="tocS_EscrowResponse">EscrowResponse</h2>
<!-- backwards compatibility -->
<a id="schemaescrowresponse"></a>
<a id="schema_EscrowResponse"></a>
<a id="tocSescrowresponse"></a>
<a id="tocsescrowresponse"></a>

```json
{
  "escrowContractId": "escrowContract:testnet:WW1Ob2RHVnpkRHB4ZWpBd2NHczViR1p6TUdzNVpqVjJaak5xT0dnMk5uRm1iWEZoWjJzNGJtTTFObVZzY1RSa2RqST06WW1Ob2RHVnpkRHB4Y201c2RYVm5aVFUyWVdoNGMzazJjSEJzY1RRemNuWmhOMnMyY3psa2EyNTFOSEExTWpjNFlXZz06WW1Ob2RHVnpkRHB4ZW5Od1kzbDNlRzF0TkdaeGFHWTVhMnB5YTI1eVl6Tm5jbk4yTW5aMWEyVnhlV3B4YkdFd2JuUT06TVRBd01EQT0=:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok1UQTNOVEU0TkRjeU53PT0=:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNi4xOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:1075184727",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|escrowContractId|string|false|none|serialized escrow contract|
|cashaddr|any|false|none|The funding address for the escrow contract|

<h2 id="tocS_EscrowFnRequest">EscrowFnRequest</h2>
<!-- backwards compatibility -->
<a id="schemaescrowfnrequest"></a>
<a id="schema_EscrowFnRequest"></a>
<a id="tocSescrowfnrequest"></a>
<a id="tocsescrowfnrequest"></a>

```json
{
  "escrowContractId": "string",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "function": "spend",
  "to": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "action": "build",
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:1000"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|escrowContractId|string|true|none|serialized contract|
|walletId|string|true|none|The walletId of the transaction signer.|
|function|string|true|none|Function to call on the escrow contract.|
|to|string|false|none|Output address for the transaction|
|action|any|false|none|In addition to `send`ing the built transaction, the built transaction hex may be returned (without broadcasting) with `build` action.|
|utxoIds|[string]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|function|spend|
|function|refund|
|action|build|
|action|send|

<h2 id="tocS_EscrowInfoRequest">EscrowInfoRequest</h2>
<!-- backwards compatibility -->
<a id="schemaescrowinforequest"></a>
<a id="schema_EscrowInfoRequest"></a>
<a id="tocSescrowinforequest"></a>
<a id="tocsescrowinforequest"></a>

```json
{
  "escrowContractId": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|escrowContractId|string|false|none|serialized escrow contract|

<h2 id="tocS_EscrowInfoResponse">EscrowInfoResponse</h2>
<!-- backwards compatibility -->
<a id="schemaescrowinforesponse"></a>
<a id="schema_EscrowInfoResponse"></a>
<a id="tocSescrowinforesponse"></a>
<a id="tocsescrowinforesponse"></a>

```json
{
  "escrowContractId": "escrowContract:testnet:WW1Ob2RHVnpkRHB4ZWpBd2NHczViR1p6TUdzNVpqVjJaak5xT0dnMk5uRm1iWEZoWjJzNGJtTTFObVZzY1RSa2RqST06WW1Ob2RHVnpkRHB4Y201c2RYVm5aVFUyWVdoNGMzazJjSEJzY1RRemNuWmhOMnMyY3psa2EyNTFOSEExTWpjNFlXZz06WW1Ob2RHVnpkRHB4ZW5Od1kzbDNlRzF0TkdaeGFHWTVhMnB5YTI1eVl6Tm5jbk4yTW5aMWEyVnhlV3B4YkdFd2JuUT06TVRBd01EQT0=:TVRVNExESTBNQ3d5TVRZc01Ua3hMRGMyTERNeExEazRMREUyTml3eE5EQXNOellzTVRBd0xERXlNeXd5TXpVc05qUXNOemdzTVRrekxESXhNaXc0T0N3eU5ETXNNVGszOk1qTXhMREkxTkN3eE1UTXNNalVzTVRZMkxERTROeXd4TVRVc05qUXNNVFUwTERnc01USTJMREV3TERFNU5pd3hNRGdzTWpNNUxERTNNeXd4Tmpnc01qRXNNVGd5TERFMU9RPT06TVRZd0xESTRMREUzTERFNU9Dd3lNaklzTWpNMExERTBOQ3c1TXl3ek55d3hPREFzTVRNMUxERXdOU3d4TkRNc01UY3NOalFzTWpJMExERTVOeXcxTVN3eE5UQXNNakF3Ok1UQXdNREE9Ok1UQTNOVEU0TkRjeU53PT0=:cHJhZ21hIGNhc2hzY3JpcHQgXjAuNi4xOwogICAgICAgICAgICBjb250cmFjdCBlc2Nyb3coYnl0ZXMyMCBzZWxsZXJQa2gsIGJ5dGVzMjAgYnV5ZXJQa2gsIGJ5dGVzMjAgYXJiaXRlclBraCwgaW50IGNvbnRyYWN0QW1vdW50LCBpbnQgY29udHJhY3ROb25jZSkgewoKICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNwZW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtoIHx8IGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShjaGVja1NpZyhzLCBzaWduaW5nUGspKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGFtb3VudCA+PSBjb250cmFjdEFtb3VudCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub25jZSA9PSBjb250cmFjdE5vbmNlKTsKICAgICAgICAgICAgICAgICAgICBieXRlczM0IG91dHB1dCA9IG5ldyBPdXRwdXRQMlBLSChieXRlczgoYW1vdW50KSwgc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gyNTYob3V0cHV0KSA9PSB0eC5oYXNoT3V0cHV0cyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVmdW5kKHB1YmtleSBzaWduaW5nUGssIHNpZyBzLCBpbnQgYW1vdW50LCBpbnQgbm9uY2UpIHsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGhhc2gxNjAoc2lnbmluZ1BrKSA9PSBhcmJpdGVyUGtofHxoYXNoMTYwKHNpZ25pbmdQaykgPT0gc2VsbGVyUGtoKTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGNoZWNrU2lnKHMsIHNpZ25pbmdQaykpOwogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoYW1vdW50ID49IGNvbnRyYWN0QW1vdW50KTsKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vbmNlID09IGNvbnRyYWN0Tm9uY2UpOwogICAgICAgICAgICAgICAgICAgIGJ5dGVzMzQgb3V0cHV0ID0gbmV3IE91dHB1dFAyUEtIKGJ5dGVzOChhbW91bnQpLCBidXllclBraCk7CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShoYXNoMjU2KG91dHB1dCkgPT0gdHguaGFzaE91dHB1dHMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAg:1075184727",
  "script": "pragma cashscript ^0.6.1;\ncontract escrow(bytes20 sellerPkh, bytes20 buyerPkh, bytes20 arbiterPkh, int contractAmount, int contractNonce) {\n\n    function spend(pubkey signingPk, sig s, int amount, int nonce) {\n        require(hash160(signingPk) == arbiterPkh || hash160(signingPk) == buyerPkh);\n        require(checkSig(s, signingPk));\n        require(amount >= contractAmount);\n        require(nonce == contractNonce);\n        bytes34 output = new OutputP2PKH(bytes8(amount), sellerPkh);\n        require(hash256(output) == tx.hashOutputs);\n    }\n\n    function refund(pubkey signingPk, sig s, int amount, int nonce) {\n        require(hash160(signingPk) == arbiterPkh||hash160(signingPk) == sellerPkh);\n        require(checkSig(s, signingPk));\n        require(amount >= contractAmount);\n        require(nonce == contractNonce);\n        bytes34 output = new OutputP2PKH(bytes8(amount), buyerPkh);\n        require(hash256(output) == tx.hashOutputs);\n    }\n}\n",
  "parameters": [
    "9ef0d8bf4c1f62a68c4c647beb404ec1d458f3c5",
    "e7fe7119a6bb73409a087e0ac46cefada815b69f",
    "a01c11c6deea905d25b487698f1140e0c53396c8",
    10000,
    1996128042
  ],
  "cashaddr": "bchtest:prxla49zwqm8m2nzgn82qza3ssrqnpt8vgv60hlwm2",
  "buyerAddr": "bchtest:qrnluuge56ahxsy6pplq43rva7k6s9dknu4p5278ah",
  "arbiterAddr": "bchtest:qzspcywxmm4fqhf9kjrknrc3grsv2vukeqyjqla0nt",
  "sellerAddr": "bchtest:qz00pk9lfs0k9f5vf3j8h66qfmqagk8nc56elq4dv2",
  "amount": 10000,
  "nonce": 1996128042
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|escrowContractId|string|false|none|serialized escrow contract|
|script|string|false|none|The escrow contract in cashscript syntax|
|parameters|[string]|false|none|Parameters passed when the contract was created|
|cashaddr|string|false|none|none|
|buyerAddr|any|false|none|The cashaddress of the buyer|
|arbiterAddr|any|false|none|The cashaddress of the arbiter|
|sellerAddr|any|false|none|The cashaddress of the seller|
|amount|number|false|none|Numeric amount to be transferred by the contract in satoshi, amount must be less than 21 BCH.|
|nonce|number|false|none|A unique number used once for each instance of a contract.|

<h2 id="tocS_EscrowContract">EscrowContract</h2>
<!-- backwards compatibility -->
<a id="schemaescrowcontract"></a>
<a id="schema_EscrowContract"></a>
<a id="tocSescrowcontract"></a>
<a id="tocsescrowcontract"></a>

```json
{
  "escrowContractId": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|escrowContractId|string|true|none|serialized escrow contract|

<h2 id="tocS_UtxoResponse">UtxoResponse</h2>
<!-- backwards compatibility -->
<a id="schemautxoresponse"></a>
<a id="schema_UtxoResponse"></a>
<a id="tocSutxoresponse"></a>
<a id="tocsutxoresponse"></a>

```json
[
  {
    "vout": 0,
    "txid": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
    "satoshis": 100,
    "token": {
      "amount": 0,
      "tokenId": "string",
      "capability": "none",
      "commitment": "string"
    }
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Utxo](#schemautxo)]|false|none|none|

<h2 id="tocS_ContractInfoRequest">ContractInfoRequest</h2>
<!-- backwards compatibility -->
<a id="schemacontractinforequest"></a>
<a id="schema_ContractInfoRequest"></a>
<a id="tocScontractinforequest"></a>
<a id="tocscontractinforequest"></a>

```json
{
  "contractId": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|false|none|serialized contract|

<h2 id="tocS_ContractInfoResponse">ContractInfoResponse</h2>
<!-- backwards compatibility -->
<a id="schemacontractinforesponse"></a>
<a id="schema_ContractInfoResponse"></a>
<a id="tocScontractinforesponse"></a>
<a id="tocscontractinforesponse"></a>

```json
{
  "contractId": "string",
  "script": "contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {\n    function transfer(sig recipientSig) {\n        require(checkSig(recipientSig, recipient));\n    }\n\n    function timeout(sig senderSig) {\n        require(checkSig(senderSig, sender));\n        require(tx.time >= timeout);\n    }\n}\n",
  "parameters": [
    "03410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a7",
    "034978ac464f358b235f11212eb6e017af90215b90b1ff7471d9ae2abb5e09263b",
    215
  ],
  "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
  "tokenaddr": "bchreg:zpttdv3qg2usm4nm7talhxhl05mlhms3ysjm0q59vu"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|false|none|serialized contract|
|script|string|false|none|The smart contract in cashscript syntax|
|parameters|[string]|false|none|Parameters passed when the contract was created|
|cashaddr|string|false|none|none|
|tokenaddr|string|false|none|none|

<h2 id="tocS_Contract">Contract</h2>
<!-- backwards compatibility -->
<a id="schemacontract"></a>
<a id="schema_Contract"></a>
<a id="tocScontract"></a>
<a id="tocscontract"></a>

```json
{
  "contractId": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contractId|string|true|none|serialized contract|

<h2 id="tocS_GetTestnetBchRequest">GetTestnetBchRequest</h2>
<!-- backwards compatibility -->
<a id="schemagettestnetbchrequest"></a>
<a id="schema_GetTestnetBchRequest"></a>
<a id="tocSgettestnetbchrequest"></a>
<a id="tocsgettestnetbchrequest"></a>

```json
{
  "cashaddr": "bchtest:qqm4gsaa2gvk7flvsvj7f0w4rlq32vqhkq27mxesg8"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|false|none|Receiver's cashaddr|

<h2 id="tocS_GetTestnetBchResponse">GetTestnetBchResponse</h2>
<!-- backwards compatibility -->
<a id="schemagettestnetbchresponse"></a>
<a id="schema_GetTestnetBchResponse"></a>
<a id="tocSgettestnetbchresponse"></a>
<a id="tocsgettestnetbchresponse"></a>

```json
{
  "txId": "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|txId|string|false|none|Transaction id|

<h2 id="tocS_GetAddressesResponse">GetAddressesResponse</h2>
<!-- backwards compatibility -->
<a id="schemagetaddressesresponse"></a>
<a id="schema_GetAddressesResponse"></a>
<a id="tocSgetaddressesresponse"></a>
<a id="tocsgetaddressesresponse"></a>

```json
{
  "bchtest": "bchtest:qzxkd5achtj6v46m9vdqv6gj2pvrac5q0qd2qqa2ga"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bchtest|string|false|none|Cashaddr to return testnet BCH|

<h2 id="tocS_MineRequest">MineRequest</h2>
<!-- backwards compatibility -->
<a id="schemaminerequest"></a>
<a id="schema_MineRequest"></a>
<a id="tocSminerequest"></a>
<a id="tocsminerequest"></a>

```json
{
  "cashaddr": "bchreg:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "blocks": 105
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|false|none|none|
|blocks|number|false|none|the number of blocks to mine|

<h2 id="tocS_ConvertRequest">ConvertRequest</h2>
<!-- backwards compatibility -->
<a id="schemaconvertrequest"></a>
<a id="schema_ConvertRequest"></a>
<a id="tocSconvertrequest"></a>
<a id="tocsconvertrequest"></a>

```json
{
  "value": 100,
  "from": "bch",
  "to": "usd"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value|number|true|none|none|
|from|string|true|none|Provided value unit of account.|
|to|string|true|none|Unit of account to be returned|

#### Enumerated Values

|Property|Value|
|---|---|
|from|bch|
|from|BCH|
|from|usd|
|from|USD|
|from|bit|
|from|bits|
|from|sat|
|from|SAT|
|from|sats|
|from|satoshi|
|from|satoshis|
|to|bch|
|to|BCH|
|to|usd|
|to|USD|
|to|bit|
|to|bits|
|to|sat|
|to|SAT|
|to|sats|
|to|satoshi|
|to|satoshis|

<h2 id="tocS_getAddrsByXpubKeyRequest">getAddrsByXpubKeyRequest</h2>
<!-- backwards compatibility -->
<a id="schemagetaddrsbyxpubkeyrequest"></a>
<a id="schema_getAddrsByXpubKeyRequest"></a>
<a id="tocSgetaddrsbyxpubkeyrequest"></a>
<a id="tocsgetaddrsbyxpubkeyrequest"></a>

```json
{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj",
  "path": "0/0",
  "count": 3
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|xpubkey|string|false|none|none|
|path|string|false|none|none|
|count|number|false|none|none|

<h2 id="tocS_getAddrsByXpubKeyResponse">getAddrsByXpubKeyResponse</h2>
<!-- backwards compatibility -->
<a id="schemagetaddrsbyxpubkeyresponse"></a>
<a id="schema_getAddrsByXpubKeyResponse"></a>
<a id="tocSgetaddrsbyxpubkeyresponse"></a>
<a id="tocsgetaddrsbyxpubkeyresponse"></a>

```json
[
  "bitcoincash:qrvcdmgpk73zyfd8pmdl9wnuld36zh9n4gms8s0u59",
  "bitcoincash:qp4wzvqu73x22ft4r5tk8tz0aufdz9fescwtpcmhc7",
  "bitcoincash:qr0kwqzf2h3wvjjhn4pg895lrxwp96wqgyhkksq2nh"
]

```

### Properties

*None*

<h2 id="tocS_getXpubKeyInfoRequest">getXpubKeyInfoRequest</h2>
<!-- backwards compatibility -->
<a id="schemagetxpubkeyinforequest"></a>
<a id="schema_getXpubKeyInfoRequest"></a>
<a id="tocSgetxpubkeyinforequest"></a>
<a id="tocsgetxpubkeyinforequest"></a>

```json
{
  "xpubkey": "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|xpubkey|string|false|none|none|

<h2 id="tocS_getXpubKeyInfoResponse">getXpubKeyInfoResponse</h2>
<!-- backwards compatibility -->
<a id="schemagetxpubkeyinforesponse"></a>
<a id="schema_getXpubKeyInfoResponse"></a>
<a id="tocSgetxpubkeyinforesponse"></a>
<a id="tocsgetxpubkeyinforesponse"></a>

```json
{
  "version": "mainnet",
  "depth": 3,
  "parentFingerprint": "155bca59",
  "childNumber": "2147483648,",
  "chain": "3da4bc190a2680111d31fadfdc905f2a7f6ce77c6f109919116f253d43445219",
  "data": "03774c910fcf07fa96886ea794f0d5caed9afe30b44b83f7e213bb92930e7df4bd",
  "fingerprint": "6cc9f252"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|string|false|none|none|
|depth|number|false|none|none|
|parentFingerprint|string|false|none|the first four bytes of the public key as hex|
|data|string|false|none|the public key as hex|
|chain|any|false|none|The chain code, 32 bytes of entrophy extended for the public key|

<h2 id="tocS_WalletRequest">WalletRequest</h2>
<!-- backwards compatibility -->
<a id="schemawalletrequest"></a>
<a id="schema_WalletRequest"></a>
<a id="tocSwalletrequest"></a>
<a id="tocswalletrequest"></a>

```json
{
  "type": "seed",
  "network": "testnet",
  "name": "username1"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|User defined string for wallet|

allOf - discriminator: NetworkEnum.network

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[NetworkEnum](#schemanetworkenum)|false|none|none|

and - discriminator: WalletType.wallet_type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[WalletType](#schemawallettype)|false|none|none|

<h2 id="tocS_WalletType">WalletType</h2>
<!-- backwards compatibility -->
<a id="schemawallettype"></a>
<a id="schema_WalletType"></a>
<a id="tocSwallettype"></a>
<a id="tocswallettype"></a>

```json
{
  "type": "seed"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Wallet type, either a mnemonic seed single address wallet, a simple private key (wif) or a *Hierarchical Deterministic wallet determined from a seed (not yet implemented)* .|

#### Enumerated Values

|Property|Value|
|---|---|
|type|wif|
|type|hd|
|type|seed|
|type|watch|
|type|privkey|

<h2 id="tocS_WalletReplaceNamedRequest">WalletReplaceNamedRequest</h2>
<!-- backwards compatibility -->
<a id="schemawalletreplacenamedrequest"></a>
<a id="schema_WalletReplaceNamedRequest"></a>
<a id="tocSwalletreplacenamedrequest"></a>
<a id="tocswalletreplacenamedrequest"></a>

```json
{
  "name": "walletName",
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "network": "testnet",
  "type": "seed"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|User friendly wallet alias|
|walletId|string|false|none|The walletId of the source of funds to spend from.|

allOf - discriminator: NetworkEnum.network

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[NetworkEnum](#schemanetworkenum)|false|none|none|

and - discriminator: WalletType.wallet_type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[WalletType](#schemawallettype)|false|none|none|

<h2 id="tocS_WalletNamedExistsRequest">WalletNamedExistsRequest</h2>
<!-- backwards compatibility -->
<a id="schemawalletnamedexistsrequest"></a>
<a id="schema_WalletNamedExistsRequest"></a>
<a id="tocSwalletnamedexistsrequest"></a>
<a id="tocswalletnamedexistsrequest"></a>

```json
{
  "name": "walletName",
  "network": "testnet",
  "type": "seed"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|User friendly wallet alias|

allOf - discriminator: NetworkEnum.network

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[NetworkEnum](#schemanetworkenum)|false|none|none|

and - discriminator: WalletType.wallet_type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[WalletType](#schemawallettype)|false|none|none|

<h2 id="tocS_Wif">Wif</h2>
<!-- backwards compatibility -->
<a id="schemawif"></a>
<a id="schema_Wif"></a>
<a id="tocSwif"></a>
<a id="tocswif"></a>

```json
{
  "wif": "cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|wif|string|false|none|The wallet in Wallet Import Format (WIF)|

<h2 id="tocS_WalletMnemonic">WalletMnemonic</h2>
<!-- backwards compatibility -->
<a id="schemawalletmnemonic"></a>
<a id="schema_WalletMnemonic"></a>
<a id="tocSwalletmnemonic"></a>
<a id="tocswalletmnemonic"></a>

```json
{
  "seed": "string",
  "derivationPath": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|seed|string|false|none|none|
|derivationPath|string|false|none|none|

<h2 id="tocS_WalletResponse">WalletResponse</h2>
<!-- backwards compatibility -->
<a id="schemawalletresponse"></a>
<a id="schema_WalletResponse"></a>
<a id="tocSwalletresponse"></a>
<a id="tocswalletresponse"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "name": "username1",
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "wif": "cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "network": "testnet"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|false|none|All the information necessary to reconstruct a wallet, including private information, type and network.|
|name|string|false|none|User defined string for wallet|
|cashaddr|string|false|none|The address in cashaddr format.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Wif](#schemawif)|false|none|none|

or - discriminator: WalletMnemonic.seed

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[WalletMnemonic](#schemawalletmnemonic)|false|none|none|

<h2 id="tocS_WalletReplaceNamedResponse">WalletReplaceNamedResponse</h2>
<!-- backwards compatibility -->
<a id="schemawalletreplacenamedresponse"></a>
<a id="schema_WalletReplaceNamedResponse"></a>
<a id="tocSwalletreplacenamedresponse"></a>
<a id="tocswalletreplacenamedresponse"></a>

```json
true

```

True if operation was successful
False if service database was not configured or other exception occured

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|boolean|false|none|True if operation was successful<br>False if service database was not configured or other exception occured|
|result|boolean|false|none|none|

<h2 id="tocS_WalletNamedExistsResponse">WalletNamedExistsResponse</h2>
<!-- backwards compatibility -->
<a id="schemawalletnamedexistsresponse"></a>
<a id="schema_WalletNamedExistsResponse"></a>
<a id="tocSwalletnamedexistsresponse"></a>
<a id="tocswalletnamedexistsresponse"></a>

```json
true

```

Boolean true or false

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|boolean|false|none|Boolean true or false|
|result|boolean|false|none|none|

<h2 id="tocS_SerializedWallet">SerializedWallet</h2>
<!-- backwards compatibility -->
<a id="schemaserializedwallet"></a>
<a id="schema_SerializedWallet"></a>
<a id="tocSserializedwallet"></a>
<a id="tocsserializedwallet"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|ID that is returned in `wallet` field of /wallet call|

<h2 id="tocS_WalletInfo">WalletInfo</h2>
<!-- backwards compatibility -->
<a id="schemawalletinfo"></a>
<a id="schema_WalletInfo"></a>
<a id="tocSwalletinfo"></a>
<a id="tocswalletinfo"></a>

```json
{
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys0d2lessf",
  "tokenaddr": "bchreg:zpttdv3qg2usm4nm7talhxhl05mlhms3ysjm0q59vu",
  "isTestnet": true,
  "name": "",
  "network": "testnet",
  "seed": "empty solar plunge document bridge announce purse erupt joy vague illegal angle",
  "derivationPath": "m/44'/0'/0'/0/0",
  "publicKey": "04410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a72e8d04d8a1634f35a05d6bd59d20c545e165f5d7dd6043fe3e843e7ec547b6df",
  "publicKeyHash": "56b6b22042b90dd67bf2fbfb9aff7d37fbee1124",
  "privateKey": "207efc5233effadd4f2df00410526dc4d0ca901ca8f0b7a1e92a42d3baf14e7f",
  "privateKeyWif": "cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "walletId": "wif:testnet:empty solar plunge document bridge announce purse erupt joy vague illegal angle:m/44'/0'/0'/0/0",
  "walletDbEntry": "wif:testnet:empty solar plunge document bridge announce purse erupt joy vague illegal angle:m/44'/0'/0'/0/0"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|false|none|none|
|tokenaddr|string|false|none|none|
|isTestnet|boolean|false|none|Whether the agreed value of the network is zero. True for all non-mainnet networks.|
|name|string|false|none|none|
|publicKey|string|false|none|none|
|publicKeyHash|string|false|none|none|
|privateKey|string|false|none|none|
|privateKeyWif|string|false|none|none|
|seed|string|false|none|none|
|derivationPath|string|false|none|none|
|walletId|string|false|none|none|
|walletDbEntry|string|false|none|The serialized form with private information|

<h2 id="tocS_BalanceResponse">BalanceResponse</h2>
<!-- backwards compatibility -->
<a id="schemabalanceresponse"></a>
<a id="schema_BalanceResponse"></a>
<a id="tocSbalanceresponse"></a>
<a id="tocsbalanceresponse"></a>

```json
{
  "bch": 1,
  "sat": 100000000,
  "usd": 438.02
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bch|number(float)|false|none|Amount in whole Bitcoin Cash|
|sat|integer|false|none|Amount in satoshis|
|usd|number|false|none|Amount in United States Dollars|

<h2 id="tocS_MaxAmountToSendRequest">MaxAmountToSendRequest</h2>
<!-- backwards compatibility -->
<a id="schemamaxamounttosendrequest"></a>
<a id="schema_MaxAmountToSendRequest"></a>
<a id="tocSmaxamounttosendrequest"></a>
<a id="tocsmaxamounttosendrequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "output_count": 0,
  "options": {
    "slpSemiAware": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|ID that is returned in `wallet` field of /wallet call|
|output_count|integer(int32)|false|none|(optional) if sending all funds to multiple addresses, the<br>count of the number of address funds will be sent<br>to may be included.|
|options|object|false|none|none|
|» slpSemiAware|boolean|false|none|This flag requires an utxo to have more than 546 sats to be spendable and counted in the balance This option is not switched on by default|

<h2 id="tocS_DepositAddressResponse">DepositAddressResponse</h2>
<!-- backwards compatibility -->
<a id="schemadepositaddressresponse"></a>
<a id="schema_DepositAddressResponse"></a>
<a id="tocSdepositaddressresponse"></a>
<a id="tocsdepositaddressresponse"></a>

```json
{
  "cashaddr": "bchtest:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|false|none|none|

<h2 id="tocS_ScalableVectorGraphic">ScalableVectorGraphic</h2>
<!-- backwards compatibility -->
<a id="schemascalablevectorgraphic"></a>
<a id="schema_ScalableVectorGraphic"></a>
<a id="tocSscalablevectorgraphic"></a>
<a id="tocsscalablevectorgraphic"></a>

```json
{
  "src": "data:image/svg+xml;base64,PD94bWwgdm... ==**",
  "title": "bitcoincash:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0",
  "alt": "A Bitcoin Cash Qr Code"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|src|string|false|none|A Qr code image data in svg format as utf-8 encoded string.<br>Suitable for inclusion in html using:<br>    - \<img src\=\"**data:image/svg+xml;base64,PD94bWwgdm... ==**"\>|
|title|string|false|none|hover text for graphic|
|alt|string|false|none|assistive text|

<h2 id="tocS_SerializedUtxo">SerializedUtxo</h2>
<!-- backwards compatibility -->
<a id="schemaserializedutxo"></a>
<a id="schema_SerializedUtxo"></a>
<a id="tocSserializedutxo"></a>
<a id="tocsserializedutxo"></a>

```json
"1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:5000"

```

Serialized unspent outpoint

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Serialized unspent outpoint|

<h2 id="tocS_SendRequestOptions">SendRequestOptions</h2>
<!-- backwards compatibility -->
<a id="schemasendrequestoptions"></a>
<a id="schema_SendRequestOptions"></a>
<a id="tocSsendrequestoptions"></a>
<a id="tocssendrequestoptions"></a>

```json
{
  "utxoIds": [
    "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:5000"
  ],
  "changeAddress": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
  "slpSemiAware": true,
  "queryBalance": false,
  "awaitTransactionPropagation": false,
  "feePaidBy": "change",
  "checkTokenQuantities": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|utxoIds|[[SerializedUtxo](#schemaserializedutxo)]|false|none|[Serialized unspent outpoint]|
|changeAddress|string|false|none|Cash address to receive change to|
|slpSemiAware|boolean|false|none|This flag requires an utxo to have more than 546 sats to be spendable and counted in the balance This option is not switched on by default|
|queryBalance|boolean|false|none|A boolean flag to include the wallet balance after the successful `send` operation to the returned result If set to false, the balance will not be queried and returned, making the `send` call faster|
|awaitTransactionPropagation|boolean|false|none|A boolean flag to wait for transaction to propagate through the network and be registered in the bitcoind and indexer. If set to false, the `send` call will be very fast, but the wallet UTXO state might be invalid for some 500ms.|
|feePaidBy|string|false|none|Fee allocation stragety. Convenience option to subtract fees from outputs if change is not sufficent to cover transaction costs.<br>  * `change` - Change, pay the fees from change or error<br>  * `firstOutput` - First Output, pay the fee from the first output or error<br>  * `lastOutput` - Last Output, pay the fee from the last output or error<br>  * `anyOutput` - Any Output, pay the fee from dust outputs or divide across all remaining non-dust outputs.<br>  * `changeThenFirst` - Use change then first output or error.<br>  * `changeThenLast` - Use change then last output or error.<br>  * `changeThenAny` - Use change then any output stragety or error.|
|checkTokenQuantities|boolean|false|none|Check that sum of input amounts and output amount for each token category matches. Prevents accidental burns.|

#### Enumerated Values

|Property|Value|
|---|---|
|feePaidBy|change|
|feePaidBy|firstOutput|
|feePaidBy|anyOutputs|
|feePaidBy|lastOutput|
|feePaidBy|changeThenFirst|
|feePaidBy|changeThenAny|
|feePaidBy|changeThenLast|

<h2 id="tocS_SendRequest">SendRequest</h2>
<!-- backwards compatibility -->
<a id="schemasendrequest"></a>
<a id="schema_SendRequest"></a>
<a id="tocSsendrequest"></a>
<a id="tocssendrequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "to": {
    "unit": "sat",
    "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t",
    "value": 1000
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|false|none|The walletId of the source of funds to spend from.|
|to|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestItem](#schemasendrequestitem)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestArray](#schemasendrequestarray)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TokenSendRequest](#schematokensendrequest)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[OpReturnData](#schemaopreturndata)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|options|[SendRequestOptions](#schemasendrequestoptions)|false|none|none|

<h2 id="tocS_SendResponse">SendResponse</h2>
<!-- backwards compatibility -->
<a id="schemasendresponse"></a>
<a id="schema_SendResponse"></a>
<a id="tocSsendresponse"></a>
<a id="tocssendresponse"></a>

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 1,
    "sat": 100000000,
    "usd": 438.02
  },
  "explorerUrl": "https://www.blockchain.com/bch-testnet/tx/1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "tokenIds": [
    [
      "132731d90ac4c88a79d55eae2ad92709b415de886329e958cf35fdd81ba34c15"
    ]
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|txId|string|false|none|The hash of a transaction|
|balance|[BalanceResponse](#schemabalanceresponse)|false|none|none|
|explorerUrl|string|false|none|Web url to a transaction on a block explorer|
|tokenIds|[string]|false|none|none|

<h2 id="tocS_SendMaxRequest">SendMaxRequest</h2>
<!-- backwards compatibility -->
<a id="schemasendmaxrequest"></a>
<a id="schema_SendMaxRequest"></a>
<a id="tocSsendmaxrequest"></a>
<a id="tocssendmaxrequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "cashaddr": "bchtest:qpalhxhl05mlhms3ys43u76rn0ttdv3qg2usm4nm7t"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|The walletId of the sender|
|cashaddr|string|true|none|none|
|options|[SendRequestOptions](#schemasendrequestoptions)|false|none|none|

<h2 id="tocS_ZeroBalanceResponse">ZeroBalanceResponse</h2>
<!-- backwards compatibility -->
<a id="schemazerobalanceresponse"></a>
<a id="schema_ZeroBalanceResponse"></a>
<a id="tocSzerobalanceresponse"></a>
<a id="tocszerobalanceresponse"></a>

```json
{
  "bch": 0,
  "sat": 0,
  "usd": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bch|number(float)|false|none|Amount in whole Bitcoin Cash|
|sat|integer|false|none|Amount in satoshis|
|usd|number|false|none|Amount in United States Dollars|

<h2 id="tocS_SendMaxResponse">SendMaxResponse</h2>
<!-- backwards compatibility -->
<a id="schemasendmaxresponse"></a>
<a id="schema_SendMaxResponse"></a>
<a id="tocSsendmaxresponse"></a>
<a id="tocssendmaxresponse"></a>

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f",
  "balance": {
    "bch": 0,
    "sat": 0,
    "usd": 0
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|txId|string|false|none|The hash of a transaction|
|balance|[ZeroBalanceResponse](#schemazerobalanceresponse)|false|none|none|

<h2 id="tocS_EncodeTransactionRequest">EncodeTransactionRequest</h2>
<!-- backwards compatibility -->
<a id="schemaencodetransactionrequest"></a>
<a id="schema_EncodeTransactionRequest"></a>
<a id="tocSencodetransactionrequest"></a>
<a id="tocsencodetransactionrequest"></a>

```json
{
  "walletId": "wif:testnet:cNfsPtqN2bMRS7vH5qd8tR8GMvgXyL5BjnGAKgZ8DYEiCrCCQcP6",
  "discardChange": false,
  "to": [
    "string"
  ],
  "options": {
    "utxoIds": [
      "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f:0:5000"
    ],
    "changeAddress": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
    "slpSemiAware": true,
    "queryBalance": false,
    "awaitTransactionPropagation": false,
    "feePaidBy": "change",
    "checkTokenQuantities": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|false|none|The walletId of the source of funds to spend from.|
|discardChange|boolean|false|none|none|
|to|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestItem](#schemasendrequestitem)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SendRequestArray](#schemasendrequestarray)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[OpReturnData](#schemaopreturndata)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|options|[SendRequestOptions](#schemasendrequestoptions)|false|none|none|

<h2 id="tocS_EncodeTransactionResponse">EncodeTransactionResponse</h2>
<!-- backwards compatibility -->
<a id="schemaencodetransactionresponse"></a>
<a id="schema_EncodeTransactionResponse"></a>
<a id="tocSencodetransactionresponse"></a>
<a id="tocsencodetransactionresponse"></a>

```json
{
  "transactionHex": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|transactionHex|string|true|none|encoded transaction in hex format|

<h2 id="tocS_SubmitTransactionRequest">SubmitTransactionRequest</h2>
<!-- backwards compatibility -->
<a id="schemasubmittransactionrequest"></a>
<a id="schema_SubmitTransactionRequest"></a>
<a id="tocSsubmittransactionrequest"></a>
<a id="tocssubmittransactionrequest"></a>

```json
{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "transactionHex": "string",
  "awaitPropagation": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|none|
|transactionHex|string|true|none|encoded transaction in hex format|
|awaitPropagation|boolean|false|none|A boolean flag to wait for transaction to propagate through the network and be registered in the bitcoind and indexer. If set to false, the `send` call will be very fast, but the wallet UTXO state might be invalid for some 500ms.|

<h2 id="tocS_SubmitTransactionResponse">SubmitTransactionResponse</h2>
<!-- backwards compatibility -->
<a id="schemasubmittransactionresponse"></a>
<a id="schema_SubmitTransactionResponse"></a>
<a id="tocSsubmittransactionresponse"></a>
<a id="tocssubmittransactionresponse"></a>

```json
{
  "txId": "1e6442a0d3548bb4f917721184ac1cb163ddf324e2c09f55c46ff0ba521cb89f"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|txId|string|false|none|The hash of a transaction|

<h2 id="tocS_XPubKeyRequest">XPubKeyRequest</h2>
<!-- backwards compatibility -->
<a id="schemaxpubkeyrequest"></a>
<a id="schema_XPubKeyRequest"></a>
<a id="tocSxpubkeyrequest"></a>
<a id="tocsxpubkeyrequest"></a>

```json
{
  "walletId": "seed:testnet:anchor stone process they donkey foam danger boat palace kind west cute:m/44'/0'/0'/0/0",
  "paths": [
    "m/44'/0'/0'"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|true|none|walletId for a seed wallet|
|paths|[string]|false|none|none|

<h2 id="tocS_XPubKey">XPubKey</h2>
<!-- backwards compatibility -->
<a id="schemaxpubkey"></a>
<a id="schema_XPubKey"></a>
<a id="tocSxpubkey"></a>
<a id="tocsxpubkey"></a>

```json
{
  "path": "string",
  "xpubkey": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|path|string|false|none|none|
|xpubkey|string|false|none|none|

<h2 id="tocS_XPubKeyResponse">XPubKeyResponse</h2>
<!-- backwards compatibility -->
<a id="schemaxpubkeyresponse"></a>
<a id="schema_XPubKeyResponse"></a>
<a id="tocSxpubkeyresponse"></a>
<a id="tocsxpubkeyresponse"></a>

```json
{
  "xpubkeys": [
    {
      "path": "string",
      "xpubkey": "string"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|xpubkeys|[[XPubKey](#schemaxpubkey)]|false|none|none|

<h2 id="tocS_CreateSignedMessageRequest">CreateSignedMessageRequest</h2>
<!-- backwards compatibility -->
<a id="schemacreatesignedmessagerequest"></a>
<a id="schema_CreateSignedMessageRequest"></a>
<a id="tocScreatesignedmessagerequest"></a>
<a id="tocscreatesignedmessagerequest"></a>

```json
{
  "walletId": "wif:mainnet:L1TnU2zbNaAqMoVh65Cyvmcjzbrj41Gs9iTLcWbpJCMynXuap6UN",
  "message": "Chancellor on brink of second bailout for banks"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|false|none|none|
|message|any|false|none|none|

<h2 id="tocS_SignedMessageResponseRaw">SignedMessageResponseRaw</h2>
<!-- backwards compatibility -->
<a id="schemasignedmessageresponseraw"></a>
<a id="schema_SignedMessageResponseRaw"></a>
<a id="tocSsignedmessageresponseraw"></a>
<a id="tocssignedmessageresponseraw"></a>

```json
{
  "ecdsa": "string",
  "schnorr": "string",
  "der": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ecdsa|string|false|none|Elliptic Curve Digital messageHash encoded as a base64 string|
|schnorr|string|false|none|Schnorr signature of the messageHash encoded as a base64 string, Note from libauth: Nonces are generated using RFC6979, where the Section 3.6, 16-byte ASCII "additional data" is set to Schnorr+SHA256, see https://libauth.org/interfaces/secp256k1.html#signmessagehashschnorr|
|der|string|false|none|Signature of messageHash using DER (Distinguished Encoding Rules)|

<h2 id="tocS_SignedMessageResponseDetails">SignedMessageResponseDetails</h2>
<!-- backwards compatibility -->
<a id="schemasignedmessageresponsedetails"></a>
<a id="schema_SignedMessageResponseDetails"></a>
<a id="tocSsignedmessageresponsedetails"></a>
<a id="tocssignedmessageresponsedetails"></a>

```json
{
  "recoveryId": 0,
  "compressed": true,
  "messageHash": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|recoveryId|number|false|none|A tag used for recovering the public key from a compact signature.|
|compressed|boolean|false|none|none|
|messageHash|string|false|none|The double sha256 hash of the string encoded as Bitcoin Message binary.|

<h2 id="tocS_SignedMessageResponse">SignedMessageResponse</h2>
<!-- backwards compatibility -->
<a id="schemasignedmessageresponse"></a>
<a id="schema_SignedMessageResponse"></a>
<a id="tocSsignedmessageresponse"></a>
<a id="tocssignedmessageresponse"></a>

```json
{
  "signature": "IA+oq/uGz4kKA2bNgxPcM+T216abyUiBhofMg1J8fC5BLAbbIpF2toCHaO7/LQAxhQBtu5D6ROq1JjXiRwPAASg=",
  "raw": {
    "ecdsa": "string",
    "schnorr": "string",
    "der": "string"
  },
  "details": {
    "recoveryId": 0,
    "compressed": true,
    "messageHash": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|signature|string|false|none|none|
|raw|[SignedMessageResponseRaw](#schemasignedmessageresponseraw)|false|none|none|
|details|[SignedMessageResponseDetails](#schemasignedmessageresponsedetails)|false|none|none|

<h2 id="tocS_VerifySignedMessageRequest">VerifySignedMessageRequest</h2>
<!-- backwards compatibility -->
<a id="schemaverifysignedmessagerequest"></a>
<a id="schema_VerifySignedMessageRequest"></a>
<a id="tocSverifysignedmessagerequest"></a>
<a id="tocsverifysignedmessagerequest"></a>

```json
{
  "walletId": "watch:mainnet:qqehccy89v7ftlfgr9v0zvhjzyy7eatdkqt05lt3nw",
  "message": "Chancellor on brink of second bailout for banks",
  "signature": "IA+oq/uGz4kKA2bNgxPcM+T216abyUiBhofMg1J8fC5BLAbbIpF2toCHaO7/LQAxhQBtu5D6ROq1JjXiRwPAASg="
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|walletId|string|false|none|none|
|message|string|false|none|none|
|signature|any|false|none|The base64 signature of the double sha265 hash of a bitcoin message formatted string signed using the private key associated with the related cashaddr|
|publicKey|string|false|none|If the publicKey is not recoverable from the signature, the base64 encoded public key may be passed as instead of the walletId|

<h2 id="tocS_VerifySignedMessageResponseDetails">VerifySignedMessageResponseDetails</h2>
<!-- backwards compatibility -->
<a id="schemaverifysignedmessageresponsedetails"></a>
<a id="schema_VerifySignedMessageResponseDetails"></a>
<a id="tocSverifysignedmessageresponsedetails"></a>
<a id="tocsverifysignedmessageresponsedetails"></a>

```json
{
  "signatureType": "string",
  "messageHash": "string",
  "signatureValid": true,
  "publicKeyHashMatch": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|signatureType|string|false|none|The type of signature passed|
|messageHash|string|false|none|The double sha256 hash of the string encoded as Bitcoin Message binary.|
|signatureValid|boolean|false|none|A boolean indicating whether the signature is valid for the message|
|publicKeyHashMatch|boolean|false|none|A boolean indicating whether the publicKeyHash of a recoverable signature matches the provided cashaddr, false otherwise|

<h2 id="tocS_VerifySignedMessageResponse">VerifySignedMessageResponse</h2>
<!-- backwards compatibility -->
<a id="schemaverifysignedmessageresponse"></a>
<a id="schema_VerifySignedMessageResponse"></a>
<a id="tocSverifysignedmessageresponse"></a>
<a id="tocsverifysignedmessageresponse"></a>

```json
{
  "valid": true,
  "details": {
    "signatureType": "string",
    "messageHash": "string",
    "signatureValid": true,
    "publicKeyHashMatch": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|valid|boolean|false|none|Whether the message was signed by a given address|
|details|[VerifySignedMessageResponseDetails](#schemaverifysignedmessageresponsedetails)|false|none|none|

<h2 id="tocS_UtilDecodeTransactionRequest">UtilDecodeTransactionRequest</h2>
<!-- backwards compatibility -->
<a id="schemautildecodetransactionrequest"></a>
<a id="schema_UtilDecodeTransactionRequest"></a>
<a id="tocSutildecodetransactionrequest"></a>
<a id="tocsutildecodetransactionrequest"></a>

```json
{
  "transactionHashOrHex": "string",
  "loadInputValues": true,
  "network": "testnet"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|transactionHashOrHex|string|true|none|none|
|loadInputValues|boolean|false|none|A flag whether to load or not extra information about transaction inputs (cashaddress and value)|

<h2 id="tocS_ElectrumRawTransaction">ElectrumRawTransaction</h2>
<!-- backwards compatibility -->
<a id="schemaelectrumrawtransaction"></a>
<a id="schema_ElectrumRawTransaction"></a>
<a id="tocSelectrumrawtransaction"></a>
<a id="tocselectrumrawtransaction"></a>

```json
{
  "blockhash": "string",
  "blocktime": 0,
  "confirmations": 0,
  "hash": "string",
  "hex": "string",
  "locktime": 0,
  "size": 0,
  "time": 0,
  "txid": "string",
  "version": 0,
  "vin": [
    {
      "scriptSig": {
        "asm": "string",
        "hex": "string"
      },
      "sequence": 0,
      "txid": "string",
      "vout": 0,
      "value": 0,
      "address": "string"
    }
  ],
  "vout": [
    {
      "n": 0,
      "scriptPubKey": {
        "addresses": [
          "string"
        ],
        "asm": "string",
        "hex": "string",
        "reqSigs": 0,
        "type": "string"
      },
      "value": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|blockhash|string|false|none|none|
|blocktime|number|false|none|none|
|confirmations|number|false|none|none|
|hash|string|false|none|none|
|hex|string|false|none|none|
|locktime|number|false|none|none|
|size|number|false|none|none|
|time|number|false|none|none|
|txid|string|false|none|none|
|version|number|false|none|none|
|vin|[object]|false|none|none|
|» scriptSig|object|false|none|none|
|»» asm|string|false|none|none|
|»» hex|string|false|none|none|
|» sequence|number|false|none|none|
|» txid|string|false|none|none|
|» vout|number|false|none|none|
|» value|number|false|none|optional extention by mainnet.cash|
|» address|string|false|none|optional extention by mainnet.cash|
|vout|[object]|false|none|none|
|» n|number|false|none|none|
|» scriptPubKey|object|false|none|none|
|»» addresses|[string]|false|none|none|
|»» asm|string|false|none|none|
|»» hex|string|false|none|none|
|»» reqSigs|number|false|none|none|
|»» type|string|false|none|none|
|» value|number|false|none|none|

<h2 id="tocS_WatchAddressRequest">WatchAddressRequest</h2>
<!-- backwards compatibility -->
<a id="schemawatchaddressrequest"></a>
<a id="schema_WatchAddressRequest"></a>
<a id="tocSwatchaddressrequest"></a>
<a id="tocswatchaddressrequest"></a>

```json
{
  "cashaddr": "bchtest:qzd0tv75gx6y0zspzwqpgkwkq0n72g8fsq2zch26s2",
  "url": "http://example.com/webhook",
  "type": "transaction:in,out",
  "recurrence": "recurrent",
  "duration_sec": 86400
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cashaddr|string|true|none|Cash address to watch|
|url|string|true|none|Url to be called when configured action is triggered|
|type|string|true|none|Type of watch operation|
|recurrence|string|false|none|Action recurrence. Indicates if webhook should be triggered recurrently until expire or only once|
|duration_sec|number|false|none|Duration of the webhook lifetime in seconds before it will expire.|

#### Enumerated Values

|Property|Value|
|---|---|
|type|transaction:in|
|type|transaction:out|
|type|transaction:in,out|
|type|balance|
|recurrence|once|
|recurrence|recurrent|

<h2 id="tocS_WatchAddressResponse">WatchAddressResponse</h2>
<!-- backwards compatibility -->
<a id="schemawatchaddressresponse"></a>
<a id="schema_WatchAddressResponse"></a>
<a id="tocSwatchaddressresponse"></a>
<a id="tocswatchaddressresponse"></a>

```json
{
  "id": 1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|Webhook Id created in the system|

<h2 id="tocS_AuthChainElement">AuthChainElement</h2>
<!-- backwards compatibility -->
<a id="schemaauthchainelement"></a>
<a id="schema_AuthChainElement"></a>
<a id="tocSauthchainelement"></a>
<a id="tocsauthchainelement"></a>

```json
{
  "txHash": "string",
  "contentHash": "string",
  "uris": [
    "string"
  ],
  "httpsUrl": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|txHash|string|false|none|Hex encoded transaction hash|
|contentHash|string|false|none|Content hash of the remote registry, either a SHA256 hash of an HTTPS Publication output or an IPFS CID|
|uris|[string]|false|none|URIs of BCMR publication OP_RETURN|
|httpsUrl|string|false|none|URL to fetch the registry contents from|

<h2 id="tocS_AuthChain">AuthChain</h2>
<!-- backwards compatibility -->
<a id="schemaauthchain"></a>
<a id="schema_AuthChain"></a>
<a id="tocSauthchain"></a>
<a id="tocsauthchain"></a>

```json
[
  {
    "txHash": "string",
    "contentHash": "string",
    "uris": [
      "string"
    ],
    "httpsUrl": "string"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AuthChainElement](#schemaauthchainelement)]|false|none|none|

