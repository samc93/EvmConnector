const express = require('express');
const route = require('./routes/route');
//get the express application
var app = express();

//Set the port number
const PORT = 3000;

//Reroute to route.js
app.use('/', route);


app.listen(PORT, () => {
    console.log(`SERVER started at PORT ${PORT}`);
})