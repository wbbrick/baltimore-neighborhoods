/*
 * App View - the main view, which instantiates the map view
 */

let MapView = require('./map');
let createStore = require('redux').createStore;
let Backbone = require('backbone');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function() {
			//	this.store = createStore({});
			this.store = {};
			this.mapView = new MapView( { 'store': this.store } );
		},

		template: require('../templates/app.ejs')(),

		render: function() {
			this.$el.html( this.template );
			this.mapView.setElement('#map-container').render();
		}
	} );
} )();
