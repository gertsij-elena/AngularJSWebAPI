(function () {
    'use strict';

    angular
        .module('testapp')
        .controller('testController', controller);
    function controller($scope, $http, testService) {
        $scope.itemsData = null;
        $scope.add = false;
        $scope.upd = false;

        //GetAllItems
        testService.GetAllRecords().then(function (response) {
            console.log("success");
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

        $scope.ItemUpdate = {
            Id: '',
            Name: '',
            Description: '',
            Count: ''
        };
        //clear add
        $scope.clear = function () {
            $scope.Items.Id = '';
            $scope.Items.Name = '';
            $scope.Items.Description = '',
            $scope.Items.Count = ''
        };

        // Delete item       
        $scope.delete = function (item) {
            console.log("delete");
            console.log(item.Id);
            var id = parseInt(item.Id);
            testService.DeleteRecords(id)
                .then(function successCallback(response) {
                    if (response.data != null) {
                        console.log(response.data);
                        $scope.itemsData = response.data;
                        $scope.$apply();
                    }
                   
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };
        //cansel add form
        $scope.cancel = function () {
            $scope.clear();
            $scope.add = false;
        };

        //close update form
        $scope.close = function () {
            $scope.upd = false;
        }

        //show AddForm
        $scope.showAdd = function () {
            $scope.add = true;
        }
        //Add Item
        $scope.submit = function () {
            console.log("submit");

         testService.AddNewRecords($scope.Items)
             .then(function successCallback(response) {
                 if (response.data != null) {
                     $scope.itemsData.push(response.data);
                     $scope.$apply();
                     $scope.cancel(); 
                 }
            

               }, function errorCallback(response) {
               console.log("Error : " + response.data.ExceptionMessage);
            });
        }
       
        //edit
        $scope.edit = function (item) {
            $scope.ItemEdit = {Id:item.Id,Name:item.Name,Description:item.Description,Count:item.Count };
            $scope.upd = true;
        };
        //Update item       
        $scope.update = function () {
            console.log("update");
            var itemId = $scope.ItemEdit.Id;
            var id = parseInt(itemId);
          
          testService.UpdateRecords(id,$scope.ItemEdit)
          .then(function successCallback(response) {
              if (response.data != null) {
                  $scope.itemsData = response.data;
                  $scope.$apply();
                  $scope.clear();
              }
                   
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };
        //make pagination
        $scope.itemsPerPage = 10;
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

