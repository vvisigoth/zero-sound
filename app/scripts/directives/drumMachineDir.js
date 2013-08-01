'use strict';

angular.module('zeroSoundApp')
    .directive('drumMachine', function() {
        var temp = [];
        var names = [];
        var paths = [];
        for (var name in BUFFERS_TO_LOAD) {
            temp.push('<div class="wave-viewport" id="drum-' + name + '"></div>');
            names.push(name);
            paths.push(BUFFERS_TO_LOAD[name]);

        };
        var template = '<div id="drum-machine-container">' + temp.join('') + '</div>';
        return {
            restrict: 'A',
            templateUrl: 'views/drummachine.html',
            //template: template,
            scope: {},
            link: function(scope, element, attrs) {
                scope.waveForms = [];
                for (var i = 0; i < names.length; i ++) {
                    scope.waveForms.push(Object.create(WaveSurfer));
                    console.log(names);

                    console.log($('#drum-kick').width());
                    scope.waveForms[i].init({
                        container: document.querySelector('#drum-' + names[i]),
                        waveColor: 'violet',
                        progressColor: 'purple'
                    });


                    scope.waveForms[i].load(paths[i]);

                    console.log(scope.waveForms);
                }
            }
        }

    });
