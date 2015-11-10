/*
 * Modal View - the modal view, which shows data when a neighborhood is selected
 */

let Backbone = require('backbone');
let _ = require('lodash');
var transition = require('../../../semantic/dist/components/transition');
var modal = require('../../../semantic/dist/components/sidebar');
var dimmer = require('../../../semantic/dist/components/dimmer');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			//this.unsubscribe = this.store.subscribe( this.toggle.bind( this ) );
		},

		template: require('../templates/sidebar.ejs')(),

		render: function() {
			this.$el.html( this.template );
			this.$el
				.sidebar( 'attach events', '.menu-button' );
		}
	} );
} )();
