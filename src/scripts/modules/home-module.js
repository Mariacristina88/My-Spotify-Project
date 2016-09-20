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