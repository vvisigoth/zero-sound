
'use strict';

angular.module('zeroSoundApp')
    .directive('pianoRoll', function() {
        console.log('ping');
        return {
            restrict: 'E',
            scope: {
                val: '='
            }, 
            link: function(scope, element, attrs) {
                console.log('scope');
            }
        }
    });
