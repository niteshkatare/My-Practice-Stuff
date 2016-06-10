require.config({
    baseurl: '/scripts/',
    paths: {
        'angular': 'libs/angular',        
        'ui-router': 'libs/angular-ui-router',
        'jquery': 'libs/jquery-1.10.2',
        'bootstrap': 'libs/bootstrap'                
    },
    shim: {        
        'ui-router': {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports: 'angular'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    deps: ['app']
});

require(["app","bootstrap"],function (app) {        
        app.init();
});