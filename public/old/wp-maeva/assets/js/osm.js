// Where you want to render the map.
var element = document.getElementById('osm-map');

// Create Leaflet map on map element.
var map = L.map(element,{
  zoomControl: false,
  attributionControl: false,
  minZoom: 11,
  maxZoom: 15
});

// Add OSM tile leayer to the Leaflet map.
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: null
}).addTo(map);

// Target's GPS coordinates.
var target = L.latLng('46.36718205435491', '6.49819206979767');

// Set map's center to target with zoom 14.
map.setView(target, 12);

// Place a marker on the same location.
L.marker(target).addTo(map);
