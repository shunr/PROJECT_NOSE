var app = angular.module('nose', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html"
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html"
        })
        .state('landing', {
            url: "/",
            templateUrl: "views/landing.html"
        })
});



$.material.init();