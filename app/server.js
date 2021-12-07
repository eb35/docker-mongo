var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
	res.sendFile(path.join(__dirname, `index.html`));
});

app.listen(3000, () => {
	console.log(`app listening on port 3000!`);
});