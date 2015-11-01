/*
 * Main file for browserify to consume.  Starts backbone by instantiating AppView
 */
let AppView = require('./views/app');
let NeighboorhoodCollection = require('./collections/neighborhoods.js');

( function() {
	let neighborhoods = new NeighboorhoodCollection();
	let appView = new AppView( {
		'neighborhoods' : neighborhoods
	} );
	neighborhoods.once( 'reset', 	appView.setElement( '#content' ).render );
	neighborhoods.fetch( { 'reset' : true } );
	console.log( 'App Started' );
} )();
