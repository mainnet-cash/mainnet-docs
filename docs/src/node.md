# Running Bitcoin Cash servers (BCHN, Fulcrum)

## BCHN on Ubuntu

Create a directory for the data, let's say: `/mnt/bchn` (and for example `/mnt/fulcrum` for Fulcrum)

The space requirements as of September 2021:

```shell
202G    /mnt/bchn
44G     /mnt/fulcrum
```

### Remove Bitcoin ABC 

Only necessary <span style="background-color: #fffdbf">if you had Bitcoin ABC installed</span>:

```shell script
sudo apt-get remove bitcoind bitcoin-qt bitcoin-tx
sudo add-apt-repository --remove ppa:bitcoin-abc/ppa
```

### Install Bitcoin Cash Node

Run this <span style="background-color: #fffdbf">on Ubuntu 16.04 and 18.04 only</span>:

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
mkdir -p /mnt/bchn
bitcoind -datadir=/mnt/bchn -rpcallowip=127.0.0.1 \
    -rpcbind=127.0.0.1:8332 -rpcuser=rpc \
    -txindex=1 \
    -rpcpassword=RANDOMPASSWORD
```

<span style="background-color: #fffdbf; padding: 0 5px 0 5px;">Replace the password</span> with something random (try `head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo ''` on Linux)

To open your RPC for other computers on the Internet (not recommended, even if password protected):

```shell script
bitcoind -datadir=/mnt/bchn -rpcallowip=0.0.0.0/0 \
    -rpcbind=0.0.0.0:8332 -rpcuser=rpc \
    -txindex=1 \
    -rpcpassword=RANDOMPASSWORD
```

## Running Fulcrum (Electron Cash compatible server)

Generate an SSL certificate (needed for the protocol, self-signed is sufficient, enter any values you'd like):

```shell script
openssl req -newkey rsa:4096 \
    -x509 -sha256  -days 3650  -nodes \
    -out /var/www/tls/fulcrum-certificate.pem \
    -keyout /var/www/tls/fulcrum-key.pem
```

Install Fulcrum (replace `1.5.2` with the [latest](https://github.com/cculianu/Fulcrum/releases/latest) version)

```shell script
wget https://github.com/cculianu/Fulcrum/releases/download/v1.5.2/Fulcrum-1.5.2-x86_64-linux.tar.gz
tar zxvf Fulcrum-1.5.2-x86_64-linux.tar.gz
rm Fulcrum-1.5.2-x86_64-linux.tar.gz
cd Fulcrum-1.5.2-x86_64-linux

mkdir -p /mnt/fulcrum
./Fulcrum --datadir=/mnt/fulcrum \
  --bitcoind=127.0.0.1:8332 --rpcuser=rpc \
  --ssl=0.0.0.0:50002 \
  --cert=/var/www/tls/fulcrum-certificate.pem \
  --key=/var/www/tls/fulcrum-key.pem \
  --rpcpassword=RANDOMPASSWORD
```

### WebSocket port for mainnet library

To be able to connect to this Fulcrum from mainnet library, you need to enable WebSocket port (50004)
and get a valid certificate. First assign a domain name to your IP address (buy one, usually there's a domain name
manager, add an A entry). Let's say your domain name is `fulcrum.test.cash`

```shell
sudo apt-get install -y certbot
certbot certonly --manual --preferred-challenges dns -d fulcrum.test.cash
```

Follow the instructions of `certbot`.

Now run:

```shell
./Fulcrum --datadir=/mnt/fulcrum \
  --bitcoind=127.0.0.1:8332 --rpcuser=rpc \
  --ssl=0.0.0.0:50002 \
  --cert=/var/www/tls/fulcrum-certificate.pem \
  --key=/var/www/tls/fulcrum-key.pem \
  --rpcpassword=RANDOMPASSWORD \
  --wss=0.0.0.0:50004 \
  --wss-cert=/etc/letsencrypt/live/fulcrum.test.cash/fullchain.pem \ 
  --wss-key=/etc/letsencrypt/live/fulcrum.test.cash/privkey.pem
```

Remember to replace `fulcrum.test.cash` with your domain name and `RANDOMPASSWORD` with an actual password.

Now you can setup your REST server:

```shell
docker run --env ELECTRUM="wss://fulcrum.test.cash:50004" -p 127.0.0.1:3000:80 \
   mainnet/mainnet-rest:latest
```

Your REST server will be available at `http://127.0.0.1:3000` connected to your own Fulcrum instance

See [here](/tutorial/running-rest.html) for more options (including LetsEncrypt certificate for your REST server)

## Fulcrum config

By default Fulcrum will not show some addresses that have some very long transaction history, you need this `fulcrum.conf`
to change that:

```
max_history=10000000
```

Then run Fulcrum as usuall adding the `fulcrum.conf` at the end:

```sh
./Fulcrum ... fulcrum.conf
```

## Running Insomnia (REST server to serve Fulcrum results)

Install nodejs, git, then:

```shell script
git clone https://github.com/fountainhead-cash/insomnia.git
cd insomnia
npm install
```

Edit the config file:

```shell
cp src/config.ts.example src/config.ts
$(EDITOR) src/config.ts
```

Some things that you need to change:

```json
"connectionType": "client",
```
```json
"servers": [
  "127.0.0.1:50002"
]
```

You will probably need to <span style="background-color: #fffdbf">raise</span> the `ratelimit` too in the config:

```json
"ratelimit": {
  "windowMs": 1 * 60 * 1000,
  "max": 1000000 
},
```

Then run:

```shell
npm start
```
