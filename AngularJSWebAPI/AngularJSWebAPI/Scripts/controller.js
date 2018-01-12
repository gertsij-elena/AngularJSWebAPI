(function () {
    'use strict';

    angular
        .module('testapp')
        .controller('testController', controller);

    function controller($scope,$http,testService) {
        $scope.model = "proba";

        $scope.itemsData = null;

        //GetAllItems
        testService.GetAllRecords().then(function (response) {
            alert("success");
            $scope.itemsData = response.data;
        }, function () {
            console.log('Нет соединения с сервером'); // Failed
            });

        $scope.Items = {
            Id: '',
            Name: '',
            Description: '',
            Count: ''
        };
        //clear enter
        $scope.clear = function () {
            $scope.Items.Id = '';
            $scope.Items.Name = '';
            $scope.Items.Description = '',
            $scope.Items.Count = ''
        };

        //AddItem
        $scope.save = function () {
            alert("save");
            if ($scope.Items.Name != "" &&
                $scope.Items.Description != "" && $scope.Items.Count != "") {
                itemService.AddNewRecords($scope.Items)
                    .then(function successCallback(response) {
                        $scope.itemsData.push(response.data);
                        $scope.apply();
                        $scope.clear();
                        alert("Item Added Successfully !!!");

                    }, function errorCallback(response) {
                        console.log("Error : " + response.data.ExceptionMessage);
                    });
            }
            else {
                alert('Please Enter the Name');
            }
        };
        // Delete item       
        $scope.delete = function (idx) {
            alert("delete");
            var it = $scope.itemsData[idx];
            var id = it.Id;
            console.log(id);
            itemService.DeleteRecords(id)
                .then(function successCallback(response) {
                    alert(response);
                    $scope.itemsData.splice(idx, 1);
                    $scope.apply();
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };




        $scope.cancel = function () {
            $scope.clear();
        };
        //edit
        $scope.edit = function (data) {
            $scope.Items = { Id: data.Id, Name: data.Name, Description: data.Description, Count: data.Count };
        };
        //Update item       
        $scope.update = function () {
            alert("update");
            //var it = $scope.itemsData[idx];
            var id = it.Id;
            alert(id);
            itemService.UpdateRecords($scope.Items)
                .then(function successCallback(response) {
                    alert(response);
                    $scope.itemsData = response.data;
                    $scope.clear();
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };

    }
})();
//angular.element(document).ready(function () { angular.bootstrap(document.getElementById("ownersForm"), ['testapp']); });
