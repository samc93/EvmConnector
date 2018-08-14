var Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const myContractDetails = JSON.parse(fs.readFileSync('D:/EvmConnector/build/contracts/ClaimData.json', 'utf8'));

// set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let ClaimContract = web3.eth.contract(myContractDetails.abi).at(myContractDetails.networks[5777].address);


var saveFirData = function (firInstance, callback) {

    ClaimContract.saveFirData.
        sendTransaction(firInstance.FIR_NO, firInstance.SSN, firInstance.FIR_DATE
            , firInstance.FIR_TITLE, firInstance.FILE_HASH_LOCATION,
            {
                from: web3.eth.accounts[0],
                gas: 4000000
            }, (error, result) => {
                if(typeof error === undefined || error === null){  
                    callback('FIR Information sent to the Block Chain', 201);
                } else {
                    callback('Error occured while saving data to BlockChain', 500);
                }
            });


}

console.log(ClaimContract.getFirData.call('9876543210'));

module.exports.saveFirData = saveFirData;



