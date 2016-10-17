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

angular.module('starter.controllers').filter('BoulderNameWithComma', function () {
return function (input) {
    if (input == 'undefined') {
        return '';
    } else {
        return (', ' + input );
    }
};
});