const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of those to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            // optional arguments to instantiate our contract , in our case 'initialMessage'
            arguments: ['Hi there!']
        })
        .send({ from: accounts[0], gas: '1000000' })
    
});

describe('Inbox', () => {
    it('deploys a contract', async () => {
        assert.ok(inbox.options.address);
    })
    it('has a default message', async() => {
        assert.equal(await inbox.methods.message().call(), "Hi there!")
    })
    it('can set a message', async() => {
        await inbox.methods.setMessage("Hello!").send({from: accounts[0]});
        assert.equal(await inbox.methods.message().call(), "Hello!")
    })
})