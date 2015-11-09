/*
 * App View - the main view, which instantiates the map view
 */

let MapView = require('./map');
let Backbone = require('backbone');
let _ = require('lodash');
let highlightNeighborhood = require('../redux').highlightNeighborhood;
let SidebarView = require('./sidebar.js');
let MapController = require('../controllers/map-controller');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;

			_.bindAll( this, 'render' );

			this.neighborhoods = options.neighborhoods;
			this.mapController = MapController();

			this.sidebarView = new SidebarView({
				'mapController' : this.mapController
			});
			this.mapView = new MapView( {
				'store': this.store,
				'neighborhoods' : this.neighborhoods,
				'mapController' : this.mapController
			} );
		},

		template: require('../templates/app.ejs')(),

		render: function() {
			this.$el.html( this.template );
			this.sidebarView.setElement('#sidebar-container').render();

			this.mapView.setElement('#map-container').render();
		}
	} );
} )();
