var locations = [
  {title: 'Down Town Kitchen & Bar', location: {lat: 28.460878, lng: 77.08053}, located_in: 'Sector 29'},
  {title: 'Subway', location: {lat: 28.467249, lng: 77.081231}, located_in: 'Galleria Market'},
  {title: 'Dunkin\' Donuts', location: {lat: 28.443554, lng: 77.05596}, located_in: 'Sector 39'}
];

function returnLocations(){
	var locs = []
	for (var location in locations){
		locs.push(locations[location].located_in)
	}
	return locs
};