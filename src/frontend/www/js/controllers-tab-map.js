angular.module('starter.controllers')
.controller('MapCtrl', function($scope, $state, Topos) {

    $scope.$on('$ionicView.enter', function(){
        // Set to redraw Mapbox after is was hidden
        window.dispatchEvent(new Event('resize'));  
    });
L.mapbox.accessToken = 'pk.eyJ1IjoiY2FybG9zd2VzdG1hbiIsImEiOiJjaXU5em91ZXIwMDBlMzRxZm05Zmtqcjc3In0.KEbKFYi6weYBvw0-HKirPw';
$scope.myMap = L.mapbox.map('myMap', 'mapbox.streets')
    .setView([49.2824, -123.109], 9);
var myLayer = L.mapbox.featureLayer().addTo($scope.myMap);
    
 var geojson = {
    type: 'FeatureCollection',
    features: []
};
    //Add topo markers to map
    if(Topos.isInit())
        {
            topos = Topos.topos();
            for (var i = 0; i < topos.length; i++) 
            {
//                      L.marker([topos[i].latitude, topos[i].longitude])
//                    .addTo($scope.myMap);  

                title = 'V' + topos[i].grade;
                if(topos[i].name != 'undefined')
                    { title += ", " + topos[i].name;}
                description = '<a href="#/tab/topos/' + topos[i]._id + '">open</a>';
                feature =
                {
                    type: 'Feature',
                    properties: {
                        title: title,
                        description: description,
                        'marker-color': '#ff0000',
                        'marker-size': 'large',
                        'marker-symbol': topos[i].grade,
                        'topoId': topos[i]._id,
                        url: 'http://en.wikipedia.org/wiki/Baltimore'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [topos[i].longitude, topos[i].latitude]
                    }
                };
    geojson.features.push(feature);
            }
    
        }
    myLayer.setGeoJSON(geojson);
    
    //control events and links of markers:
        myLayer.eachLayer(function(layer) {

    var content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
        '<p>Tap again on the boulder!<\/p>' ;      
     layer.bindPopup(content);
  }  );
myLayer.on('click', 
function(e) { 

poppy = e.layer.getPopup();
if(!poppy._isOpen) //false, second click triggers order to close bebore it actually closes
{
 console.log(poppy);
    $state.go('tab.topo-detail', {topoId: e.layer.feature.properties.topoId});
}

});
    //end of control events and links of markerts sextions
    
});