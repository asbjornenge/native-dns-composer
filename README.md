# Native-DNS Componser

A tiny little composing wrapper around the awesome [native-dns](https://github.com/tjfontaine/node-dns) library for node.

	require('native-dns-composer')('api.domain.com').at('8.8.8.8').query(function(resp) {
		console.log(resp.answer)
	})
	
## Layers

	.at('8.8.8.8')     - sets the DNS server to query
	.type('SRV')       - sets the DNS record type to query
	.timeout(1000)     - sets the timeout in ms
	.on('timeout', function() {}) - register timeout event listener
	.on('err', function(err)  {}) - register error event listener
	.on('end', function(time) {}) - register end event listener
	
enjoy.
