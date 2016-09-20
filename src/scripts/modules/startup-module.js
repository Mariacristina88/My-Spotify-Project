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