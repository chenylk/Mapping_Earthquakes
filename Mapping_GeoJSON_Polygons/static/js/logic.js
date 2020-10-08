// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    SatelliteStreets: satelliteStreets,
};

// create the map object with a center and zoom level and default layer
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//accessing the toronto airline routes GeoJSON URL
let torontoHoods = 'https://raw.githubusercontent.com/chenylk/Mapping_Earthquakes/main/torontoNeighborhoods.json'

// Create a style for the lines
let myStyle = {
    color: 'blue',
    weight: 1,
    fillColor: 'yellow'
}

//Grabbing our GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    //creating a geojson layer with the retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature,layer) {
            layer.bindPopup(feature.properties.AREA_NAME)
        }
    }).addTo(map)
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
satelliteStreets.addTo(map);