'use strict';

angular.module('zeroSoundApp')
  .controller('mainCtrl', function mainCtrl($scope) {
    $scope.clip = Clip({
        "kitIndex":13,
        "effectIndex":18,
        "tempo":120,
        "swingFactor":0,
        "effectMix":0.19718309859154926,
        "kickPitchVal":0.5,
        "snarePitchVal":0.5,
        "hihatPitchVal":0.5,
        "tom1PitchVal":0.5,
        "tom2PitchVal":0.5,
        "tom3PitchVal":0.5,
        "rhythm":[
            [2,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0],
            [0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],
            [0,1,0,1,0,1,1,0,0,1,0,1,0,0,1,1],
            [0,0,0,0,2,0,0,0,0,0,0,0,2,0,2,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    });
    init();
    $scope.drumMachine = new DrumMachine();
    $scope.drumMachine.loadBeat($scope.clip);
    $scope.clip.tempo = 100;
  });
