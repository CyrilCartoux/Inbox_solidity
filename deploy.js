require("dotenv").config();
const fs = require("fs");
const Web3 = require("web3");

const {interface, bytecode} = JSON.parse(fs.readFileSync("Demo.json", 'utf8'));

const network = process.env.ETHEREUM_NETWORK;
// const web3 = new Web3(new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));
