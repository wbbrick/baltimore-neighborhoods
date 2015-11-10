/*
 * Modal View - the modal view, which shows data when a neighborhood is selected
 */

let Backbone = require('backbone');
let _ = require('lodash');
var transition = require('../../../semantic/dist/components/transition');
var modal = require('../../../semantic/dist/components/modal');
var dimmer = require('../../../semantic/dist/components/dimmer');

module.exports = ( function(){
	return Backbone.View.extend( {
		initialize: function( options ) {
			this.store = options.store;
			this.neighborhoods = options.neighborhoods;

			this.unsubscribe = this.store.subscribe( this.toggle.bind( this ) );
		},

		toggle: function() {
			if( _( this.store.getState().selectedNeighborhood ).isEmpty() ) {
				this.$el.modal( 'close' );
			} else {
				this.$el.modal( 'open' );
			}
		},

		template: require('../templates/modal.ejs')(),

		render: function() {
			this.$el.html( this.template );
			$(this.el).modal();
		}
	} );
} )();
