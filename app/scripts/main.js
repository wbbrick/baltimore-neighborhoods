/*
 * Main file for browserify to consume.  Starts backbone by instantiating AppView
 */
window.$ = window.jQuery = require('jquery');
let AppView = require('./views/app');
let NeighboorhoodCollection = require('./collections/neighborhoods.js');
let createStore = require('redux').createStore;
let reduxApp = require('./redux').reduxApp;

( function() {
	let store = createStore( reduxApp );
	let neighborhoods = new NeighboorhoodCollection( {
		'store': store
	} );
	let appView = new AppView( {
		'store': store,
		'neighborhoods' : neighborhoods
	} );
	neighborhoods.once( 'reset', 	appView.setElement( '#content' ).render );
	neighborhoods.fetch( { 'reset' : true } );
	console.log( 'App Started' );
} )();
