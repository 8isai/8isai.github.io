// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const apiKey = 'AIzaSyADPTzE5wBrMXV3nPb1sHX5MIuYFUY8VYs';

function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const center = { lat: position.coords.latitude, lng: position.coords.longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center,
    });

    const messageBox = document.getElementById('message');
    const sendButton = document.getElementById('send');

    sendButton.addEventListener('click', function() {
      const message = messageBox.value;
      // Simulate adding message to current location (marker or info window)
      console.log(`Message: ${message} at your current location`);
      messageBox.value = ""; // Clear message box after sending
    });
  });
}

// Load Google Maps API
window.onload = function() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADPTzE5wBrMXV3nPb1sHX5MIuYFUY8VYs&callback=initMap`;
  document.body.appendChild(script);
};
