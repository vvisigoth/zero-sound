function pianoRoll(id, square) {

    var width = $(id).width();
    var height = $(id).height();

    var calData = noteData(width, height, square);

    function gridInit() {
        var grid = d3.select(id)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'piano-roll');
        return grid
    }

    grid = gridInit();

    function cellInit() {

        var row = grid.selectAll('.row')
                    .data(calData)
                    .enter().append('svg:g')
                    .attr('class', 'row');

        var col = row.selectAll('.cell')
                .data(function(d) { return d;})
                .enter().append('svg:rect')
                .attr('class', 'cell')
                .attr('x', function(d) { return d.x; })
                .attr('y', function(d) { return d.y; })
                .attr('width', function(d) { return d.width; })
                .attr('height', function(d) { return d.height; })
                .on('click', function() {
                    console.log(d3.select(this));
                })
                .style('fill', function(d) {
                    if (d.value) {
                        return '#0F0';
                    } else {
                        return '#FFF';
                    }
                })
                .style('stroke', '#555');
    }


}

function noteData(gridWidth, gridHeight, square) {
    var data = new Array();
    var gridItemWidth = gridWidth / 32;
    var gridItemHeight = (square) ? gridItemWidth : gridHeight / 8;
    var startX = gridItemWidth / 2;
    var startY = gridItemHeight / 2;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;

    for (var index_a = 0;
            index_a < 8; index_a++) {
        data.push(new Array());
        for (var index_b = 0; index_b < 32; index_b++) {
            //newValue = Math.round(Math.random());
            newValue = 0;
            data[index_a].push({
                time: index_b,
                value: newValue,
                width: gridItemWidth,
                height: gridItemHeight,
                x: xpos,
                y: ypos,
                count: count
            });

            xpos += stepX;
            count += 1;
        }
        xpos = startX;
        ypos += stepY;
    }
    return data
}



