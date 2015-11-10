/*
 * App View - the main view, which instantiates the map view
 */

let MapView = require('./map');
let Backbone = require('backbone');
let _ = require('lodash');
let highlightNeighborhood = require('../store').highlightNeighborhood;
let ModalView = require('./modal.js');
let MapController = require('../controllers/map-controller');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.sidebarView = options.sidebarView;

			_.bindAll( this, 'render' );

			this.neighborhoods = options.neighborhoods;
			this.mapController = MapController();

			this.modalView = new ModalView({
				'neighborhoods': this.neighborhoods,
				'store' : this.store
			});
			this.mapView = new MapView( {
				'store': this.store,
				'neighborhoods' : this.neighborhoods,
				'mapController' : this.mapController
			} );
		},

		template: require('../templates/app.ejs')(),

		events: {
			'click .menu-button': 'openSidebar'
		},

		openSidebar: function() {
			this.sidebarView.open();
		},

		render: function() {
			this.$el.html( this.template );
			this.modalView.setElement('.modal').render();
			this.sidebarView.setElement('.settings-bar').render();

			this.mapView.setElement('#map-container').render();
		}
	} );
} )();
