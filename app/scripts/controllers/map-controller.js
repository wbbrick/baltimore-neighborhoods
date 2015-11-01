/*
 * Map Controller - All Leaflet and D3 API calls are made via this controller
 * so as to abstract away the API
 */

let Backbone = require('backbone');
let L = require('leaflet');
L.esri = require('esri-leaflet');
let d3 = require('d3');
let stampit = require('stampit');

let privateMethods = stampit().init( function(){
	this._setupD3 = function(){
		this.svg = d3.select(this.map.getPanes().overlayPane).append('svg');
		this.g = this.svg.append('g').attr('class', 'leaflet-zoom-hide');
	};

	this._addNeighborhoods = function() {
		//declaring map locally so _projectPoint can see it and still have access to this.stream
		var map = this.map;
		function _projectPoint(x, y) {
			var point = map.latLngToLayerPoint(new L.LatLng(y, x));
			this.stream.point(point.x, point.y);
		};

		this.transform = d3.geo.transform({point: _projectPoint});
		this.path = d3.geo.path().projection(this.transform);
		let feature = this.g.selectAll('path')
			    .data(this.neighborhoods.toJSON() )
			    .enter().append('path');
		feature.attr('d', this.path);

		let bounds = this.path.bounds( this.neighborhoods.formOriginalGeoJSON() );
		let topLeft = bounds[0];
		let bottomRight = bounds[1];

		this.svg.attr('width', bottomRight[0] - topLeft[0])
			.attr('height', bottomRight[1] - topLeft[1])
			.style('left', topLeft[0] + 'px')
			.style('top', topLeft[1] + 'px');

		this.g.attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')');
	};


	this._setBasemap = function(){
		L.esri.basemapLayer('Streets').addTo(this.map);
	};
} );

let publicMethods = stampit( {
	methods: {
		setView: function( options ){
			this.map.setView( new L.LatLng(options.lat, options.lon), options.zoom);
		},
		createMap: function( options ){
			this.map = L.map( options.div );
			this.setView( {
				'lat': 39.283333,
				'lon': -76.616667,
				'zoom': 12
			} );
			this.neighborhoods = options.neighborhoods;
			this._setBasemap();
			this._setupD3();
			this._addNeighborhoods();
		}
	}
} );

module.exports = stampit.compose( privateMethods, publicMethods );
