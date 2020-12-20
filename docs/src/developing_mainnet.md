# Developing MainNet library

Download and install dependencies.

```shell
git clone https://github.com/mainnet-cash/mainnet-js.git
cd mainnet-js
yarn install
yarn build # build the mainnet library
yarn api:serve:install # install the library on the express server
```

Run the server in single threaded mode:

```shell
yarn api:serve
```

or in cluster mode:
```shell
PORT=3000 WORKERS=5 yarn api:serve:cluster
```

On MacOS if you get `gyp: No Xcode or CLT version detected!` you might want to follow 
[this article](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d).
