var map;
var markers = [];
function initMap() {
    // will execute only when page loads and before user interacts
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.459269, lng: 77.072419},
    zoom: 13,
    mapTypeControl: false
    });
    // info window to display information
    var largeInfowindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('f75c50');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('0091ff');
    for (var i = 0; i < locations.length; i++) {
    	var position = locations[i].location;
    	var title = locations[i].title;
    	// Create a marker per location, and put into markers array.
    	var marker = new google.maps.Marker({
    		position : position,
    		id : i,
    		title : title,
    		map : map,
    		icon: defaultIcon
    	});
    	markers.push(marker);
    	// event listner to open the info window
    	marker.addListener('click', function() {
    		populateInfoWindow(this, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
}

function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	  infowindow.marker = marker;
	  infowindow.setContent('<div>' + marker.title + '</div>');
	  infowindow.open(map, marker);
	  // Make sure the marker property is cleared if the infowindow is closed.
	  infowindow.addListener('closeclick',function(){
	    infowindow.setMarker = null;
	  });
	}
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(24, 40),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(24,40));
  return markerImage;
}

function zoomToArea(location){
	map.setCenter(location);
}
