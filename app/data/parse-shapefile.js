let fs = require('fs');
let shapefile = require('shapefile');

shapefile.read( './shapefile/2010_Census_Profile_by_Neighborhood_Statistical_Areas.shp', function( err, result ) {
	fs.writeFile( './neighborhoods.geojson', JSON.stringify( result ) );
});
