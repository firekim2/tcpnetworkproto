'use strict';

const net = require('net');
let host = 'localhost';
let port = 3000;

let stream_server = net.createServer((tcp_socket) => {
		
	let control_server = require('socket.io-client')("http://" + host + ":" + port + "/control");
	
	console.log(tcp_socket.address().address + " connected");

	tcp_socket.on('data', (_data) => {
		console.log("rcv: " + _data);
		let data = {status: _data, sender: "pc"}
		control_server.emit("status-change", data);
	});
	
	control_server.on("status-change", (data) => {
		console.log("sender : " + data.sender + "\n status : " + data.status);
		//tcp_socket.write(JSON.stringfy(data));
		if(data.sender !== "pc") tcp_socket.write(data.status);
	});

	
});

stream_server.listen(5000, () => {
	console.log("PC Socket IO open.");
});
