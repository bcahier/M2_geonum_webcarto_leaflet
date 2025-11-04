var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);
map.setView([45.719, 4.918], 17);


//ajouter un marqueur simple
var marker = L.marker([45.7179362, 4.9196902]);
marker.addTo(map);

// supprimer un marqueur ==> utilisation d'une condition pour ne supprimer le layer que si il existe!
if (map.hasLayer(marker)){
    map.removeLayer(marker);
}


var circle_marker = L.circleMarker(
    //position
    [45.7174886, 4.9190906],
    { //paramètres  
        radius: 20,
        color:'#795d1fff',
        fillColor:'#c24a0eff',
        fillOpacity:0.8,
        weight:7
    } 
);
circle_marker.addTo(map);

//cercle avec un rayon en M
var circle = L.circle(
[45.71793, 4.91968],
50, // le rayon en m
{ color: 'green', fillOpacity: 0.7 }
);
circle.addTo(map);

//ligne
var line = L.polyline([[45.71964002, 4.9182032], [45.7221640, 4.9153070], [45.7275100, 4.9156503], [45.7315674, 4.9147154]],
    {
        color:"red",
        weight:10,
        opacity: 0.5,
        lineCap:"butt",
        dashArray:"10 5"
    }
)
line.addTo(map);


var polygon = L.polygon([
    [45.7174322, 4.9187703], [45.7183342, 4.9199559], [45.7181565, 4.9202223], [45.7172580, 4.9190334]], 
    {
        color: 'purple', 
        fillOpacity: 0.5});
polygon.addTo(map);

circle.bindPopup("Coucou !");
polygon.bindTooltip("Les tooltips <br/> c'est aussi du <span style='color: red'>HTML ! </span>") //possibilité de mettre du html dans le popup/tooltip

// utiliser une classe CSS qui est définie dans votre feuille de style CSS 
// (celle qui est appelée depuis votre page html)
circle_marker.bindTooltip("From CSS", {className: 'my_popup', permanent: true}) 


//création d'un icone
var geonumIcon = L.icon ({
  iconUrl: '../img/logo.jpg', // ⚠️ le chemin de l'image est relatif au fichier HTML!! (../) permet de remonter au dossier parent pour ensuite descendre dans le dossier /img
  iconSize: [36, 36],
  iconAnchor: [18,36]
});

var geonum_marker = L.marker([45.7186024, 4.9192939], {icon: geonumIcon}) //utilisation de l'icone sur un marqueur simple, l'icone est passé en option
geonum_marker.addTo(map);