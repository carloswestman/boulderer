angular.module('starter.controllers')
.controller('ToposCtrl', function($scope, Topos,$ionicLoading,$ionicModal,$ionicPopover) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
   //tabToposModalSearchOptions() 
   //modal-topo-search-filter.html
  //modal code here
orderByOptions = {};
    orderByOptions.grade = ['grade','distance','opener'];
    orderByOptions.stars = ['grade','distance'];
    orderByOptions.age = ['grade','distance'];
    orderByOptions.distance = ['distance','grade','opener'];
    orderByOptions.opener = ['opener','grade','distance'];
$scope.orderByOptions = orderByOptions;
$scope.orderBySetting = orderByOptions.grade;

    var Defaultsettings = new Object;
    var settings = new Object;
    Defaultsettings.searchGradeMin = 0;
    Defaultsettings.searchGradeMax = 16;
    Defaultsettings.searchMinStars = 0;
    Defaultsettings.searchMaxDistance = 100000;
    Defaultsettings.searchOrderBy = "Grade";
    $scope.settings = Defaultsettings;
    
    $scope.resetSettings = function()
    {
     $scope.settings = Defaultsettings;   
    };
    
    $scope.search = function(item){
    if (
        (item.grade >= $scope.settings.searchGradeMin)
        && (item.grade <= $scope.settings.searchGradeMax)
        && (item.distance <= $scope.settings.searchMaxDistance) 
        )
        {
        return true;
        }
    
    return false;
 };
    
       $ionicModal.fromTemplateUrl('templates/modal-topo-search-filter.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.ToposModalSearchOptions = modal;
       console.log("ToposModalSearchOptions registered");
           
//           var SVGitem= modal.$el.find('modalTopoSvg'); //document.getElementById('modalTopoSvg');
//                var SVGdata = $scope.topo.svgData;  // A string
//           SVGitem.innerHTML = SVGdata;
//           console.log(SVGitem);
   });
	
   $scope.openToposModalSearchOptions = function() {
      $scope.ToposModalSearchOptions.show();
   };
	
   $scope.closeToposModalSearchOptions = function() {
      $scope.ToposModalSearchOptions.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.ToposModalSearchOptions.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('ToposModalSearchOptions.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('ToposModalSearchOptions.removed', function() {
      // Execute action
   });
    
    
    
    $scope.doRefresh = function (refresher) {
    
        Topos.all().then(
            function(topos)
            {
                $scope.topos = topos;
                $scope.$broadcast('scroll.refreshComplete');
            }
            ,function(error)
            {
            Alert(error);
            $scope.$broadcast('scroll.refreshComplete');
            }   
        );         
  };

//      $scope.topos = [{
//    "_id": "",
//    "grade": 0,
//    "pictureId": "",
//    "ownerId": "",
//    "name": "Loading...",
//    "__v": 0
//  }];

            // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  Topos.all().then(
    function(res){
        console.log("receiving Topos.all from server");
        console.log(res);
      $scope.topos = res;
        $ionicLoading.hide();
    },
    function(err){
        console.log("failed getting All from Topo Service");
      console.error(err);
        $ionicLoading.hide();
    }
      );
    
  //$scope.topos = Topos.all();
  $scope.remove = function(topo) {
  //Topos.remove(topo);
      console.log("should remove topo here");
  };
  $scope.addTopo = function (Topos){
        console.log("should add topo here?");
    };
    console.log("tab-topos controller end");
});