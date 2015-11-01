/*
 * Map View - the map view, which quarantines 
 */

let Backbone = require('backbone');
let MapController = require('../map-controller');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.mapController = MapController;
		},

		template: require('../templates/map.ejs')(),

		setupMap: function() {
			this.mapController.createMap( 'map' );
			this.mapController.setView( {
				'lat': 39.283333,
				'lon': -76.616667,
				'zoom': 12
			} );
		},

		render: function() {
			this.$el.html( this.template );
			this.setupMap();
		}
	} );
} )();
