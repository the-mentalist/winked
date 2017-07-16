var RModel = function(title, rid){
	this.title = title;
	this.rid = rid;
};

// restaurants
var restaurants = [];
locations.forEach(function(loc){
	restaurants.push(new RModel(loc.title, loc.rid));
});

var LocationModel = function(rests, located){
	this.rests = ko.observableArray(rests);
	this.located = located;
};

// location specific collection
var locations_ko = [
	new LocationModel(restaurants.slice(0,5), 'Sector 29'),
 	new LocationModel(restaurants.slice(5,9), 'Galleria Market'),
  new LocationModel(restaurants.slice(9,11), 'Sector 39'),
  new LocationModel(restaurants.slice(11,14), 'DLF Cyber Hub')
];

var viewModel = function(){
	var self = this;

	this.availableLocations = ko.observableArray(locations_ko);
	this.selectedLocation = ko.observable();
	/*this.zoomToArea = function(){
		debugger;
	};*/
	this.infoAvailable = ko.observable({
		"cuisines": "",
		"url": "",
		"average_cost_for_two": ""
	});
	this.selectedRestaurant = function(){
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
				//self.infoAvailable("Error in Request");
			}
		});
	};

};

ko.applyBindings(new viewModel());