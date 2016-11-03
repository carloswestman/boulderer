angular.module('starter.controllers')
.controller('ToposCtrl', function($scope, UserService, Geolocation, Topos,$ionicLoading,$ionicModal,$ionicPopover,$ionicPopup, $state) {
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
    
    
    
    $scope.filteredTopos = [];
    $scope.goToState = function (filteredTopos, topoId, index) 
    {
        Topos.setFilteredTopos(filteredTopos);
        Topos.setFilteredIndex(index);
         $state.go('tab.topo-detail', {topoId: topoId});
    };
    
    orderByOptions = [];
    orderByOptions.push( { "name": "grade", "order":['-grade','-distance']} );
    orderByOptions.push( { "name": "age", "order":['-age']} );
    orderByOptions.push( { "name": "distance", "order":['-distance','-grade']} );
    //orderByOptions.distance = ['distance','grade'];
    $scope.orderByOptions = orderByOptions;
    //$scope.orderBySetting = orderByOptions.grade;
    
    ageOptions = [];
    ageOptions.push( { "name": "1 day", "value": 86400000} );
    ageOptions.push( { "name": "10 days", "value":(86400000 * 15)} );
    ageOptions.push( { "name": "60 days", "value":(86400000 * 60)} );
    ageOptions.push( { "name": "90 days", "value":(86400000 * 90)} );
    ageOptions.push( { "name": "infinitum", "value":(86400000 * 5)} );
    
    $scope.ageOptions = ageOptions;
    

    $scope.settings = {};
    $scope.Defaultsettings = {};
    
    
    $scope.Defaultsettings.searchGradeMin = 0;
    $scope.Defaultsettings.searchGradeMax = 16;
    $scope.Defaultsettings.searchMinStars = 0;
    $scope.Defaultsettings.searchMaxDistance = 20000;
    $scope.Defaultsettings.searchOrderBy = "Grade";
    
    $scope.settings = $scope.Defaultsettings;
    
//    $scope.resetSettings = function()
//    {
//     $scope.settings = $scope.Defaultsettings;   
//    };
    
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
  console.log("Starting Geolocation Service");
  Geolocation.init().then( function(evt){
      console.log("Starting Topo Service");  
      Topos.all().then(
    function(res){
       // console.log(res);
        $scope.topos = res;
        $ionicLoading.hide();
    },
    function(err){
        console.log("failed getting All from Topo Service");
      console.error(err);
        $ionicLoading.hide();
    }
      );
  }, function(err){ console.log(err);});

    
  //$scope.topos = Topos.all();
  $scope.remove = function(topo) {
  user = UserService.getUser();
  Topos.remove(topo, user).then(
      function(response)
      {
                if ( response.status != 200)
          {
             var alertPopup = $ionicPopup.alert({
            title: 'Opps ',
            template: response.message
            }); 
          }
      }
  );

      
  };
  $scope.addTopo = function (Topos){
        console.log("should add topo here?");
    };
    console.log("tab-topos controller end");
});