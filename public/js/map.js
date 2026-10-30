mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,//[77.209, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9, // starting zoom
});

console.log("coordinates");


const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates) //Listing.geometry.coordinates
    .setPopup() = (new mapboxgl.Popup({ offset: 25 }).setHTML("<h1>Hello World!</h1>"))
        //.setPopup(new mapboxgl.Popup({ offset: 25 }))
        //.setHTML(`<h5>${listingLocation}</h5><p>Exact location will be provided after booking</p>`))
        .addTo(map);
