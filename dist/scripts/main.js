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

define(['require', 'exports'], function ( require, exports) {
  "use strict";
    var _this = this;
    angular
        .module('about-module', ['startup'])
        .controller('aboutController', ['$state', '$stateParams', function ($state, $stateParams ) {
            _this.$state = $state;
            _this.$stateParams = $stateParams;
           
            _this.initialize = function(){
                // Pass in our Router module and call it's initialize function
                alert('about alert');
              };

            return _this;
        }]);    
        

});

(function() {
        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }
        var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');
        var oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');
        var params = getHashParams();
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;
        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
              access_token: access_token,
              refresh_token: refresh_token
            });
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                  $('#login').hide();
                  $('#loggedin').show();
                }
            });
          } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }
          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
        }
      })();

define(['require', 'exports'], function ( require, exports) {
  "use strict";
    var _this = this;
    angular
        .module('home-module', ['startup'])
        .controller('homeController', ['$state', '$stateParams', function ($state, $stateParams ) {
            _this.$state = $state;
            _this.$stateParams = $stateParams;
           
            console.log('HOME');

            return _this;
        }]);    
        

});
define(['require', 'exports'], function ( require, exports) {
  "use strict";
    var _this = this;
    angular
        .module('social-module', ['startup'])
        .controller('socialController', ['$state', '$stateParams', function ($state, $stateParams ) {
            _this.$state = $state;
            _this.$stateParams = $stateParams;
           
            console.log('social');

            return _this;
        }]);    
        

});
define(['require', 'exports', 'scripts/states'], function ( require, exports, states) {
  "use strict";
    var _this = this;
    angular
        .module('startup', ['ui.router', 'oc.lazyLoad'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            states.configureStates($stateProvider);
            
        }])
        .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false
            });
        }])
        .controller('craftController', ['$state', '$stateParams', function ($state, $stateParams ) {
            _this.$state = $state;
            _this.$stateParams = $stateParams;
           
            _this.initialize = function(){
                        // Pass in our Router module and call it's initialize function
                        alert('alert');
                      };
            return _this;
        }]);    
        

});