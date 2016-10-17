angular.module('starter.controllers')
.controller('NewTopoDetailCtrl', function($scope, $stateParams, Topos,$ionicModal,$ionicPopover,$cordovaCamera, $http) {

    ///Start Toolbox and Edit Modal code
     //modal popoever code here

    
//    $scope.popoverSelection = "pencil"; //default
//    //console.log("popoverSelection = " + $scope.popoverSelection);
//    $ionicPopover.fromTemplateUrl('templates/modal-topo-popover.html', {
//      scope: $scope
//   }).then(function(popover) {
//            $scope.popover = popover;
//            console.log("popover tool menu initialized");
//   });
//
//   $scope.openPopover = function($event) {
//      $scope.popover.show($event);
//   };
//
//   $scope.closePopover = function() {
//      $scope.popover.hide();
//   };
//
//   //Cleanup the popover when we're done with it!
//   $scope.$on('$destroy', function() {
//      $scope.popover.remove();
//   });
//
//   // Execute action on hide popover
//   $scope.$on('popover.hidden', function() {
//      // Execute action
//   });
//
//   // Execute action on remove popover
//   $scope.$on('popover.removed', function() {
//      // Execute action
//   });
//
//    $scope.popoverSelect = function(selection)
//    {
//      $scope.popoverSelection = selection;  
//    };
    
    
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

  //$scope.topo = Topos.get($stateParams.topoId);
    $scope.newtopo = new Object(); //created to the databinding to work
    $scope.newtopo.grade = 0;
    $scope.newtopo.stars = 0;
var topo = new Object();
topo.name = "new boulder";
topo.ownerId = "carloswestman";
topo.svgData = "";
topo.picture = "./img/guestUser.png";
//pictureId: String,
//latitude: Number,
//longitude: Number,
//accuracy: Number,
//grade: Number,
//communityGrade: Number,
//likes: String,
//crush: String
  $scope.topo = topo;
  $scope.currentImageData = {}; 
    console.log("0:" + $scope.currentImageData);
    
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
            GeolocationOptions = { enableHighAccuracy: true };
            var onGeolocationSuccess = function(position) {
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
                        });   
            console.log("upload success -end");
};

// onError Callback receives a PositionError object
//
function onGeolocationError(error) {
    console.error('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
            
            

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

   






});