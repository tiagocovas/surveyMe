var surveyMeApp = angular.module('surveyMeApp', [
  'ngRoute',
  'surveyMeControllers',
  'ngMaterial',
  'ngAnimate'
]);

surveyMeApp.config(function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
          templateUrl : 'partials/loading.html',
          controller : 'loadingControl'
      })
      .when('/questions', {
        templateUrl: 'partials/questions-list.html',
        controller: 'questionsControl'
      })
      .when('/questions/:questionId', {
        templateUrl: 'partials/questions-detail.html',
        controller: 'questionDetailControl'
      })
      .when('/share/:questionId', {
        templateUrl: 'partials/share-screen.html',
        controller: 'shareScreenControl'
      })
      .when('/no-internet', {
        templateUrl: 'partials/no-internet.html',
        controller: 'noInternetControl'
      })
      .otherwise({
        redirectTo: '/'
      })
      $locationProvider.html5Mode(true);

  });

surveyMeApp.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener("online", function() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
});

surveyMeApp.run(function ($rootScope, $location) {

    var history = [];
    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });
    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

});
