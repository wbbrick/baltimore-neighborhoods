/*
 * Map Controller - All Leaflet API calls are made via this controller
 * so as to abstract away the API
 */

let Backbone = require('backbone');
let L = require('leaflet');
L.esri = require('esri-leaflet');



module.exports = {
	createMap : function( div ) {
		this.map = L.map( div );
		this._setBasemap();
	},

	setView: function( options ) {
		this.map.setView( new L.LatLng(options.lat, options.lon), options.zoom);
	},

	_setBasemap: function() {
		L.esri.basemapLayer('Streets').addTo(this.map);
	}
};
