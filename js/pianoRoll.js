function PianoRoll(id, square) {

    this.id = id;

    this.width = $(id).width();
    this.height = $(id).height();
    this.calData = noteData(this.width, this.height, square);

}

PianoRoll.prototype.gridInit = function() {
    this.grid = d3.select(this.id)
        .append('svg')
        .attr('class', 'piano-roll');
}

PianoRoll.prototype.cellInit = function() {

    var that = this;

    console.log(this.width, this.height);

    var row = this.grid.selectAll('.row')
                .data(this.calData)
                .enter().append('svg:g')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'row');

    var col = row.selectAll('.cell')
            .data(function(d) { return d;})
            .enter().append('svg:rect')
            .attr('class', 'cell')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .on('click', function(e) {
                if (e.value) {
                    e.value = 0;
                    that.refresh();
                } else {
                    e.value = 1;
                    that.refresh();
                }
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

PianoRoll.prototype.refresh = function() {
    var row = this.grid.selectAll('.row')
                .data(this.calData)

    var col = row.selectAll('.cell')
            .data(function(d) { return d;})
            .style('fill', function(d) {
                if (d.value) {
                    console.log('color dat');
                    return '#0F0';
                } else {
                    return '#FFF';
                }
            })
            .style('stroke', '#555');
}

PianoRoll.prototype.init = function() {
    this.gridInit();
    this.cellInit();
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
            newValue = 0;
            data[index_a].push({
                time: index_b,
                value: newValue,
                width: gridItemWidth,
                height: gridItemHeight,
                x: xpos,
                y: ypos,
                gridX: index_b,
                gridY: index_a,
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



