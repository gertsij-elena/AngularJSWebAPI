(function () {
    'use strict';
    angular.module('testapp').filter('pagination', function () {
        return function (input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    }); 
})();