angular.module('starter.controllers')
.controller('TopoDetailCtrl', function($scope, $stateParams, Topos,$ionicModal,$ionicPopover) {
  
//      Topos.all().then(
//    function(res){
//        //check if this works, if yes, maybe we should change all() for a ready/uploaded()state.
//      console.log("stateParms.topoId:" + $stateParams.topoId);
//        $scope.topo = Topos.get($stateParams.topoId);
//    },
//    function(err){
//        console.log("failed getting topo from Topo Service");
//      console.error(err);
//    }
//      );
    $scope.topo = Topos.get($stateParams.topoId);
    
    //modal popoever code here
    $scope.popoverSelection = "pencil"; //default
    console.log("popoverSelection = " + $scope.popoverSelection);
       $ionicPopover.fromTemplateUrl('templates/modal-topo-popover.html', {
      scope: $scope
   }).then(function(popover) {
      $scope.popover = popover;
           console.log("popover initialized");
   });

   $scope.openPopover = function($event) {
      $scope.popover.show($event);
   };

   $scope.closePopover = function() {
      $scope.popover.hide();
   };

   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.popover.remove();
   });

   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
   });

   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
   });

    $scope.popoverSelect = function(selection)
    {
      $scope.popoverSelection = selection;  
    };
    
    
    //modal code here
    
       $ionicModal.fromTemplateUrl('templates/modal-topo.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
       console.log("modal registered");
           
//           var SVGitem= modal.$el.find('modalTopoSvg'); //document.getElementById('modalTopoSvg');
//                var SVGdata = $scope.topo.svgData;  // A string
//           SVGitem.innerHTML = SVGdata;
//           console.log(SVGitem);
   });
	
   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });


});