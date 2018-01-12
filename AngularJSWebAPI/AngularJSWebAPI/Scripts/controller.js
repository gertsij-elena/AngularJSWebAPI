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
            Counter($scope);
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
        $scope.delete = function (idx) {
            alert("delete");
            var it = $scope.itemsData[idx];
            var id = it.Id;
            alert(id);
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
        $scope.update = function () {
            alert("update");
            //var it = $scope.itemsData[idx];
            var id = it.Id;
            alert(id);
            testService.UpdateRecords($scope.Items)
                .then(function successCallback(response) {
                    alert(response);
                    $scope.itemsData = response.data;
                    $scope.clear();
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };
        //var Counter = function ($scope) {
        //    var count = 0;
        //    angular.forEach($scope.itemsData, function () {
        //        count = count + 1;
        //    });
        //    $scope.count = count;
        //};
        //pagination block
        $scope.itemsPerPage = 3;
        $scope.currentPage = 1;

        $scope.range = function () {
            var rangeSize = 3;
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
            return Math.ceil($scope.count / $scope.itemsPerPage) - 1;
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
//angular.element(document).ready(function () { angular.bootstrap(document.getElementById("ownersForm"), ['testapp']); });
