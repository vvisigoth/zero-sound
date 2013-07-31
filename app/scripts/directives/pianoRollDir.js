
'use strict';

angular.module('zeroSoundApp')
    .directive('pianoRoll', function() {
        return {
            restrict: 'E',
            scope: {
                val: '='
            }, 
            link: function(scope, element, attrs) {
                var $tmp, offsetX, offsetY;
                var width = 900;
                var height = 400;
                var cellWidth = width / scope.val.rhythm[0].length;
                var cellHeight = height / scope.val.rhythm.length;

                var grid = d3.select(element[0])
                    .append('svg')
                    .attr('class', 'piano-roll');
                scope.init = function () {

                    var row = grid.selectAll('.row')
                        .data(scope.val.rhythm)
                        .enter().append('svg:g')
                        .attr('class', 'row')
                        .attr('transform', function(d, i) {
                            return 'translate(0,' + (i * cellHeight) 
                                + ')'; 
                        })
                        .each(row);

                    function row(row) {
                        var cell = d3.select(this)
                            .selectAll('.cell')
                            .data(row)
                            .enter().append('svg:rect')
                            .attr('class', 'cell')
                            .attr('x', function(d, i) {
                                return cellWidth * i; 
                            })
                            .attr('width', function(d) {
                                return cellWidth;
                            })
                            .attr('height', function(d) {
                                return cellHeight;
                            })
                            .on('click', function(d) {
                                if (d.noteOn < 3) {
                                    d.noteOn ++
                                    console.log(d.noteOn);
                                } else {
                                    d.noteOn = 0
                                }
                                scope.refresh();
                            })
                            .attr('class', function(d) {
                                return 'cell note-on-' + d.noteOn;
                            });

                    }
            },

            scope.refresh = function() { 
                var row = grid.selectAll('.row')
                    .data(scope.val.rhythm)
                    .each(rowRefresh);

                function rowRefresh(row) {
                    var cell = d3.select(this)
                        .selectAll('.cell')
                        .data(row)
                        .attr('class', function(d) {
                            console.log(d.noteOn);

                            return 'cell note-on-' + d.noteOn;
                        });
                }



            }

            scope.init();
            }
        }
    });
