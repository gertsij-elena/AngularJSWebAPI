<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AngularJS.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
 
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script type="text/javascript" src="/Scripts/library/angular.js"></script>
    <script type="text/javascript" src="/Scripts/app.js"></script>
    <script type="text/javascript" src="/Scripts/factory.js"></script>
    <script type="text/javascript" src="/Scripts/controller.js"></script>    
    <script type="text/javascript" src="/Scripts/filter.js"></script>
</head>
<body>
 
    <div ng-app="testapp" ng-controller="testController">        
    
        SelectedName:<input type="text" ng-model="selectedName" />
        SelectedDescription:<input type="text" ng-model="selectedDescription" />
        SelectedCount:<input type="text" ng-model="selectedCount" />
 
        <table class="table table-striped">
            <thead>
                <tr>
                    <th hidden="hidden">ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Count</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in itemsData|filter:selectedName|filter:selectedCount|filter:selectedDescription|pagination : currentPage*itemsPerPage | limitTo: itemsPerPage">
                    <td hidden="hidden">{{item.Id}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Description}}</td>
                    <td>{{item.Count}}</td>
                     <td>
                        <button ng-click="edit(item)">Update</button>
                    </td>
                    <td>
                        <button ng-click="delete(item)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/>
      
        <div class="pagination-div">
        <ul class="pagination">
              <li ng-class="DisablePrevPage()">
                <a href ng-click="prevPage()">« Prev</a>
              </li>
              <li ng-repeat="n in range()" ng-class="{active: n == currentPage}" ng-click="setPage(n)" style="display:inline">
                <a href="#">{{n+1}},</a>
              </li>
              <li ng-class="DisableNextPage()">
                <a href ng-click="nextPage()">Next »</a>
                 
              </li>
            </ul>
       </div>
    <button type="button" ng-click="showAdd()">Add new Item</button>
        <form name="formAdd" novalidate ng-show="add">
            <label>Name:<br>
            <input type="text" name="name" data-ng-model="Items.Name" required="" ng-maxlength="50"/>
            <span ng-show="formAdd.name.$touched && formAdd.name.$invalid">
            <span ng-show="formAdd.name.$error.required">Name is required.</span>
            <span ng-show="formAdd.name.$error.maxlength">Not more than 50 character</span>
            </span>
            </label>

            <p>Description:<br>
            <input type="text" name="description" data-ng-model="Items.Description" required="" ng-minlength="5" ng-maxlength="4000"/>
            <span ng-show="formAdd.description.$touched && formAdd.description.$invalid">
            <span ng-show="formAdd.description.$error.required">Description is required.</span>
            <span ng-show="formAdd.description.$error.minlength">Not less than 5 character</span>
            <span ng-show="formAdd.description.$error.maxlength">Not more than 4000 character</span>
            </span>
            </p>

            <p>Count:<br>
            <input type="text" name="count" data-ng-model="Items.Count" required="" min="1" max="1000"/>
            <span ng-show="formAdd.count.$touched && formAdd.count.$invalid">
            <span ng-show="formAdd.count.$error.required">Count is required.</span>
            <span ng-show="formAdd.count.$error.min">So min</span>
            <span ng-show="formAdd.count.$error.max">Too max</span>
            </span>
            </p>

            <button type="submit" class="btn btn-primary" ng-disabled="formAdd.$invalid" ng-click="submit()">Save</button>
            <button data-ng-click="cancel()">Cancel</button>
        </form>

         <form name="formUpdate" novalidate ng-show="upd">
            <label>Name:<br>
            <input type="text" name="name" data-ng-model="ItemEdit.Name" required="" ng-maxlength="50"/>
            <span ng-show="formUpdate.name.$touched && formUpdate.name.$invalid">
            <span ng-show="formUpdate.name.$error.required">Name is required.</span>
            <span ng-show="formUpdate.name.$error.maxlength">Not more than 50 character</span>
            </span>
            </label>

            <p>Description:<br>
            <input type="text" name="description" data-ng-model="ItemEdit.Description" required="" ng-minlength="5" ng-maxlength="4000"/>
            <span ng-show="formUpdate.description.$touched && formUpdate.description.$invalid">
            <span ng-show="formUpdate.description.$error.required">Description is required.</span>
            <span ng-show="formUpdate.description.$error.minlength">Not less than 5 character</span>
            <span ng-show="formUpdate.description.$error.maxlength">Not more than 4000 character</span>
            </span>
            </p>

            <p>Count:<br>
            <input type="text" name="count" data-ng-model="ItemEdit.Count" required="" min="1" max="1000"/>
            <span ng-show="formUpdate.count.$touched && formUpdate.count.$invalid">
            <span ng-show="formUpdate.count.$error.required">Count is required.</span>
            <span ng-show="formUpdate.count.$error.min">So min</span>
            <span ng-show="formUpdate.count.$error.max">Too max</span>
            </span>
            </p>

            <button type="submit" class="btn btn-primary" ng-disabled="formUpdate.$invalid" ng-click="update()">Update</button>
            <button data-ng-click="close()">Close</button>
        </form>

       
    </div>
 
</body>
</html>
