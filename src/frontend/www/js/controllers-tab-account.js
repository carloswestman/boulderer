angular.module('starter.controllers')
.controller('AccountCtrl', function($scope, $state, $q, UserService, $ionicLoading,$ionicActionSheet) {
  

        $scope.displayName = "anonymous";
        //$scope.email = "";
        $scope.photoURL = "./img/guestUser.png";
        
    // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('tab.account');
        //cwm
        console.log("setting fb no scope 1" + profileInfo.id + " " + profileInfo.name);
        $scope.$apply(function(){
        $scope.displayName = profileInfo.name;
        $scope.email = profileInfo.email;
        $scope.photoURL = "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large";
        });
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});
                        //cwm
                        console.log("setting fb no scope 2" + profileInfo.id + " " + profileInfo.name);
                        $scope.$apply(function(){
        $scope.displayName = profileInfo.name;
        $scope.email = profileInfo.email;
        $scope.photoURL = "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large";
                        });

						$state.go('tab.account');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
                    console.log("setting fb no scope 3");
                    $scope.$apply(function(){
					$scope.displayName = user.name;
        $scope.email = user.email;
        $scope.photoURL = user.picture;
                        });

                    $state.go('tab.account');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
    
    
    //This method is called for Facebook logout
    $scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

                // Facebook logout
                console.log("facebook logging out");
                facebookConnectPlugin.logout(function(){
                $ionicLoading.hide();
                $state.go('tab.account');
                    $scope.$apply(function(){
                    $scope.displayName = "anonymous";
                    $scope.email = "";
                    $scope.photoURL = "./img/guestUser.png";
                    });
                },
                function(fail){
                $ionicLoading.hide();
                    console.log("FB logout failed");
                });
                return true;
			 }
		});
	};
}
           
           
           
           );

