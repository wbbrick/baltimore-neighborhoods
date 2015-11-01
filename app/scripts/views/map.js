/*
 * Map View - the map view, which quarantines 
 */

let Backbone = require('backbone');
let MapController = require('../controllers/map-controller');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.neighborhoods = options.neighborhoods;
			this.mapController = MapController( {
				'neighborhoods': this.neighborhoods
			} );
		},

		template: require('../templates/map.ejs')(),

		setupMap: function() {
			this.mapController.createMap( {
				'div': 'map',
				'neighborhoods': this.neighborhoods
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
