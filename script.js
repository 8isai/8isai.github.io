
        var circleMarkerCount = 0;
        // Function to initialize Google Map
        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {lat: 13.736717, lng: 100.523186}
            });
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
                    var infowindow = new google.maps.InfoWindow();
                    var circle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: map,
                        center: pos,
                        radius: 1.5 // 1.5 meters radius around the user's location
                    });

                    infowindow.setPosition(pos);
                    infowindow.setContent('You are here!');
                    infowindow.open(map);
                    map.setCenter(pos);

                    // Add circle marker at current location
                    addCircleMarker(pos, map);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            // Zoom to current location button event listener
            document.getElementById('zoomToCurrentLocationBtn').addEventListener('click', function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
                        map.setCenter(pos);
                        map.setZoom(18);
                    }, function() {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });
        }
        // Function to add circle marker
        function addCircleMarker(location, map) {
            var circle = new google.maps.Circle({
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0000FF',
                fillOpacity: 0.35,
                map: map,
                center: location,
                radius: 1.5
            });
            circleMarkerCount++;
            updateCircleMarkerCount(circleMarkerCount);
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }
        document.getElementById('sendButton').addEventListener('click', function() {
            var message = document.getElementById('messageInput').value;
            if (message.trim() !== '') {
                
                document.getElementById('messageInput').value = '';

                // Get current location and display "You are here" message
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
                        var infowindow = new google.maps.InfoWindow();
                        infowindow.setPosition(pos);
                        infowindow.setContent(message);
                        infowindow.open(map);
                        map.setCenter(pos);
                    }, function() {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            } else {
                alert('Please enter a message.');
            }
        });
        // Function to update circle marker count
        function updateCircleMarkerCount(count) {
            document.getElementById('circleMarkerCounter').textContent = 'Count '+count;
        }
  
