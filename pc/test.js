'use strict';

let net = require('net');

var socket = net.connect({port: 5000, host:'localhost'});
socket.on('connect', () => {
	console.log('connected to server');
	
	setInterval(() => {
		socket.write('status-0');
	}, 1000);
});

socket.on('data', (_data) => {
	console.log("recv : " + _data);
});
