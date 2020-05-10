

var settings = {
    "url": "https://api.covid19india.org/data.json",
    "method": "GET",
    "timeout": 0,
};/*
active: "15649"
confirmed: "20228"
deaths: "779"
deltaconfirmed: "0"
deltadeaths: "0"
deltarecovered: "0"
lastupdatedtime: "09/05/2020 21:34:08"
recovered: "3800"
state: "Maharashtra"
statecode: "MH"
statenotes: "[05-M*/
$.ajax(settings).done(function (response) {
    var js = response;
    console.log(js);
      function loop(data) {
          var state;
          for (state of Object.values(js.statewise))
          {     
              if (state.state === data) {
                
                  return `<strong>State:${state.state}</strong><br><strong>Confirmed:${state.confirmed}</strong><br><strong>Active:${state.active}</strong><br><strong>Deaths:${state.deaths}</strong><br><strong>Recovered:${state.recovered}</strong>`;
              }
          }
        
    }
   // loop('features');
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3ViaGFtcGFuZGV5IiwiYSI6ImNqcm9sNDZodjB2NHU0ZnVwZHFud3JmN3MifQ.A_Qm2ugoPINVOruCMZWsbA';
   
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
        center: [20, 78], // starting position [lng, lat]
        maxBounds: [68, 6, 97, 37],
    });
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
   // var marker = new mapboxgl.Marker().setLngLat([88.3630371, 22.5626297]).addTo(map);
    var hoveredStateId = null;
    map.on('load', function () {
        // Add a source for the state polygons.
        map.addSource('states', {
            'type': 'geojson',
            'data':
                'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson'
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'paint': {
                'fill-color': 'rgba(200, 100, 240, 0.1)',
                'fill-outline-color': 'rgba(200, 100, 240, 1)'
            }
        });

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'states-layer', function (e) {
           
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(loop(e.features[0].properties.NAME_1))//e.features[0].properties.name
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'states-layer', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'states-layer', function () {
            map.getCanvas().style.cursor = '';
        });
    });
});




