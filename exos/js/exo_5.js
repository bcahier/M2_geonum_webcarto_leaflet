var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map)

map.setView([45.719, 4.918], 17);

var veloIcon = L.icon ({
  iconUrl: '../img/velo.png',
  iconSize: [36, 36],
  iconAnchor: [18,36]
});


// rappels sur le chargement "rapide" d"un geoJSON

// 1. copier le geojson (ressemble à {"type":"FeatureCollection","features":[],...} ) dans une variable dans un fichier .js 
//    Donc on aura bien un fichier /data/data_stations_velov.js qui contient
//    var stations_velov = {"type":"FeatureCollection","features":[],...} 
// 2. charger ce fichier .js dans le script HTML avec <script src="data/data_stations_velov.js"></script>
//    ⚠️ s'assurer que le fichier data est chargé dans le HTML AVANT le script exo_5.js (car exo_5.js a besoin de la variable stockée dans data_stations_velov.js) 
// 3. Eventuellement vérifier dans la console (au chargement de la page HTML) que les fichiers sont biens chargés (pas d'erreur ou avertissements) 
// 4. ⚠️ S'assurer que le fichier GeoJSON récupéré est bien en WGS84, sinon leaflet n'affichera rien ou alors n'importe quoi

// affichage basique d'un geojson, sans paramétrage
var velov_basique = L.geoJSON(stations_velov).addTo(map); // stations_velov = la variable dans le fichier data_stations_velov.js


//affichage des stations avec un icone
var velov = L.geoJSON(stations_velov,{
  pointToLayer: function (feature, latlng){ // fonction utilisée pour afficher les points dans un format particulier prend en paramètre le feature (donc le point) et latlng les coordonnées du point
    return L.marker(latlng,{icon:veloIcon}); // on retourne pour chaque feature (=chaque point) un marker avec notre icone
  }
}).addTo(map);


var baseLayers = {
  "OpenStreetMap": osm
};
//définir les surcouches
var overlays = {
  "geoJSON de base": velov_basique,
  "geoJSON avec icones": velov
};
L.control.layers(baseLayers, overlays).addTo(map);

//penser à centrer la carte sur le geoJSON !
map.fitBounds(velov.getBounds())


