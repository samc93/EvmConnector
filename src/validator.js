
//importing the validator class
var Validator = require('jsonschema').Validator;
//importing the JSON Schemas
const firSchema = require('./schemas/FirSchemaModel');


var v = new Validator();

module.exports = {
    validateFirSchema: function (instance, callback) {

        var messages = [];
        var results = v.validate(instance, firSchema);
        if (results.errors.length > 0) {
            results.errors.forEach(element => {
                messages.push(element.stack);
            });

        }
        callback(messages, instance);
    }

};