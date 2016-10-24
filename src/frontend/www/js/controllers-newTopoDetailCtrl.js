angular.module('starter.controllers')
.controller('NewTopoDetailCtrl', function($scope, $stateParams, Topos, Geolocation, $ionicModal, $ionicActionSheet, $ionicPopover, $cordovaCamera, $ionicPopup, $http) {

  //$scope.topo = Topos.get($stateParams.topoId);
    $scope.newtopo = new Object(); //created to the databinding to work
    $scope.newtopo.grade = 0;
    $scope.newtopo.stars = 0;
    var topo = new Object();
    topo.name = "new boulder";
    topo.ownerId = "carloswestman";
    topo.svgData = "";
    topo.picture = "./img/guestUser.png";

    $scope.topo = topo;
    $scope.currentImageData = {}; 
    console.log("0:" + $scope.currentImageData);
    
    
 //Actionsheet for tool selection
    $scope.showTools = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Holds' },
       { text: 'Start/End' },
       { text: 'Feet' }
     ],
     titleText: 'Pick your tool',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       switch (index)
       {
       case 0: //holds
           arg = {};
           arg.tool = 'circle';
           arg.color = 'red';
           $scope.$broadcast('changeTool',arg);
           break;
        case 1: //Start/End
           arg = {};
           arg.tool = 'doubleCircle';
           arg.color = 'red';
           $scope.$broadcast('changeTool',arg);
           break;
        case 2: //Feet
           arg = {};
           arg.tool = 'circle';
           arg.color = 'green';
           $scope.$broadcast('changeTool',arg);
       break;
       }
       return true;
     }
   });

 };

 //Modal Topo Edit
    
       $ionicModal.fromTemplateUrl('templates/modal-newtopo.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.newModal = modal;
       console.log("new modal registered");
   });
	
   $scope.openNewModal = function() {
       console.log("opening new modal");
       console.log("3:");
           console.log($scope.topo.picture);
       console.log("4:");
       console.log($scope.currentImageData);
      $scope.newModal.show();
   };
	
   $scope.closeNewModal = function() {
      $scope.newModal.hide();
       //Transfer SVG Modal Content into Topo and SVG Detail
       var newModalTopoSvgitem= document.getElementById('newModalTopoSvg');
       var newTopoDetailSvgitem= document.getElementById('newTopoDetailSvg');
        var SVGdata = newModalTopoSvgitem.innerHTML;
        $scope.topo.svgData = SVGdata;  // A string
        newTopoDetailSvgitem.innerHTML = $scope.topo.svgData;
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.newModal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
    ///end toolbox and edit modal config


    
  $scope.getPicture = function(){  
    var options = {
      quality: 10,
      destinationType: Camera.DestinationType.FILE_URI, //DATA_URL, //FILE_URI, //
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
//      targetWidth: 500,
//      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation: true
    };

      $cordovaCamera.getPicture(options).then(function(imageDataURL) {
      $scope.currentImageData = imageDataURL; //imageData; //
      var image = document.getElementById('myImage');
      image.src = $scope.currentImageData; //imageDataURL;//"data:image/jpeg;base64," + imageData;//imageData; //  
    
       //get image dimensions. (this code is twice clean it)
      $scope.pictureNaturalWidth = image.naturalWidth;
      $scope.pictureNaturalHeight = image.naturalHeight;
      console.log("$scope.pictureNaturalWidth " + $scope.pictureNaturalWidth);
          console.log("$scope.pictureNaturalHeight " + $scope.pictureNaturalHeight);
          
          
          $scope.topo.picture = $scope.currentImageData; 
          $scope.openNewModal()
      }, function(err) {
      // error
          console.log("error here:" + err);
    });
};
    
  $scope.uploadBoulder = function(){  
        uploadURL = "http://carloswestman.com:8080";
        console.log("file_URI: " + $scope.currentImageData);
       
      //get image dimensions.
      var svg = document.getElementById('newModalTopoSvg'); //from new modal
      var image = document.getElementById('myImage'); //from current captured image
      var pictureNaturalWidth = image.naturalWidth;
      var pictureNaturalHeight = image.naturalHeight;
      var svgViewPortWidth = svg.viewBox.baseVal.width; //svg.attributes.viewPortWidth.value;
      var svgViewPortHeight = svg.viewBox.baseVal.height; //.attributes.viewPortHeight.value;
      
        var picUploadSuccess = function(res)
        {
            //we should re organize this cascade promises...
            //Get Position
            //GeolocationOptions = { enableHighAccuracy: true };
            
            var onGeolocationSuccess = function(position) {
                console.log({"function": "onSuccess", "acc": position.coords.accuracy, "position": position});
    console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
                
                //Upload Boulder
                                    //console.log(res);
                //console.log(this);
                //console.log($scope);
                    //console.log("upload success"); 
                //Get SVG Data
                var SVGitem= document.getElementById('newModalTopoSvg');
                var SVGdata = SVGitem.innerHTML;  // A string
                
                
                    data =  "name=" + $scope.newtopo.name
                    + "&ownerId=" + "carloswestman"
                    + "&pictureId=" + JSON.parse(res.response).id
                    + "&pictureNaturalWidth=" + pictureNaturalWidth
                    + "&pictureNaturalHeight=" + pictureNaturalHeight
                    + "&grade=" + $scope.newtopo.grade
                    + "&latitude=" + position.coords.latitude
                    + "&longitude=" + position.coords.longitude
                    + "&accuracy=" + position.coords.accuracy
                    + "&svgViewPortWidth=" + svgViewPortWidth
                    + "&svgViewPortHeight=" + svgViewPortHeight  
                    + "&svgData=" + SVGdata;        
                    console.log("data: " + data);

                    console.log("preparing boulder post");
                    $http({
                        method  : 'POST',
                        url     : 'http://carloswestman.com:8080/api/boulders',
                        data    : data, 
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(response){
                        
                        $scope.formData = data;
                        console.log("boulder created");
                        console.log(response);
                        
                        
   var alertPopup = $ionicPopup.alert({
     title: 'Boulder uploaded ',
     template: 'Crush it!'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
                        
                        
                        });   
            console.log("upload success -end");
};

// onError Callback receives a PositionError object
//
function onGeolocationError(error) {
    console.error('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function onGeolocationProgress(position) {
    console.log({"function": "onProgress", "acc": position.coords.accuracy, "position": position});
}

//navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
  Geolocation.getAccurateCurrentPosition(onGeolocationSuccess, onGeolocationError, onGeolocationProgress);         
            
            

        };
        var picUploadFail = function(res)
        {
            alert("Upload failed");
                    console.log(res);
        };
                // Upload image to server
        upload = function (imageURI, serverURL) {
            var ft = new FileTransfer();
            var    options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
                "description": "Uploaded from my phone"
            };

            console.log("calling upload with");
            console.log("imageURI: " + imageURI );
            console.log("ServerURL: " + serverURL);
            ft.upload(imageURI, encodeURI(serverURL + "/api/pictures"),
                function (fileUploadResult) {
                picUploadSuccess(fileUploadResult);
                },
                function (e) {
                console.log(e);
                    alert("Upload failed");
                }, options);
        };
      
      upload($scope.currentImageData, uploadURL);        
      console.log("uploaded picture function ended") ; 
    };
    
    

//New Workflow...
    //1. take picture
    //2. Mark holds
    //3. Add name and grade
    //4. Upload Boulder

$scope.getPicture();

    

   






});