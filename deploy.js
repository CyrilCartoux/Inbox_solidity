require("dotenv").config();
const fs = require("fs");
const Web3 = require("web3");
const HdWalletProvider = require("@truffle/hdwallet-provider");

const {interface, bytecode} = JSON.parse(fs.readFileSync("Demo.json", 'utf8'));

const provider = new HdWalletProvider(process.env.MNEMONIC_PHRASE,
`https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
)
const web3 = new Web3(provider);
let accounts;
const deploy = async() => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0])
    mycontract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode,arguments: ['Hi there!']})
        .send({from: accounts[0], gas:'1000000'})
        .catch((err)=> console.log(err))

    console.log("mycontract has been deployed to => " + mycontract.options.address);
    provider.engine.stop();

    console.log("Initial message => "+await mycontract.methods.message().call());
    await mycontract.methods.setMessage("coucou ici! en Francais! ").send({from: accounts[0]})
    console.log("Modified message => "+await mycontract.methods.message().call())
}   
deploy();