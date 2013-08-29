'use strict';

angular.module('zeroSoundApp')
    .directive('knob', function() {
        return {
            restrict: 'A',
            templateUrl: 'views/knob.html', 
            scope: {
            },
            link: function(scope, element, attrs) {

                // Set up
                var path = $(element).find('.knob-main')[0];
                var length = path.getTotalLength();
                path.setAttribute('stroke-dasharray', length + ' ' + length);

                if (attrs.default) {
                    var value = attrs.default;
                } else {
                    var value = 0.5;
                }

                if (attrs.min) {
                    var min = attrs.min;
                } else {
                    var min = 0;
                }
                if (attrs.max) {
                    var max = attrs.max;
                }
                else {
                    var max = 1;
                }

                var name = attrs.name ? attrs.name : "No Name"

                $(element).find('.knob-label').text(name);

                // Configure animations
                path.setAttribute('stroke-dashoffset', length * (max - value));

                // Events
                scope.dragging = false;
                element.bind('mousedown', function(e) {
                    scope.dragging = true;
                    scope.startDrag = e.clientY;
                    scope.preDragVal = value;
                });
                $(window).bind('mousemove', function(e) {
                    if(scope.dragging == true) {
                        var offset = - (e.clientY - scope.startDrag);
                        console.log(offset);
                        // TODO generalize do different ranges
                        if (value <= max && value >= min) {
                            value = scope.preDragVal + (offset * 0.01);
                            // kludgy clamp
                            if (value > max) value = max;
                            if (value < min) value = min;
                        }
                        console.log(value);

                        path.setAttribute('stroke-dashoffset', length * (max - value));
                        // Send value to parent scope
                    }
                });
                $(window).bind('mouseup', function() {
                    scope.dragging = false;
                });
            }
        }
    });
