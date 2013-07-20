function PianoRoll(id, rows, cols) {
    this.id = id;

    this.width = $(id).width();
    this.height = $(id).height();
    this.initNoteData(this.width, this.height, rows, cols);
}

PianoRoll.prototype.gridInit = function() {
    this.grid = d3.select(this.id)
        .append('svg')
        .attr('class', 'piano-roll');

}

PianoRoll.prototype.cellInit = function() {

    var that = this;

    var row = this.grid.selectAll('.row')
                .data(this.noteData)
                .enter().append('svg:g')
                .attr('width', this.width)
                //.attr('height', this.height)
                .attr('class', 'row');

    console.log(row);

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

    this.placePlayLine(0);

}

PianoRoll.prototype.refresh = function() {
    var row = this.grid.selectAll('.row')
                .data(this.noteData);

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

    this.placePlayLine(0);
}

PianoRoll.prototype.init = function() {
    this.gridInit();
    console.log('grid initted');
    this.cellInit();
    console.log('cell initted');
}

PianoRoll.prototype.initNoteData = function (width, height, rows, cols) {
    var data = new Array();
    var gridItemWidth = width / cols;
    var gridItemHeight = (height - 10)/ rows;
    var startX = 0;
    var startY = 5;
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
                value: newValue,
                width: gridItemWidth,
                height: gridItemHeight,
                x: xpos,
                y: ypos,
            });

            xpos += stepX;
            count += 1;
        }
        xpos = startX;
        ypos += stepY;
    }
    this.noteData = data;
}
PianoRoll.prototype.placePlayLine = function(x) {

    this.grid.append('svg:line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', this.height)
        .attr('stroke-width', 3)
        .attr('stroke', 'rgb(255,0,0)');
}


PianoRoll.prototype.play = function() {

}

