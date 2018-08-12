var Web3 = require('web3');

  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  var testContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firNo",
				"type": "string"
			}
		],
		"name": "getFirData",
		"outputs": [
			{
				"name": "_ssn",
				"type": "string"
			},
			{
				"name": "_firDate",
				"type": "string"
			},
			{
				"name": "_firTitle",
				"type": "string"
			},
			{
				"name": "_fileHashLocation",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firNo",
				"type": "string"
			},
			{
				"name": "_ssn",
				"type": "string"
			},
			{
				"name": "_firDate",
				"type": "string"
			},
			{
				"name": "_firTitle",
				"type": "string"
			},
			{
				"name": "_fileHashLocation",
				"type": "string"
			}
		],
		"name": "saveFirData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);

console.log(web3.eth.getBalance('0xA66efcD0ACB0E467834B661e62D03583C98FD285'));

var ClaimContract = testContract.at('0xf0120d871f43f92115cc1f77d04a3516293899a5');

//console.log(ClaimContract);


ClaimContract.saveFirData.
sendTransaction('12345','123456789','12-04-1994','Car Accident','0x4421801c40cee8a6aba19bcf1b3ed2b4f42110c5',{
    from:web3.eth.accounts[0],
    gas:4000000},(error,result)=>{
    //console.log(error);
});

console.log(ClaimContract.getFirData.call('12345'));