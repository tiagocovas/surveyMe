'use strict';

var surveyMeControllers = angular.module('surveyMeControllers', []);

surveyMeControllers.controller('loadingControl', ['$scope',  '$http', '$mdDialog','$mdMedia','$location',
   function($scope, $http, $mdDialog,$mdMedia, $location) {
     $scope.$watch('online', function() {
       if(!$scope.online){
         $location.path('/no-internet');
       }
     });


    $http.get("https://private-anon-8ee6384d71-blissrecruitmentapi.apiary-mock.com/health").success(function(data) {
       if(data.status == "OK"){
         $location.path( "/questions" );
       }
       else{
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
         $mdDialog.show({
           controller: function ($scope, $route) {
             $scope.retry = function() {
               $route.reload();
             };
           },
           template:
             '<md-dialog aria-label="erro">' +
             '<md-toolbar>'+
               '<div class="md-toolbar-tools">'+
                 '<h2>Server\'s health is not so good, at the moment</h2>'+
               '</div>'+
             '</md-toolbar>'+
                '<md-dialog-actions>' +
                  '<md-button ng-click="retry()" md-autofocus>' +
                  'Retry' +
                  '</md-button>' +
                '</md-dialog-actions>' +
             '</md-dialog>',
           parent: angular.element(document.body),
           clickOutsideToClose:true,
           fullscreen: useFullScreen
         })
       }
    });
  }]);

surveyMeControllers.controller('questionsControl', ['$scope', '$http','$location',
  function($scope, $http,$location) {
    $scope.$watch('online', function() {
      if(!$scope.online){
        $location.path('/no-internet');
      }
    });
    var limit=10;
    function httpRequest(){
      $scope.loading = true;
      $http.get("https://private-anon-8ee6384d71-blissrecruitmentapi.apiary-mock.com/questions?"+limit+"&0").success(function(data) {
        $scope.questions = data;
        $scope.loading = false;
      });
    }
    $scope.hoverIn = function(){
        this.hoverEdit = true;
    };
    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };
    $scope.loadMore = function() {
      limit += 10;
      httpRequest();
    };

    httpRequest();

  }]);

surveyMeControllers.controller('questionDetailControl', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {
    $scope.$watch('online', function() {
      if(!$scope.online){
        $location.path('/no-internet');
      }
    });
    $scope.loading = true;
    $http.get('https://private-anon-8ee6384d71-blissrecruitmentapi.apiary-mock.com/questions/' + $routeParams.questionId).success(function(data) {
      $scope.question = data;
      $scope.loading = false;
    });

    $scope.updateQuestion = function(choice){

        var answer = angular.copy($scope.question);
        angular.forEach(answer.choices, function(value, key) {
          if(value.choice==choice){
                value.votes=1;
          }
          else
            value.votes=0;
        });
        $http.put('https://private-anon-8ee6384d71-blissrecruitmentapi.apiary-mock.com/questions/'+answer.id, answer).success(function(data) {
            alert("Thank you for your vote!");
            $location.path( "/questions" );
        });
    };


  }]);

  surveyMeControllers.controller('shareScreenControl',['$scope','$http','$location',
    function($scope,$http,$location){
      $scope.$watch('online', function() {
        if(!$scope.online){
          $location.path('/no-internet');
        }
      });
      $scope.shareEmail = function(){
        var url = $location.absUrl();
        var email = $scope.email;

        $http.post('https://private-anon-8ee6384d71-blissrecruitmentapi.apiary-mock.com/share?'+email+'&'+url).success(function(data) {
          if(data.status=="OK"){
            alert("Your e-mail was sucessfully sent.")
            $location.path( "/questions" );
          }
          else{
            alert("There was an error sending your e-mail. Please try again");
          }

        });
      }
    }
  ]);

  surveyMeControllers.controller('noInternetControl',['$scope','$location',
    function($scope,$location){
      $scope.$watch('online', function() {
        if($scope.online){
          $scope.back();
        }
      });
    }
  ]);
