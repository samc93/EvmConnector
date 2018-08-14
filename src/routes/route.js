const express = require('express');
const bodyParser = require('body-parser');
const validator = require('../validator');
var connector = require('../connector');
const router = express.Router();

//setting up the router to use json body parser.
router.use(bodyParser.json());

//Generic Message
router.get('/', (req, res, next) => {
    res.send('Welcome to the ethereum Interactive Interface API');
});

//Method to save FIR info to the     block chain
router.post('/saveFirInfo', (req, res, next) => {
    //Check the incoming data type.Reject if anything but json
    if (req.headers["content-type"] !== 'application/json') {
        res.status(403).send('Unacceptable data type');
    };

    //Validate the FIR schema.
    validator.validateFirSchema(req.body, (err, result) => {
        if (err.length > 0) {
            res.status(403).send(err);
        } else {
            //Invoke contract method
            connector.saveFirData(req.body, (message, status) => {
                res.status(status).send(message);
            });/*{
                res.status(201).send('FIR Information sent to the Block Chain');
            } else{
            res.status(500).send('Error occured while saving data to BlockChain');
            }*/
        }
    });

});


//exporting the router
module.exports = router;