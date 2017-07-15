var LocationModel = function(locs, located){
	this.locs = ko.observableArray(locs),
	this.located = located
};

var locations = [
	new LocationModel(['Down Town Kitchen & Bar', 'Pind Balluchi', 'Starbucks', 'Molecule Air Bar', 'Bikanervala'], 'Sector 29'),
 	new LocationModel(['Subway', 'Cafe Wanderlust', 'Khan Chacha', 'Escape', 'Crusty'], 'Galleria Market'),
  new LocationModel(['Dunkin\' Donuts', 'Dominoz', 'PizzaHut'], 'Sector 39')
];


var viewModel = function(){
	
	this.availableLocations = ko.observableArray(locations);
	this.selectedLocation = ko.observable()

};

ko.applyBindings(new viewModel());