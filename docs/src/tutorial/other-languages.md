# Other languages

With a limited budget, we are mainly concentrated on developing mainnet library for JavaScript, 
but as an added bonus we decided to build a REST server that will allow other languages 
to access the Bitcoin Cash network too using the same code.

We're using OpenAPI generators, which allows you to build clients for dozens of programming languages,
or you can use the REST API directly.

All these clients (PHP, Go, Python, etc...) can't sign transactions or generate private keys, they are thin
REST wrappers and defer all important tasks to the REST server. 

Here's how this works:

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
