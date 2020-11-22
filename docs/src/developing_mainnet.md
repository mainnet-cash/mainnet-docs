# Developing MainNet library

Download and install dependencies.

```shell
git clone https://github.com/mainnet-cash/mainnet-js.git
cd mainnet-js
npm i
npm run api:build:server
npm run build
(cd generated/serve && npm i)
```

Run the server in cluster mode:

```shell
PORT=3000 WORKERS=5 npm run api:serve:cluster
```

On MacOS if you get `gyp: No Xcode or CLT version detected!` you might want to follow 
[this article](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d).
