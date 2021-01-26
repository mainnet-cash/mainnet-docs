# Running your own REST API server

The REST service is an express javascript app run from nodejs. The project is largely generated from the swagger definition. It uses the bundled library of the root project to complete requests and also serves documentation.

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
yarn api:server:install
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