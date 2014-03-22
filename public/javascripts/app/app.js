

var app = angular.module("tasks",[
  'tasks.controllers',
  'tasks.services',
  "ngRoute"
  ])

app.config([
  '$routeProvider', 
  '$locationProvider', 
  function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true)


    $routeProvider.when('/',{
      templateUrl:'/partials/main',
      controller: 'tasksController'

    })

}])
