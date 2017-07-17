var RModel = function(title, rid){
	this.title = title;
	this.rid = rid;
};

// restaurants
var restaurants = [];
locations.forEach(function(loc){
	restaurants.push(new RModel(loc.title, loc.rid));
});

var LocationModel = function(rests, located, locations){
	this.rests = ko.observableArray(rests);
	this.located = located;
	this.locations = locations;
};

// location specific collection
var locations_ko = [
	new LocationModel(restaurants.slice(0,5), 'Sector 29', {lat: 28.466945, lng: 77.06652}),
 	new LocationModel(restaurants.slice(5,8), 'Galleria Market', {lat: 28.467252, lng: 77.08202}),
  new LocationModel(restaurants.slice(8,10), 'Unitech CyberPark', {lat: 28.442781, lng: 77.057076}),
  new LocationModel(restaurants.slice(10,13), 'DLF Cyber Hub', {lat: 28.495391, lng: 77.088467})
];

var viewModel = function(){
	var self = this;

	this.allLocations = ko.observableArray(restaurants);
	this.availableLocations = ko.observableArray(locations_ko);
	this.selectedLocation = ko.observable();
	this.selectedLocation.subscribe(function(newval){
		if(newval){
			self.allLocations(null);
			zoomToArea(newval.locations);
		}else{
			self.allLocations(restaurants);
			zoomToDefault();
		}
	});
	/*this.zoomToArea = function(){
		debugger;
	};*/
	this.infoAvailable = ko.observable({
		"cuisines": '',
		"url": '',
		"average_cost_for_two": '',
		"error": ''
	});
	this.selectedRestaurant = function(){
		var innerself = this;
		// animate
		animateMarker(this.rid);
		window.setTimeout(function(){
			stopAnimateMarker(innerself.rid);
		}, 750);

		var rid=this.rid;
		var info = {};
		//var info = getInfo(this.rid);
		$.ajax({
			type: 'GET',
			url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+rid,
			beforeSend: function(xhr){xhr.setRequestHeader('user-key', '64c768e904a84d43d6df7fe90a1decee');},
			success: function(response){
				info["cuisines"] = response["cuisines"];
				info["average_cost_for_two"] = response["currency"]+" "+response["average_cost_for_two"];
				info["url"] = response["url"];
				info["menu_url"] = response["menu_url"];
				info["name"] = response["name"];
				self.infoAvailable(info);
			},
			error: function(){
				self.infoAvailable({'error': 'Error in Request'});
			}
		});
	};
	/*this.animateMarker = function(){
		animateMarker(this.rid);
	};
	this.stopAnimateMarker = function(){
		stopAnimateMarker(this.rid);
	};*/

};

ko.applyBindings(new viewModel());