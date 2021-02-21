# Running Bitcoin Cash node

## BCHN on Ubuntu

Create a directory for the data (it should have ~210G free space as of Nov 2020), let's say: `/mnt/bchn`

### Remove Bitcoin ABC if it was running

```shell script
sudo apt-get remove bitcoind bitcoin-qt bitcoin-tx
sudo add-apt-repository --remove ppa:bitcoin-abc/ppa
```


### Install Bitcoin Cash Node

#### Run this on Ubuntu 16.04 and 18.04 only:

```shell script
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install g++-7
```

Install the node:

```shell script
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:bitcoin-cash-node/ppa
sudo apt-get update
sudo apt-get install bitcoind
```

### Start Bitcoin Cash Node

```shell script
mkdir -p /mnt/bchn/bitcoind
bitcoind -datadir=/mnt/bchn/bitcoind -rpcallowip=127.0.0.1 \
    -rpcbind=127.0.0.1:8332 -rpcuser=rpc \
    -rpcpassword=RANDOMPASSWORD \
    -txindex=1
```

Replace the password with something random (try `head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo ''` on Linux)

To open your RPC for other computers on the Internet (not recommended, even if password protected):

```shell script
bitcoind -datadir=/mnt/bchn/fulcrum -rpcallowip=0.0.0.0/0 \
    -rpcbind=0.0.0.0:8332 -rpcuser=rpc \
    -rpcpassword=RANDOMPASSWORD \
    -txindex=1
```

## Running Fulcrum (Electron Cash compatible server)

Generate an SSL certificate (needed for the protocol, self-signed is sufficient, enter any values you'd like):

```shell script
openssl req -newkey rsa:4096 \
    -x509 -sha256  -days 3650  -nodes \
    -out /var/www/tls/fulcrum-certificate.pem \
    -keyout /var/www/tls/fulcrum-key.pem
```

Install Fulcrum (replace `1.4.1` with the <span style="background-color: #fffdbf; padding: 0 5px 0 5px;">[latest](https://github.com/cculianu/Fulcrum/releases/latest) version</span>)

```shell script
wget https://github.com/cculianu/Fulcrum/releases/download/v1.4.1/Fulcrum-1.4.1-x86_64-linux.tar.gz
tar zxvf Fulcrum-1.4.1-x86_64-linux.tar.gz
rm Fulcrum-1.4.1-x86_64-linux.tar.gz
cd Fulcrum-1.4.1-x86_64-linux

./Fulcrum --datadir=/mnt/bchn \
  --bitcoind=127.0.0.1:8332 --rpcuser=rpc \
  --rpcpassword=RANDOMPASSWORD \
  --ssl=0.0.0.0:50002 \
  --cert=/var/www/tls/fulcrum-certificate.pem --key=/var/www/tls/fulcrum-key.pem
```

## Running Insomnia (REST server to serve Fulcrum results)

```shell script
git clone https://github.com/fountainhead-cash/insomnia.git
cd insomnia
yarn install
yarn start
```

<script defer>
window.addEventListener("load", function(event) {
    const password = Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8);
    document.querySelectorAll('.language-shell').forEach(n => {
        if(n.textContent.match(/RANDOMPASSWORD/)) {
            n.innerHTML = n.innerHTML.replace(/RANDOMPASSWORD/, password);
        }
    });
});
</script>
