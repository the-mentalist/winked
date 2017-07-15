var map;
function initMap() {
    // will execute only when page loads and before user interacts
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.459497, lng: 77.026638},
    zoom: 15
    });
};

