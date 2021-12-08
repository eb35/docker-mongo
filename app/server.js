var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
	res.sendFile(path.join(__dirname, `index.html`));
});

app.get(`/profile-picture`, (req, res) => {
	var img = fs.readFileSync(path.resolve(__dirname, 'images/profile-1.jpg'));
	res.writeHead(200, { 'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});

app.get(`/get-profile`, (req, res) => {
	var response = {};
	
	MongoClient.connect('mongodb://admin:password@localhost:27017', (err, client) => {
		if (err) throw err;
		
		var db = client.db('user-account');
		var query = { userid: 1 };
		
		db.collection('users').findOne(query, (err, result) => {
			if (err) throw err;
			response = result;
			client.close();

			res.send(response ? response : {});
		});
	});
});

app.post(`/update-profile`, (req, res) => {
	var userObj = req.body;
	var response = res;

	console.log("connecting to the db...");
	
	MongoClient.connect('mongodb://admin:password@localhost:27017', (err, client) => {
		if (err) throw err;

		var db = client.db('user-account');
		userObj['userid'] = 1;

		var myquery = { userid: 1 };
		var newvalues = { $set: userObj };

		db.collection('users').updateOne(myquery, newvalues, { upsert: true }, (err, res) => {
			if (err) throw err;
			client.close();
		});
	});
	res.send(userObj);
});

app.listen(3000, () => {
	console.log(`app listening on port 3000!`);
});