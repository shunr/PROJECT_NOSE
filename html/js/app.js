var PROJECT_NOSE = angular.module('nose', ['ui.router', 'ngAnimate', 'firebase', 'nose.controllers'])

.config(function() {
    var config = FIREBASE_CONFIG //change to FIREBASE_CONFIG_DEV when making changes on local instance
    firebase.initializeApp(config);
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "ctrl_login"
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: "ctrl_register"
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: "ctrl_dashboard"
        })
        .state('landing', {
            url: "/landing",
            templateUrl: "views/landing.html"
        })
})

.controller("ctrl_auth", function($scope, $state, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();
    $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $state.go("dashboard");
        } else {
            $state.go("login");
        }
    });
});

var N_CONTROLLERS = angular.module('nose.controllers', []);

