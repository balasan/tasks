
var controllers = angular.module(
  "tasks.controllers" , [])


controllers.controller("tasksController",
  [ '$scope','tasksService', 
    function($scope,tasksService){

    $scope.title = "ALL THIS STUFF I HAVE TO DO"

    $scope.tasks ={}

    tasksService.getData(function(data){
      $scope.tasks = data
    })



}
])