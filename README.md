Udacity Project - Neighborhood Map

Application featuring some specific dine in locations in Gurgaon, India. Currently few locations are added and hardcoded lat long information
On selecting a specific location, map zooms to that and markers along with sub-locations are visible, selecting a sub-location displays its information, Title, Cuisines, Average Cost and there are buttons which redirects to Restaurant's Zomato page

For retrieving retaurant information Zomato API is used, For maps Google Maps API is used, For data binding KnockoutJs is used.

files:

location_data.js: consists of static content of location array
view.js: consists of location model, viewModel which handles data binding
main.js: consists of functions related to maps api

RModel: consists of simple smallest data model consisting of title and rid (rid is used for accessing Zomato API)
LocationModel: consists of simple locations with sub-locations array and specific location.

To Run, open index.html in your browser
