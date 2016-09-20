define(["require", "exports"], function (require, exports) {
    "use strict";
    function configureStates($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
        
        .state('start', {
            url: '',
            secure: true,
            module: { name: 'startup-module', files: ['startup-module'], loaded: false }
        })

        .state('home', {
                url: '/home',
                abstract: true,
                secure: true,
                templateUrl: './src/views/main.html',
                resolve: {
                    home: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'home-module',
                            files: ['home-module']
                        });
                    }
                }
            })

        .state('home.about', {
            url: '/about',
            secure: true,
            templateUrl: './src/views/about.html',
            resolve: {
                login: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'about-module',
                        files: ['about-module']
                    });
                }
            }
        })

        .state('home.social', {
            url: '/social',
            secure: true,
            templateUrl: './src/views/social.html',
            resolve: {
                music: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'social-module',
                        files: ['social-module']
                    });
                }
            }
        });

            
           
    }
    exports.configureStates = configureStates;
});
