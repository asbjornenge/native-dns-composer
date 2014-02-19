var dns  = require('native-dns');

function srv(hostname) {
	this.hostname   = hostname
	this._server    = '8.8.8.8'
	this.port       = 53
	this.protocol   = 'udp'
	this._timeout   = 1000
	this._on        = {}
	this._type      = 'A'
}
srv.prototype.at = function(server) {
	this._server = server;
	return this;
};
srv.prototype.type = function(type) {
	this._type = type;
	return this;
};
srv.prototype.timeout = function(timeout) {
	this._timeout = timeout;
	return this;
};
srv.prototype.on = function(event, fn) {
	this._on[event] != undefined ? this._on[event].push(fn) : this._on[event] = [fn];
	return this;
}
srv.prototype.query = function(callback) {

	var question = dns.Question({
		name : this.hostname,
		type : this._type
	})

	var start = new Date().getTime();

	var req = dns.Request({
		question: question,
		server: { address: this._server, port: this.port, type: this.protocol },
		timeout: this._timeout,
	});

	req.on('timeout', function () {
		if (this._on['timeout']) { this._on['timeout'].forEach(function(fn) { fn() }) }
	}.bind(this));

	req.on('message', function (err, answer) {
		if (err) { if (this._on['err']) { this._on['err'].forEach(function(fn) { fn(err) }) } return }
//		if (this._type === 'SRV') {
//			var additional = _.object(_.pluck(answer.additional, 'name'), answer.additional);
//			answer.answer.forEach(function (a) { a.address = additional[a.target].address });
//		}
		if (typeof callback === 'function') callback(answer)
	}.bind(this));

	req.on('end', function () {
		var delta = (new Date().getTime()) - start;
		if (this._on['end']) { this._on['end'].forEach(function(fn) {fn(delta.toString())}) }
	}.bind(this));

	req.send();
}

module.exports = function(hostname) {
	return new srv(hostname)
};