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

// on crée une fonction qui génère une couleur pour un feature = une station
function get_color(feature){
  // le nombre de places de la station est récupérée dans l'objet nbbornettes des propriétées (properties) du feature 
  var nb_places = feature.properties.nbbornettes
  if (nb_places < 20){
    return "#c71c10ff"
  } else if ( nb_places < 30){
    return "#d88c00ff"
  } else if ( nb_places < 50){
    return "#91ff00ff"
  } else {
    return "#1aaa0cff"
  }
}
// *************
//eventuellement pour y voir plus clair => afficher le GeoJSON dans la console pour voir comment sont structués les features 
//et les propriétés associées (les attributs)
console.log(stations_velov)
// **************

// OPTION 1 : couleur différente selon le nombre de bornes
var velov_couleur = L.geoJSON(stations_velov,{
  pointToLayer: function (feature, latlng){//pour générer les points
    return L.circleMarker(latlng,{color:get_color(feature)}); // on récupère la couleur générée par la fonction, on transmet le feature à la fonction pour qu'elle récupère la propriété qui nous intéresse
  },
  onEachFeature: function (feature, layer) {//pour paramétrer chaque feature (ici chaque point, mais pourrait être des polygones, lignes etc), la fonction prend aussi en paramètre le feature et le layer (layer = le GeoJSON complet)
      //on ajoute un popup avec les propriétés du feature (du point)
      layer.bindPopup(
        "<b>Station :</b> " + feature.properties.nom +
        "<br><b>Capacité :</b> " + feature.properties.nbbornettes
      );
      
  }
}).addTo(map);




// OPTION 2 : taille différente selon le nombre de bornes : la taille = le nombre de bornettes
var velov_taille = L.geoJSON(stations_velov,{
  pointToLayer: function (feature, latlng){//pour générer les points
    return L.circleMarker(latlng,{color:"purple",radius:feature.properties.nbbornettes}); 
  },
  onEachFeature: function (feature, layer) {
      //on ajoute un popup avec les propriétés du feature (du point)
      layer.bindPopup(
        "<b>Station :</b> " + feature.properties.nom +
        "<br><b>Capacité :</b> " + feature.properties.nbbornettes
      );
      
  }
})


//gestion de l'affichage des couches
var baseLayers = {
  "OpenStreetMap": osm
};
//définir les surcouches
var overlays = {
  "variation couleur": velov_couleur,
  "variation taille": velov_taille
};
L.control.layers(baseLayers, overlays).addTo(map);

//penser à centrer la carte sur le geoJSON !
map.fitBounds(velov_couleur.getBounds())