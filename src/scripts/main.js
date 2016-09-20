requirejs.config({
    waitSeconds: 0,
    //By default load any module IDs from bower_components
    baseUrl: 'src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'angular': ['../bower_components/angular/angular'],
        'jquery': ['../bower_components/jquery/dist/jquery.min'],
        'ui-router': ['../bower_components/angular-ui-router/release/angular-ui-router.min'],
        'ui-bootstrap': ['../bower_components/angular-bootstrap/ui-bootstrap-tpls.min'],
        'ocLazyLoad': ['../bower_components/ocLazyLoad/dist/ocLazyLoad.require.min'],
        'authorization': ['scripts/modules/authorization'],
        'handlebars': ['//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.1/handlebars.min'],
        'startup': ['scripts/modules/startup-module'],
        'about-module': ['scripts/modules/about-module'],
        'home-module': ['scripts/modules/home-module'],
        'social-module': ['scripts/modules/social-module'],
    },
    shim: {     
        'jquery': {
            exports: 'jquery'
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'ocLazyLoad': {
            exports: 'ocLazyLoad',
            deps: ['angular']
        },
        'ui-router': {
            exports: 'ui-router',
            deps: ['angular']
        },
        'authorization': {
            exports: 'authorization',
            deps: ['jquery', 'handlebars']
        },
        'ui-bootstrap': ["angular"],
        'startup': ['jquery', 'ui-bootstrap', 'ui-router', 'ocLazyLoad', 'authorization'],
        'home-module': ['startup'],
        'social-module': ['startup'],
        'about-module': ['startup', 'authorization']
        
    }
});

require(['startup'], function (startup) {
    angular.bootstrap(document.body, ['startup']);
});



