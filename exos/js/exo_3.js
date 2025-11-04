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


var bounds = map.getBounds(); // récupérer l'encadrement initial de la carte : celui au chargement de la page

var nord = bounds.getNorth(); // récupérer la limite nord, donc Y max
var sud = bounds.getSouth(); // Y min
var est = bounds.getEast(); // X min
var ouest = bounds.getWest(); // X max

var emprise = L.polygon([
    [nord,ouest],[nord,est],[sud,est],[sud,ouest] //polygone avec les lat/lon de l'emprise 
    ],
    {color:'red', fillOpacity:0} // rectangle transparent
).addTo(map);


// point aléatoire dans ce cadre
var lon = ouest + Math.random() * (est - ouest); // génère une longitude aléatoire entre Xmin et Xmax
var lat = sud + Math.random() * (nord - sud); // génère une latitude aléatoire entre Ymin et Ymax
var point_aleat = L.circleMarker([lat,lon],{radius:10}).addTo(map)





/////
// pour aller plus loin : demander un nombre de points à générer au chargement de la page et générer les points dans le cadre

function testNombre(str) { // fonction pour tester si le texte est un nombre et entre 1 et 10000
  const n = Number(str);
  return Number.isInteger(n) && n >= 1 && n <= 10000;
}

function couleurAleatoire() { // fonction pour générer une couleur aléatoire au format hexadécimal
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

var nb_pts = prompt('Combien de points aléatoires générer ? ')
//tant que la donnée saisie n'est pas bonne, continuer de demander
while (!testNombre(nb_pts)){
  alert("le nombre saisi est invalide ou dépasse les limites (1 à 10000)")
  nb_pts = prompt('Combien de points aléatoires générer ? ')
}


//faire une boucle de nb_points
for (var i = 1; i <= nb_pts;i++){
  var lon = ouest + Math.random() * (est - ouest); 
  var lat = sud + Math.random() * (nord - sud);
  var point_aleat = L.circleMarker([lat,lon],{radius:10, color:couleurAleatoire()}).addTo(map)
}

