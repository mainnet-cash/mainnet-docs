# Running your own REST API server

The REST service is an express javascript app run from nodejs. The project is largely generated from the swagger definition. It uses the bundled library of the root project to complete requests and also serves documentation.

## Restricting remote calls with API_KEY

`API_KEY` environment variable controls the server security.

If not set (default) any request will be served.

If set to a certain value, clients must provide `Authorization: bearer <token>` HTTP header with `<token>` set to the value exactly corresponding to the `API_KEY` value. We currently use single API key which has global scope, e.g. all methods will require it.

Example for booting up the cluster would be the following: `API_KEY=s3cr3t yarn api:serve:cluster`

## Requirements

The REST server requires a postgres database to store named wallets. This setting is loaded via the `DATABASE_URL` environment variable.

In development and testing, the url: `postgres://postgres:trusted@localhost:15432/wallet` is loaded automatically from `/.env.regtest`.

### Docker (exposed on localhost) <Badge text="recommended" type="tip"/>

```shell
docker run -d --env WORKERS=5 -p 127.0.0.1:3000:80 mainnet/mainnet-rest
```

Your REST server will now be available on http://127.0.0.1:3000/

Try the REST API:

```sh
curl -X POST -H 'Content-type: application/json' -d'{}' \
    http://127.0.0.1:3000/wallet/create
```

This is the most secure way to run the server, since it's the server that does the signing, so the private keys
will be sent to it (and if you use named wallet - the private keys will be stored on server too, you don't want to
keep them on a public server like `rest-unstable.mainnet.cash` - you want your own server)

### Docker (exposed for everyone) <Badge text="not recommended" type="warning"/>

Alternatively, exposed for the whole world, unencrypted:  

```shell
docker run -d --env WORKERS=5 -p 80:80 mainnet/mainnet-rest
```

(This is not recommended since if you use named wallets - other users will be able to read your private keys)

Or run with LetsEncrypt SSL (you need to provide a domain name and a "valid" email for notifications). 

```shell
mkdir -p letsencrypt
sudo docker run --rm -p 80:80 -p 443:443 \
    -v $(pwd)/letsencrypt:/etc/letsencrypt \
    --env WORKERS=5 \
    -e LETSENCRYPT_EMAIL=admin@example.com \
    -e DOMAIN=example.com mainnet/mainnet-rest
```

(This is still not recommended since other users will still be able to read your saved private keys)

Many more details about our Docker image can be found [here](https://github.com/mainnet-cash/mainnet-js/blob/master/generated/serve/docker/README.md)

### Without Docker <Badge text="safe, but hard" type="tip"/>

```shell
git clone https://github.com/mainnet-cash/mainnet-js.git
cd mainnet-js
npm i -g yarn
yarn install
yarn build
yarn api:serve:install
PORT=3000 WORKERS=5 yarn api:serve:cluster
```

On MacOS if you get `gyp: No Xcode or CLT version detected!` you might want to follow 
[this article](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d).

Open `http://127.0.0.1:3000/api-docs/`

Try the REST API:

```sh
curl -X POST -H 'Content-type: application/json' -d'{}' \
    http://127.0.0.1:3000/wallet/create
```

Response:

```
{"name":"","cashaddr":"bitcoincash:qzl6jf....
```

TODO: Add host:port to console output


## Configuration

The following variables are available to configure the REST server:

| Variable | Description | Default|
| ----------- | ----------- | ------ |
| `ALLOW_MAINNET_USER_WALLETS` | Allow saving mainnet wallets to sql  | `true` |
| `URL_PORT`  | Service port | `3000` |
| `URL_PATH` | Url to serve requests | `http://localhost` |
| `TIMEOUT` | Request timeout (seconds)  | `60` |
| `WORKERS` | Number of threads  | `10` |
| `DATABASE_URL` | Postgres URL  | `undefined` |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Whether to reject unauthorized certificates (i.e. self-signed for development). Must be set exactly to the string "false", if `false` is intended | true |
| `DATABASE_SSL_CA` | Base64 encoded certificate authority as a string | `undefined` |
| `DATABASE_SSL_KEY` | Base64 encoded certificate key as a string | `undefined` |
| `DATABASE_SSL_CERT` | Base64 encoded certificate as a string | `undefined` |
| `API_KEY` | API Key | `undefined` |
| `SLP_PROVIDER` | SLP provider | `undefined` (implied default `slpdb`) |
| `SLPDB_MAINNET_DATA` | SLP provider data endpoint | `undefined` (default https://slpdb.fountainhead.cash) |
| `SLPDB_MAINNET_EVENTS` | SLP provider event endpoint | `undefined` (default https://slpsocket.fountainhead.cash) |
| `GSPP_MAINNET_DATA` | SLP provider data endpoint | `undefined` (default https://gs.fountainhead.cash) |
| `GSPP_MAINNET_EVENTS` | SLP provider event endpoint | `undefined` (default https://slpsocket.fountainhead.cash) |
| `SLPDB_TESTNET_DATA` | SLP provider data endpoint | `undefined` (default https://slpdb-testnet.fountainhead.cash) |
| `SLPDB_TESTNET_EVENTS` | SLP provider event endpoint | `undefined` (default https://slpsocket-testnet.fountainhead.cash) |
| `GSPP_TESTNET_DATA` | SLP provider data endpoint | `undefined` (default https://gs-testnet.fountainhead.cash) |
| `GSPP_TESTNET_EVENTS` | SLP provider event endpoint | `undefined` (default https://slpsocket-testnet.fountainhead.cash) |
| `SLPDB_REGTEST_DATA` | SLP provider data endpoint | `undefined` (default http://localhost:12300) |
| `SLPDB_REGTEST_EVENTS` | SLP provider event endpoint | `undefined` (default http://localhost:12301) |
| `GSPP_REGTEST_DATA` | SLP provider data endpoint | `undefined` (default http://localhost:12400) |
| `GSPP_REGTEST_EVENTS` | SLP provider event endpoint | `undefined` (default http://localhost:12401) |


The node package also has the following variables to control which electrum cash servers it connects to and how:

| Variable | Description | Default|
| ----------- | ----------- | ------ |
| `ELECTRUM` | electrum server url, or multiple as a comma separated list without spaces  | `wss://fulcrum.fountainhead.cash` |
| `ELECTRUM_TESTNET` | Same for testnet | `wss://blackie.c3-soft.com:60004` |
| `ELECTRUM_REGTEST` | Same for regtest  | `ws://127.0.0.1:60003` |
| `ELECTRUM_CONFIDENCE` | How many servers must agree for an response to resolve  | `1` |

It is possible to use multiple servers and compare the results from each:

```
ELECTRUM="wss://fulcrum.fountainhead.cash,wss://bch.imaginary.cash:50004"
```

Where the number of servers that must agree is controlled with `ELECTRUM_CONFIDENCE`

See [here](/node.html) for instructions how to run your own Bitcoin Cash node and Fulcrum.