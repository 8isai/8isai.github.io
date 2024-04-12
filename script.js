let map;
let circleMarkerCounter = 0;
let currentCircleMarker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });

    // Add circle marker when page loads
    addCircleMarker();

    // Remove circle marker when page unloads
    window.addEventListener("beforeunload", function() {
        removeCircleMarker();
    });
}

function addCircleMarker() {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        // Create a circle marker
        currentCircleMarker = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: userLocation,
            radius: 100000, // Change this radius as needed
        });

        // Increment the counter
        circleMarkerCounter++;
        updateCounter();
    });
}

function removeCircleMarker() {
    if (currentCircleMarker) {
        currentCircleMarker.setMap(null);
        circleMarkerCounter--;
        updateCounter();
    }
}

function updateCounter() {
    document.getElementById("circleMarkerCounter").innerText = circleMarkerCounter;
}
