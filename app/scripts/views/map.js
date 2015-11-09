/*
 * Map View - the map view, which quarantines the map api to the controller
 */

let Backbone = require('backbone');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.neighborhoods = options.neighborhoods;
			this.mapController = options.mapController;
		},

		template: require('../templates/map.ejs')(),

		setupMap: function() {
			this.mapController.createMap( {
				'div': 'map',
				'neighborhoods': this.neighborhoods,
				'store' : this.store
			} );
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
