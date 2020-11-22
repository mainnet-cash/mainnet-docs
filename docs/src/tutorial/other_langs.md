# Other programming languages

We're using OpenAPI generators, so it allows you to build clients for dozens of programming languages 
or you can use the REST API directly.

All these clients (PHP, Go, Python, etc...) can't sign transactions or generate private keys, they are thin
REST wrappers and defer all important tasks to the REST server. Here's how this works:

<img src="/rest.svg" style="margin-top: 20px">

The docs for specific REST methods are [here](https://rest-unstable.mainnet.cash/api-docs/).

We are automatically generating some clients, namely:

- [PHP](https://github.com/mainnet-cash/mainnet-php-generated) 
  - `composer require mainnet/mainnet`
- [Python](https://github.com/mainnet-cash/mainnet-python-generated) 
  - `pip install mainnet`
- [Go](https://github.com/mainnet-cash/mainnet-go-generated) 
  - `go get https://github.com/mainnet-cash/mainnet-go-generated`
- NodeJS
  - `yarn add mainnet-js`

...and we'll be adding to this list soon.

To build the client for another language, run the following commands:

```sh
git clone https://github.com/mainnet-cash/mainnet-js.git
npm run api:build:client $lang
```

Where `$lang` is the language you want to build, see [here](https://openapi-generator.tech/docs/generators/) for the list

## REST API server installation

TODO: Postgres, DATABASE_URL ?

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
npm i
npm run api:build:server
npm run build
(cd generated/serve && npm i)
PORT=3000 WORKERS=5 npm run api:serve:cluster
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
