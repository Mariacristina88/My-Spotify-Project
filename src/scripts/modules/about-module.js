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
