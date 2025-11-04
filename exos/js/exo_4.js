var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map)

var GeoportailFrance_orthos = L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 19,
	format: 'image/jpeg',
	style: 'normal'
});


map.setView([45.719, 4.918], 17);

var t2 = [[45.71964002, 4.9182032], [45.7221640, 4.9153070], [45.7275100, 4.9156503], [45.7315674, 4.9147154]];
var batiment_v = [[45.7174322, 4.9187703], [45.7183342, 4.9199559], [45.7181565, 4.9202223], [45.7172580, 4.9190334]];
var buffer_arret = 300;

var tramIcon = L.icon ({
  iconUrl: '../img/tram.png',
  iconSize: [50, 20],
  iconAnchor: [25,20]
});


//la ligne de tram
var t2_layer = L.polyline(
    t2,
    {
        color:"#2f86ddff",
        weight:8,
        opacity: 0.8
    }
)
t2_layer.addTo(map);

//le batiment V
var batiment_v_layer = L.polygon(
    batiment_v,
    {color:"purple"}
)
batiment_v_layer.addTo(map)

//groupe de couches ==> points des arrêts de tram + rayons de 300m
var arrets_tram = L.layerGroup() //initialiser le groupe de couches
arrets_tram.addTo(map); // ajouter le groupe de couches à la carte 
for (var i = 0;i < t2.length;i++){
    var coords = t2[i]
    
    var arret_marker = L.marker(coords, {icon: tramIcon})
    arret_marker.addTo(arrets_tram) // ne pas ajouter le point directement à la carte mais au goupe de couches
    
    var arret_rayon = L.circle(
        coords,
        buffer_arret,
        { color: 'orange', fillOpacity: 0.3 }
    );
    arret_rayon.addTo(arrets_tram); // ne pas ajouter le point directement à la carte mais au goupe de couches
};


//définir les couches de fond
var baseLayers = {
  "OpenStreetMap": osm,
  "ortho" : GeoportailFrance_orthos
};
//définir les surcouches
var overlays = {
  "Ligne tram": t2_layer,
  "Bâtiment V": batiment_v_layer,
  "Arrêts de tram" : arrets_tram
};
L.control.layers(baseLayers, overlays).addTo(map); // penser à ajouter le contrôle de couches à la carte