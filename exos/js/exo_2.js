var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);
map.setView([45.719, 4.918], 17);

var t2 = [[45.71964002, 4.9182032], [45.7221640, 4.9153070], [45.7275100, 4.9156503], [45.7315674, 4.9147154]];
var batiment_v = [[45.7174322, 4.9187703], [45.7183342, 4.9199559], [45.7181565, 4.9202223], [45.7172580, 4.9190334]];
var buffer_arret = 300;

var tramIcon = L.icon ({
  iconUrl: '../img/tram.png',
  iconSize: [50, 20],
  iconAnchor: [25,20]
});


// OPTION 1 envoyer un prompt pour demander le texte à afficher à tous les arrêts
var texte_popup = prompt("Quel texte à afficher pour les arrêts de tram ? ")

//les arrêts du t2
for (var i = 0;i < t2.length;i++){
    var coords = t2[i]
    var arret_marker = L.marker(coords, {icon: tramIcon})
    arret_marker.addTo(map);
    // OPTION 2 : placer le prompt ici => dans la boucle donc demandera un nom pour chaque arrêt
    //var texte_popup = prompt("Quel texte à afficher pour le point n°"+(i+1))
    
    arret_marker.bindPopup(texte_popup); // afficher le texte saisi dans un popup
}


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



