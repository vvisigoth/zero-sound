'use strict';

angular.module('zeroSoundApp')
    .controller('DrumMachineCtrl', function($scope) {
        var temp = [];
        $scope.drums = [];
        $scope.paths = [];
        for (var name in BUFFERS_TO_LOAD) {
            $scope.drums.push(name);
            $scope.paths.push(BUFFERS_TO_LOAD[name]);

        };
        $scope.selected = $scope.drums[0];

        $scope.select = function(drum) {
            $scope.selected = drum;
        };

        $scope.drumClass = function(item) {
            return item === $scope.selected ? 'active': undefined;
        };

        $scope.waveClass = function(item) {
            return item === $scope.selected ? 'showWave': 'hideWave';
        };


    });
