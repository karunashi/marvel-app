$(document).ready(function() {
    initMap();
    //declare var
    var mapProp, geocoder, infoWindow;	

    // Initialize Firebase
    function initMap() {
	mapProp= {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    styles: [
		{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
		{elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
		{
		    featureType: 'administrative.locality',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#ffffff'}]
		},
		{
		    featureType: 'landscape',
		    elementType: 'geometry',
		    stylers: [{color: '#c9323b'}]
		},
		{
		    featureType: "all",
		    elementType: "labels.text.stroke",
		    stylers: [{"visibility": "off"}]
		},
		{
		    featureType: 'poi',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#ffffff'}]
		},
		{
		    featureType: 'poi.park',
		    elementType: 'geometry',
		    stylers: [{color: '#99282f'}]
		},
		{
		    featureType: 'poi.park',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#ffffff'}]
		},
		{
		    featureType: 'road',
		    elementType: 'geometry',
		    stylers: [{color: '#38414e'}]
		},
		{
		    featureType: 'road',
		    elementType: 'geometry.stroke',
		    stylers: [{color: '#212a37'}]
		},
		{
		    featureType: 'road',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#9ca5b3'}]
		},
		{
		    featureType: 'road.highway',
		    elementType: 'geometry',
		    stylers: [{color: '#746855'}]
		},
		{
		    featureType: 'road.highway',
		    elementType: 'geometry.stroke',
		    stylers: [{color: '#1f2835'}]
		},
		{
		    featureType: 'road.highway',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#f3d19c'}]
		},
		{
		    featureType: 'transit',
		    elementType: 'geometry',
		    stylers: [{color: '#2f3948'}]
		},
		{
		    featureType: 'transit.station',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#d59563'}]
		},
		{
		    featureType: 'water',
		    elementType: 'geometry',
		    stylers: [{color: '#1e2339'}]
		},
		{
		    featureType: 'water',
		    elementType: 'labels.text.fill',
		    stylers: [{color: '#515c6d'}]
		},
		{
		    featureType: 'water',
		    elementType: 'labels.text.stroke',
		    stylers: [{color: '#17263c'}]
		}
            ]
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }

    // footer click functions to show search modals
    $("#findHero").on("click", function(){
	$("#findHeroModal").modal({backdrop: true});
    });
    
    $("#beHero").on("click", function(){
	$("#beHeroModal").modal({backdrop: true});
    });

    $("#adopt").on("click", function(){
	$("#adoptModal").modal({backdrop: true});
    });

 
    //search functions
    // find a hero search function
    $("#findHeroSearch").on("click", function() {
	var hero = $("#searchName").val().trim();
	
    });

    // be hero search function
    $("#beHeroSearch").on("click", function() { 
	var volSearch = $("#volType").val().trim();
	var searchZip = $("#heroZip").val().trim();

	// geocode zip code into latlng for google
	function codeAddress() {
	    geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'address': searchZip}, function(results, status) {
		if (status == 'OK') {
		    mapProp.setCenter(results[0].geometry.location);
		    
		} else {
		    console.log('Geocode was not successful for the following reason: ' + status);
		}
	    });
	} // close code function

	// search within 15mile radius of zip and return to map
	infoWindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(mapProp);

	
        var request = {
            location: 'address',
            radius: 500,
            query: volSearch
        };
   
	service.textSearch(request, callback);
	
	function callback(results, status) {
	    if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
		    createMarker(results[i]);
		}
	    }
	}
	
    function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	    map: mapProp,
	    position: place.geometry.location
	});
	
	google.maps.event.addListener(marker, 'click', function() {
	    infoWindow.setContent(place.name);
	    infoWindow.open(mapProp, this);
	});
    }
    });// close be hero seacrh function
	
    // adopt search function
    $("#adoptsearch").on("click", function() {
	var animal = $("#animal").val().trim().encodeURI();
	    var adoptZip = $("#adoptZip").val().trim().encodeURI();
    });
    
}); // close ready function
    
