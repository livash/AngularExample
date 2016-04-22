var express = require('express');
var path = require('path');

var app = express();
var rootPath = path.normalize(__dirname + '/../');

// ask express to serve files as they are without any pre-processing
app.use(express.static(rootPath + '/app'));

app.listen(3000);
console.log('Listening on port 3000...');