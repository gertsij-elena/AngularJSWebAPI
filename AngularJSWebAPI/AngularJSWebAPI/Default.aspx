﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AngularJS.Default" %>

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
   <form id="form1" runat="server">
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
                       <%-- <button ng-click="edit(item])">Update</button>--%>
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

       <%-- <div ng-hide="Items.Id != '' ">--%>
            <div>
                <h2>Add</h2>
            </div>
            <div hidden="hidden">
                <label for="ItemId">Id</label>
                <input type="text" data-ng-model="Items.Id" />
            </div>
            <div>
                <label for="name">Name</label>
                <input type="text" data-ng-model="Items.Name" />
            </div>

            <div>
                <label for="count">Count</label>
                <input type="text" data-ng-model="Items.Count" />
            </div>

            <div>
                <label for="description">Description</label>
                <input type="text" data-ng-model="Items.Description" />
            </div>
            <br />
            <div>
                <button data-ng-click="save()">Save</button>
                <button data-ng-click="cancel()">Cancel</button>
            </div>
        <%--</div>--%>
        <div ng-show="Items.Id != '' ">
            <div>
                <h2>Изменить</h2>
            </div>
            <div hidden="hidden">
                <label for="ItemId">Id</label>
                <input type="text" data-ng-model="Items.Id" />
            </div>
            <div>
                <label for="name">Name</label>
                <input type="text" data-ng-model="Items.Name" />
            </div>

            <div>
                <label for="count">Count</label>
                <input type="text" data-ng-model="Items.Count" />
            </div>

            <div>
                <label for="price">Description</label>
                <input type="text" data-ng-model="Items.Description" />
            </div>
            <br />
            <div>
                <button data-ng-click="update()">Update</button>
                <button data-ng-click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
