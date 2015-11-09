/*
 * Map Controller - All Leaflet and D3 API calls are made via this controller
 * so as to abstract away the API
 */

let L = require('leaflet');
L.esri = require('esri-leaflet');
let d3 = require('d3');
let stampit = require('stampit');
let _ = require('lodash');
let topojson = require('topojson');

let privateMethods = stampit().init( function(){
	this._setupD3 = function(){
		this.svg = d3.select(this.map.getPanes().overlayPane).append('svg');
		this.g = this.svg.append('g').attr('class', 'leaflet-zoom-hide neighborhood-group pen');

		this.sketchGroups = _.map(
			_.range(0,4),
			() => this.svg.append('g').attr('class', 'leaflet-zoom-hide neighborhood-group pencil')
		);
		this.defs = this.svg.append('defs');

		this.gradient = this.defs.append( 'linearGradient' )
			.attr( 'id', 'pencilGradient' );

		this.gradient.append( 'stop' )
			.attr( 'offset', '10%')
			.attr( 'stop-color', '#777');

		this.gradient.append( 'stop' )
			.attr( 'offset', '50%')
			.attr( 'stop-color', '#222');

		this.gradient.append( 'stop' )
			.attr( 'offset', '90%')
			.attr( 'stop-color', '#777');
	};

	this._addNeighborhoods = function() {
		//declaring map locally so _projectPoint can see it and still have access to this.stream
		var map = this.map;
		function _projectPoint(x, y) {
			var point = map.latLngToLayerPoint(new L.LatLng(y, x));
			if( this.stream ) {
				return this.stream.point(point.x, point.y);
			} else {
				return [point.x, point.y];
			}
		};

		function randomizeCoordinate( coordinates ){
			if( coordinates.length === 2) {
				return [
					coordinates[0] + (Math.random() - 0.5) * .0001,
					coordinates[1] + (Math.random() - 0.5) * .0001
				];
			}
			else{
				return coordinates.map( randomizeCoordinate );
			}
		}

		let neighborhoodData = this.neighborhoods.toJSON()[0];

		this.transform = d3.geo.transform({point: _projectPoint});
		this.path = d3.geo.path().projection(this.transform);
		this.feature = this.g.selectAll( 'path' )
		    .data( topojson.feature( neighborhoodData, neighborhoodData.objects.neighborhoods ).features )
		    .enter()
			.append('path')
		    .attr( 'd', this.path );
		this.sketchFeatures = [];
		this.sketchGroups.forEach( function( g ) {
			let sketchFeature = g.selectAll( 'path' )
			    .data( topojson.feature( neighborhoodData, neighborhoodData.objects.neighborhoods ).features )
			    .enter()
			    .append('path');
			sketchFeature.attr('d', function( data ){
				data.geometry.coordinates = data.geometry.coordinates.map( randomizeCoordinate );
				return this.path( data );
			}.bind( this ) );
		}.bind( this ) );

		// Reposition the SVG to cover the features.
		let reset = function reset() {
			let feature = topojson.feature( neighborhoodData, neighborhoodData.objects.neighborhoods );
			let bounds = this.path.bounds( feature );

			let topLeft = bounds[0];
			let bottomRight = bounds[1];

			this.svg.attr('width', bottomRight[0] - topLeft[0])
				.attr('height', bottomRight[1] - topLeft[1])
				.style('left', topLeft[0] + 'px')
				.style('top', topLeft[1] + 'px');

			this.g.attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')');
			this.sketchGroups.forEach( function( g ) {
				g.attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')');
				g.selectAll('path').attr('d', function( data ){
					data.geometry.coordinates = data.geometry.coordinates.map( randomizeCoordinate );
					return this.path( data );
				}.bind( this ) );
			}, this );

			this.feature.attr('d', this.path);

		}.bind( this );
		map.on('viewreset', reset );
		reset();
	};

	this._addMouseBehavior = function() {
		//this.g.on( 'mouseover', function( ) { console.log( this ); } );
	};

	this._setBasemap = function(){
		L.esri.basemapLayer('Gray').addTo(this.map);
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
			this._addMouseBehavior();
		}
	}
} );

module.exports = stampit.compose( privateMethods, publicMethods );
