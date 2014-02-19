/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');
var dns     = require('../index')

describe('native-dns composer', function () {

	it('can resolve dns records', function (done) {
		dns('google.com').query(function(res) {
			assert(res != undefined)
			done()
		})
	})

	it('can also do other types of lookups', function() {
		var d = dns('google.com').type('SRV')
		assert(d._type === 'SRV')
	})

	it('can set the timeout period',function() {
		var d = dns('google.com').timeout(1200)
		assert(d._timeout === 1200)
	})

	it('can set server to query', function() {
		var d = dns('google.com').at('1.2.3.4')
		assert(d._server === '1.2.3.4')
	})

	it('can bind events with .on', function() {
		var d = dns('google.com')
					.on('err', function(err) {})
					.on('timeout', function() {})
					.on('end', function(ms) {})
		assert(d._on['err'].length == 1)
		assert(d._on['timeout'].length == 1)
		assert(d._on['end'].length == 1)
	})

});