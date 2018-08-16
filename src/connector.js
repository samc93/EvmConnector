var Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const myContractDetails = JSON.parse(fs.readFileSync('D:/EvmConnector/build/contracts/ClaimData.json', 'utf8'));

// set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let ClaimContract = web3.eth.contract(myContractDetails.abi).at(myContractDetails.networks[5777].address);

//Registering for an event.
var firEvent = ClaimContract.FirEvent(undefined,{fromBlock:'latest',toBlock:'latest'});

firEvent.watch((err, resp) => {
    if (!err) {
        console.log(resp.args.firNo);
    }
});


//Method to save FIR information in the block chain
module.exports.saveFirData = function (firInstance, callback) {

    ClaimContract.saveFirData.
        sendTransaction(firInstance.FIR_NO, firInstance.SSN, firInstance.FIR_DATE
            , firInstance.FIR_TITLE, firInstance.FILE_HASH_LOCATION,
            {
                from: web3.eth.accounts[0],
                gas: 4000000
            }, (error, result) => {
                if (typeof error === undefined || error === null) {
                    callback('FIR Information sent to the Block Chain', 201);
                } else {
                    callback('Error occured while saving data to BlockChain', 500);
                }
            });


}

//Method to get the FIR information from the block chain
module.exports.getFirData = function (firID, callback) {
    ClaimContract.getFirData.call(firID, (err, res) => {
        if (err) {
            callback('Something went wrong', 500);
        } else {
            callback(res, 200)
        }
    }
    );

}


