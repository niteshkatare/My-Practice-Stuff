define(['ui-router'], function () {

    var controllerProvider = null;

    var app = angular.module("app", ['ui.router'], function ($controllerProvider) {
        console.log('Test');
        controllerProvider = $controllerProvider;
    });


//    app.config(['$controllerProvider', function ($controllerProvider) {
//        app.registerController = $controllerProvider.register;
//    } ]);

    app.init = function () {
        angular.bootstrap(document, ['app']);
    };


    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: 'views/home/home.html',
                controller: 'homeCtrl',
                resolve: {
                    load: ['$q', function ($q) {
                        var defered = $q.defer();
                        require(['../scripts/controllers/homeCtrl'], function () {
                            registerController('app', 'homeCtrl');
                            //controllerProvider.register('homeCtrl', function ($scope) {
                            //});
                            defered.resolve();
                            //$rootScope.$apply();
                        });
                        return defered.promise;
                    } ]
                }
            })
        .state("about", {
            url: "/about",
            templateUrl: 'views/account/about.html',
            controller: 'aboutCtrl',
            resolve: {
                load: ['$q', function ($q) {
                    var defered = $q.defer();
                    require(['../scripts/controllers/aboutCtrl'], function () {
                        registerController('app', 'aboutCtrl');
//                        controllerProvider.register('aboutCtrl', function ($scope) { 
//                        });
                        defered.resolve();
                        //$rootScope.$apply();
                    });
                    return defered.promise;
                } ]
            }
        });
    });

    function registerController(moduleName, controllerName) {
        // Here I cannot get the controller function directly so I
        // need to loop through the module's _invokeQueue to get it
        var queue = angular.module(moduleName)._invokeQueue;
        for (var i = 0; i < queue.length; i++) {
            var call = queue[i];
            if (call[0] == "$controllerProvider" &&
           call[1] == "register" &&
           call[2][0] == controllerName) {
                controllerProvider.register(controllerName, call[2][1]);
                console.log(call[2][1]);
            }
        }
    }
    return app;
});


