(function () {
    'use strict';

    angular
        .module('testapp')
        .factory('testService', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        var fac = {};
        fac.GetAllRecords = function () {
            return $http.get('/api/Items/');
        };
        fac.AddNewRecords = function (item) {
            return $http.post('/api/Items/', item);
        };
        fac.DeleteRecords = function(id) {
            return $http.delete('/api/Items/'+id);
        };
        //fac.UpdateRecords = function (id,item) {
        //    return $http.put('/api/Items/'+id,item);
        //};
        return fac;
    }
})();