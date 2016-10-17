angular.module('starter.services')
.factory('Topos', function($http,$q) {

    function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
};

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
};
 _arrayBufferToBase64 = function ( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
};   
    
    // Might use a resource here that returns a JSON array
var topos; 
var isInit = false;
    var refresh = function()
    {
        var topoDefer = $q.defer(); 
         $http.get("http://carloswestman.com:8080/api/boulders").then(function(response){
  
    console.log(response);
        topos = response.data; //JSON.parse(response.data);
     //get images for topos (thumbnails ideally)...
     //create json array of pictures.
     //get pictures:
     var picturePromises = [];
     //var picturePromises;
     for(var i = 0; i < topos.length; i++) {
         var picturePromise = $http.get("http://carloswestman.com:8080/api/pictures/bygfs/" + topos[i].pictureId,{responseType: "arraybuffer"} );
         picturePromises.push(picturePromise);
     }
    
         $q.all(picturePromises).then(function(results){
             for(var m=0; m < results.length; m++)
             {
                 data = results[m];
                 pictureId = data.config.url;
                 pictureId = pictureId.substring( pictureId.lastIndexOf('/')+1);           
                 //console.log("pictureId:" + pictureId);
                 
                 //find pictureId in topos collection and store it in K index
                 var k = -1;
                 for(var j= 0 ; j < topos.length; j++)
                 {
                     //is this line of code excecuting after the promise was already fulfilled
                     if(topos[j].pictureId == pictureId)
                         { k = j;
                         //console.log("found k:" + k);
                         }
                 }
                 
                 //add image into
                console.log(data.data);
                dataBase64 = _arrayBufferToBase64(data.data);
                //console.log(dataBase64);
                //console.log(topos);
                if (k != -1 )
                {
                topos[k].picture = "data:image/JPEG;base64," + dataBase64;
                     
                }
                 else
                {
                         console.error("a topo index k:" + k + " not found ");
                }
                
             }
             // Next stage: calculate position and distance:
             
             //include geolocation promise to get position
             navigator.geolocation.getCurrentPosition(
             function(position)
                 {
                     for(var i=0; i < topos.length ; i++)
                         {
                             topos[i].currentLatitude = position.coords.latitude;
                             topos[i].currentLongitude = position.coords.longitude;
                             topos[i].currentAccuracy = position.coords.accuracy;
                             topos[i].distance = distance(topos[i].currentLatitude,topos[i].currentLongitude, topos[i].latitude, topos[i].longitude);
                             topos[i].distance = Math.round(topos[i].distance * 1000) ;
                         }
                     topoDefer.resolve(topos);
                console.log("topoDefer resolved");
                     isInit = true; // mark as succesfully Init
                console.log(topos);
                     
                 },
                 function(error)
             {
                 console.error(error);
                 isInit = false; //mark as Init Failed
             }
             ); 
             
                
                      
         }); //end of then for get picture
     //i should manage when data fails... topoDefer.failed
});
        return topoDefer.promise;
    }; //end of refresh()


 

  // Some fake testing data
//  var topos = [{
//    id: 0,
//    name: 'El Espejo',
//    crag: 'Cochamo',
//    face: '',
//    country: 'Chile',
//    desc: 'You on your way?',
//    picture: 'img/topo0.jpg'
//  }, {
//    id: 1,
//    name: 'El Anfiteatro',
//    crag: 'La Buitrera',
//    face: '',
//    country: 'Argentina',
//    desc: 'Hey, it\'s me',
//    picture: 'img/topo1.jpg'
//  }, {
//    id: 2,
//    name: 'Ajuja M2',
//    crag: 'Frey',
//    face: 'NW',
//    country: 'Argentina',
//    desc: 'I should buy a boat',
//    picture: 'img/topo2.jpg'
//  }, {
//    id: 3,
//    name: 'Hitchcook',
//    crag: 'Cajon del Maipo',
//    face: '',
//    country: 'Chile',
//    lastText: 'Look at my mukluks!',
//    picture: 'img/topo3.jpg'
//  }, {
//    id: 4,
//    name: 'El Anfiteatro',
//    crag: 'La Buitrera',
//    face: '',
//    country: 'Argentina',
//    desc: 'This is wicked good ice cream.',
//    picture: 'img/topo4.jpg'
//  }, {
//    id: 5,
//    name: 'Socaire',
//    crag: 'Socaire',
//    face: '',
//    country: 'Chile',
//    desc: 'This is wicked good ice cream.',
//    picture: 'img/topo5.jpg'
//  }, {
//    id: 6,
//    name: 'La Placa Verde',
//    crag: 'Cajón del Maipo',
//    face: '',
//    country: 'Chile',
//    desc: 'This is wicked good ice cream.',
//    picture: 'img/topo6.jpg'
//  }, {
//    id: 7,
//    name: 'Aguja Frey',
//    crag: 'Frey',
//    face: '',
//    country: 'Argentina',
//    desc: 'This is wicked good ice cream.',
//    picture: 'img/topo7.jpg'
//  }];

  return {

    all: function() { //rename this to REFESH OR INIT
      //return topoDefer.promise;
        return refresh();
    }
      ,
      isInit: function () { return isInit;} ,
    topos: function() { return topos;} ,
//    remove: function(topo) {
//      topos.splice(topos.indexOf(topo), 1);
//    },
    get: function(topoId) {
      for (var i = 0; i < topos.length; i++) {
        if (topos[i]._id == topoId) { //= parseInt(topoId)) {
          return topos[i];
        }
      }
      return null;
    }
  };
});


