/*
 * Sidebar View - the sidebar view, which shows data along the side
 */

let Backbone = require('backbone');
let _ = require('lodash');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.mapController = options.mapController;
			this.neighborhoods = options.neighborhoods;
		},

		template: require('../templates/sidebar.ejs')(),

		render: function() {
			this.$el.html( this.template );
			this.mapController.createSidebar( {
				'div' : 'sidebar'
			} );
		}
	} );
} )();
