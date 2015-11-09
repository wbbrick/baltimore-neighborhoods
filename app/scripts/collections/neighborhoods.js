/*
 * Neighborhood collection - This houses the neighborhood GeoJSON 
 */

let Backbone = require('backbone');
let _ = require('lodash');

module.exports = ( function(){
	return Backbone.Collection.extend( {
		initialize: function( options ) {
			_.bindAll( this, 'formOriginalGeoJSON' );
		},

		url: '../../data/neighborhoods.topojson',

		formOriginalGeoJSON: function() {
			return _.extend( this.wrapper, { features: this.toJSON() } );
		},

		parse: function( resp ){
			return resp;
		}
	} );
} )();
