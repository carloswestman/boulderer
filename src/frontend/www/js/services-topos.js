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
var topos = []; 
var isInit = false;
var newestBoulderDate = new Date(0); // 1970
    
    var refresh = function()
    {
        var topoDefer = $q.defer(); 
        $http.get("http://carloswestman.com:8080/api/boulders?fromDate=" + newestBoulderDate.toISOString()).then(function(response){
        console.log("query: http://carloswestman.com:8080/api/boulders?fromDate=" + newestBoulderDate);
        console.log(response);
        var toposSet = response.data; //JSON.parse(response.data);
     //get images for topos (thumbnails ideally)...
     //create json array of pictures.
     //get pictures:
     var picturePromises = [];
     //var picturePromises and update newestBoulderDate ;
     for(var i = 0; i < toposSet.length; i++) {
         boulderDate = new Date(Date(toposSet[i].updatedAt));
         if ( boulderDate.getTime() > newestBoulderDate.getTime() ) { newestBoulderDate = boulderDate }
         var picturePromise = $http.get("http://carloswestman.com:8080/api/pictures/" + toposSet[i].pictureId,{responseType: "arraybuffer"} );
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
                 for(var j= 0 ; j < toposSet.length; j++)
                 {
                     //is this line of code excecuting after the promise was already fulfilled
                     if(toposSet[j].pictureId == pictureId)
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
                toposSet[k].picture = "data:image/JPEG;base64," + dataBase64;
                     
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
                     for(var i=0; i < toposSet.length ; i++)
                         {
                             toposSet[i].currentLatitude = position.coords.latitude;
                             toposSet[i].currentLongitude = position.coords.longitude;
                             toposSet[i].currentAccuracy = position.coords.accuracy;
                             toposSet[i].distance = distance(toposSet[i].currentLatitude,toposSet[i].currentLongitude, toposSet[i].latitude, toposSet[i].longitude);
                             toposSet[i].distance = Math.round(toposSet[i].distance * 1000) ;
                         }
                     
                     for(i=0;i<toposSet.length;i++) {topos.push(toposSet[i]);}
                     
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



  return {

    all: function() {return refresh();},
    isInit: function () { return isInit;} ,
    newestBoulderDate: function () { return newestBoulderDate;},
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


