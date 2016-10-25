angular.module('starter.services')
.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    user = JSON.parse(window.localStorage.starter_facebook_user || '{}');
    user.userAvailable = true;
  };

  var getUser = function(){
    return user;
  };
 
  var logoutUser = function(){
     window.localStorage.removeItem('starter_facebook_user');
     user = {};
     user.userAvailable = false;
     user.name = "anonymous";
     user.photoURL = "./img/guestUser.png"; 
     user.userAvailable = false;
  };
var user = JSON.parse(window.localStorage.starter_facebook_user || '{}');
if(!user.userID)
    {
        user.userAvailable = false;
        user.name = "anonymous";
        user.photoURL = "./img/guestUser.png";
    }
    else
    {
        user.userAvailable = true;
    }




  return {
    getUser: getUser,
    setUser: setUser,
    logoutUser: logoutUser
  };
});