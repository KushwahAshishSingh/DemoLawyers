const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = process.env.PORT || 5001;

app.use(bodyParser.json({}));

MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err);
	require('./app/routes')(app, database);

	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
});
