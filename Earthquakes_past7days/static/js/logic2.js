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
    'Streets': streets,
    'Satellite': satelliteStreets
};

// create the map object with a center and zoom level and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines
let myStyle = {
    color: '#ffffa1',
    weight: 2
}

//Grabbing our GeoJSON data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);

    //this function returns the style data for each of the earthquakes we plot
    //the map. we pass the magnitude of the earthquake into the function 
    //to calculate the radius
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity:1,
            fillColor: '#ffae42',
            color: '#000000',
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: .5
        }
    };
    
    //this function determines the radius of the earthquake marker based on its magnitude
    // Earthquakes with a magnitude of 0 will be plotted with a raidus of 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude*4;
    }

    //creating a geojson layer with the retrieved data
    L.geoJson(data, {
        
        // we turn each feature into a citclemarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        //we set the style for each circleMarker using our styleInfo function
        style:styleInfo

    }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
satelliteStreets.addTo(map);