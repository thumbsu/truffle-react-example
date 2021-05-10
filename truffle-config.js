require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const path = require("path");

const NETWORK_ID = "1001";
const URL = "https://api.baobab.klaytn.net:8651";
const GASLIMIT = "10000000";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null
    }
  },
  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
