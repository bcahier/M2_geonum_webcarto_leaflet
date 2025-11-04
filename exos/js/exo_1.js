var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);
map.setView([45.719, 4.918], 17);

// variable T2 = tableau qui contient toutes les coordonnées des arrêts de trams 
var t2 = [[45.71964002, 4.9182032], [45.7221640, 4.9153070], [45.7275100, 4.9156503], [45.7315674, 4.9147154]];

//ensemble des coordonnées des points du bâtiment
var batiment_v = [[45.7174322, 4.9187703], [45.7183342, 4.9199559], [45.7181565, 4.9202223], [45.7172580, 4.9190334]];

//le rayon de 300m à appliquer est passé en variable
var buffer_arret = 300;



var tramIcon = L.icon ({
  iconUrl: '../img/tram.png',  
  iconSize: [50, 20],
  iconAnchor: [25,20]
});


//les arrêts du t2
// On crée une boucle pour chaque arrêt de tram (voir les boucles FOR)
for (var i = 0;i < t2.length;i++){
    // i est la position actuelle dans le tableau t2
    //ajouter les points sur les arrêts
    var coords = t2[i] // on récupère les coordonnées à la position i dans le tableau
    
    var arret_marker = L.marker(coords, {icon: tramIcon}) //marqueur simple sur ces coordonnées
    arret_marker.addTo(map);

    //ajouter des rayons de 200m
    var arret_rayon = L.circle(
        coords,
        buffer_arret,
        { color: 'orange', fillOpacity: 0.3 }
    );
    arret_rayon.addTo(map);
}


//la ligne de tram
var t2_layer = L.polyline(
    t2,
    {
        color:"#2f86ddff",
        weight:8,
        opacity: 0.8,
        dashArray:"20 10" // pour afficher la ligne en pointillés. Voir la doc leaflet pour les propiétés
    }
)
t2_layer.addTo(map);


//le batiment V
var batiment_v_layer = L.polygon(
    batiment_v,
    {color:"purple"}
)
batiment_v_layer.addTo(map)