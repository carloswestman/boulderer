//Filter definitions
angular.module('starter.controllers').filter('distance', function () {
return function (input) {
    if (input >= 1000) {
        return (input/1000).toFixed(2) + 'km';
    } else {
        return input + 'm';
    }
};
});
angular.module('starter.controllers').filter('age', function () {
return function (input) {
        if (input >= 86400000) {
        return Math.floor(input/86400000) + ' days ago';};
        if (input >= 3600000) {
        return Math.floor(input/3600000) + ' hours ago';};
        if (input >= 300000) {
        return Math.floor(input/60000) + ' minutes ago';};
        
        return 'now';
    
  

};
});
angular.module('starter.controllers').filter('BoulderNameWithComma', function () {
return function (input) {
    if (input == 'undefined') {
        return '';
    } else {
        return (', ' + input );
    }
};
});