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