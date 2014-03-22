
var services = angular.module('tasks.services',[])

services.factory("tasksService",
  [ '$http',function($http){

  return{
    getData : function(callback){
      $http.get('/api/tasks').success(function(data){
        console.log(data)
        callback(data)
      }
      ).error(function(err){
        console.log(err)
      })
    }
  }
}])