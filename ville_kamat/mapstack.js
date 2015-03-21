$('#VILLEJUTTU').append('<div id="map"></div>');

$('#map').height($( document ).height() - 100);

$( window ).resize(function() {
    $('#map').height($( document ).height
    () - 100);
});

//simple XHR request in pure JavaScript
function load(url, callback) {
    var xhr;

    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"];

        for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch(e){}
        }
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if(xhr.readyState < 4) {
            return;
        }

        if(xhr.status !== 200) {
            return;
        }

        // all is well
        if(xhr.readyState === 4) {
            callback(xhr);
        }
    }

    xhr.open('GET', url, true);
    xhr.send('');
}
var map = new L.Map("map", {
    center: [0, 0],
    zoom: 3
})
    .addLayer(new L.TileLayer("http://{s}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{z}/{x}/{y}.png"));

//Load a gepJSON file with ajax into Leaflet
load('js/world-countries.JSON', function(xhr) {
    var collection = JSON.parse(xhr.responseText);

    var geojson = L.geoJson(collection, {
        onEachFeature: onEachFeature
    }).addTo(map);

    function clickFeature(e) {
        var features = e.target.feature,
            properties = features.properties,
            name = properties.name;
        console.log(name);
        //TODO: Tähän pitää se funktio että lähettää vaadiniin ne klikatut jutut
    }

    function onEachFeature(feature, layer) {
        layer.on({
            click: clickFeature
        });
    }

    map.on({
        click: function() {
            map.setView([0,0],2);
        }
    });

});
