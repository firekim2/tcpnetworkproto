'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const body_parser = require('body-parser');
let host_url = "localhost:3000";

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));
app.use(body_parser.urlencoded({ extended : false }));

app.get('/', (req, res) => {

})

app.get('/pc', (req, res) => {
	res.render('template/pc');
});

app.get('/controller', (req, res) => {
	res.render('template/controller');
});

app.get('/contents', (req, res) => {
	res.render('template/contents');
});

let display = io.of('/control').on('connection', (socket) => {
	socket.on('status-change', (_data) => {
		if(typeof(_data) === "string") _data = JSON.parse(_data);
		display.emit('status-change', _data);	
	});
});

server.listen(3000, () => {
	console.log("Socket IO open.");
});
