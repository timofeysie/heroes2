var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(__dirname + ''));
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.listen(8080,function () {
	console.log('Node app is running on port 8080');
});

app.get('/myra', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader('Content-Type', 'application/json');
    var dataFile = 'data/myra.json';
	try
	{
		fs.statSync(dataFile).isFile();
        path.join(__dirname, dataFile);
		var data = fs.readFileSync(dataFile).toString();
        var id = req.query.assetRefNo;
	    console.log('id', id);
		res.send(data);
	} catch (err)
	{
        console.log('err',err);
		res.status(400).send(err);
	}
});