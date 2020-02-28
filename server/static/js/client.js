class Server{
	constructor(_server, _type = "pc"){
		this.server = _server;
		this.type = _type;
		this.status = "status_0"; // to be determined
		this.server.emit("join", {
			type: this.type
		});
	}

	set_status(_status){
		this.server.emit("status-change", {
			sender: this.type,
			status: _status
		});
	}
	
}
