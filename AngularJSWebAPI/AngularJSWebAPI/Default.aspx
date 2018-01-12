<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AngularJS.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript" src="/Scripts/library/angular.js"></script>
    <script type="text/javascript" src="/Scripts/app.js"></script>
    <script type="text/javascript" src="/Scripts/controller.js"></script>
    <script type="text/javascript" src="/Scripts/factory.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div ng-app="testapp" ng-controller="testController">        
            {{model}}      
    Here is the content 

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Count</th>
                   <%-- <th></th>
                    <th></th>--%>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in itemsData">
                    <td>{{item.Id}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Description}}</td>
                    <td>{{item.Count}}</td>
                     <td>
                        <button ng-click="edit(itemsData[$index])">Изменить</button>
                    </td>
                    <td>
                        <button ng-click="delete($index)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </form>
</body>
</html>
