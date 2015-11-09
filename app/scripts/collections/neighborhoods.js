/*
 * Neighborhood collection - This houses the neighborhood GeoJSON 
 */

let Backbone = require('backbone');
let _ = require('lodash');

module.exports = ( function(){
	return Backbone.Collection.extend( {
		initialize: function( options ) {
			this.store = options.store;
		},

		url: '../../data/neighborhoods.topojson',

		getNeighborhoodInfo: function( neighborhood ) {
			debugger;
			return this
		},

		parse: function( resp ){
			return resp;
		}
	} );
} )();
