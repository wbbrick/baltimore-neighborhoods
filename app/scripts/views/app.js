/*
 * App View - the main view, which instantiates the map view
 */

let MapView = require('./map');
let createStore = require('redux').createStore;
let Backbone = require('backbone');
let _ = require('lodash');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			//	this.store = createStore({});
			_.bindAll( this, 'render' );
			this.neighborhoods = options.neighborhoods;
			this.store = {};
			this.mapView = new MapView( {
				'store': this.store,
				'neighborhoods' : this.neighborhoods
			} );
		},

		template: require('../templates/app.ejs')(),

		render: function() {
			this.$el.html( this.template );
			this.mapView.setElement('#map-container').render();
		}
	} );
} )();
