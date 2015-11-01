let fs = require('fs');
let simplify = require('simplify-geojson');

fs.readFile( './unsimplified-neighborhoods.geojson', function( err, result ) {
	fs.writeFile( './neighborhoods.geojson',  JSON.stringify( simplify( JSON.parse( result ), 0.0001 ) ) );
} );
