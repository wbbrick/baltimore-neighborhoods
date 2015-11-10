let _ = require('underscore');

//actions
const SELECT_NEIGHBORHOOD = 'SELECT_NEIGHBORHOOD';

function selectNeighborhood( neighborhood ) {
	return { type: 'SELECT_NEIGHBORHOOD', neighborhood };
}

//reducers
const initialState = {
	selectedNeighborhood : '',
	choroplethValue: 'Vacant'
};

function reduxApp( state, action ) {
	if( _.isUndefined( state ) ) { state = initialState; }
	if( action.type === 'SELECT_NEIGHBORHOOD') {
		return _.extend( {}, state, { selectedNeighborhood: action.neighborhood } );
	}
	return state;
} 
module.exports = { reduxApp, selectNeighborhood };
