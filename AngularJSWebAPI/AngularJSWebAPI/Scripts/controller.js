(function () {
    'use strict';

    angular
        .module('testapp')
        .controller('testController', controller);
    function controller($scope, $http, testService) {
        $scope.itemsData = null;

        //GetAllItems
        testService.GetAllRecords().then(function (response) {
            alert("success");
            $scope.itemsData = response.data;
            $scope.clear();
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
            alert($scope.Items.Id);
            alert($scope.Items.Name);
            alert($scope.Items.Count);
            if ($scope.Items.Name != "" &&
                $scope.Items.Description != "" && $scope.Items.Count != "") {
                testService.AddNewRecords($scope.Items)
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
        $scope.delete = function (item) {
            //alert("delete");
            //alert(item.Id);
            var id = parseInt(item.Id);
            testService.DeleteRecords(id)
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
        //$scope.update = function () {
        //    alert("update");
        //    var id = it.Id;
        //    alert(id);
        //    testService.UpdateRecords($scope.Items)
        //        .then(function successCallback(response) {
        //            alert(response);
        //            $scope.itemsData = response.data;
        //            $scope.clear();
        //        },
        //        function errorCallback(response) {
        //            alert("Error : " + response.data.ExceptionMessage);
        //        });
        //};
        //make pagination
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.range = function () {
            var rangeSize = 4;
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0) {
                    ps.push(i);
                }
            }
            return ps;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.itemsData.length / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };
    }
   
})();

