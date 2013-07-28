function PianoRoll(id, clip) {
    this.id = id;

    this.width = $(id).width();
    this.height = $(id).height();
    this.cellWidth = this.width / clip.rhythm[0].length;
    this.cellHeight = this.height / clip.rhythm.length;
    this.clip = clip;
        
}

PianoRoll.prototype.init = function() {
    this.gridInit();
    this.cellInit();
}

PianoRoll.prototype.gridInit = function() {
    this.grid = d3.select(this.id)
        .append('svg')
        .attr('class', 'piano-roll');

}

PianoRoll.prototype.cellInit = function() {

    var that = this;

    var row = that.grid.selectAll('.row')
                .data(this.clip.rhythm)
                .enter().append('svg:g')
                .attr('class', 'row')
                .attr('transform', function(d, i) { return 'translate(0,' + (i * that.cellHeight) + ')'; })
                .each(row);

    function row(row) {
        var cell = d3.select(this).selectAll('.cell')
                .data(row)
                .enter().append('svg:rect')
                .attr('class', 'cell')
                .attr('x', function(d, i) { return that.cellWidth * i; })
                .attr('width', function(d) { return that.cellWidth; })
                .attr('height', function(d) { return that.cellHeight; })
                .on('click', function(d) {
                    if (d.noteOn) {
                        d.noteOn = 0;
                        that.refresh();
                    } else {
                        d.noteOn = 1;
                        that.refresh();
                    }
                })
                .style('fill', function(d) {
                    if (d.noteOn) {
                        return '#0F0';
                    } else {
                        return '#FFF';
                    }
                })
                .style('stroke', '#555');
    }
        for (var g = 0; g < this.width; g += (4 * this.cellWidth)) {
            this.grid.append('svg:line')
                .attr('x1', g)
                .attr('y1', 0)
                .attr('x2', g)
                .attr('y2', this.height)
                .attr('stroke-width', 3)
                .attr('stroke', '#000');
        }

        this.placePlayLine(0);

}

PianoRoll.prototype.refresh = function() {

    var that = this;

    var row = that.grid.selectAll('.row')
                .data(this.clip.rhythm)
                .each(rowRefresh);

    function rowRefresh(row) {
        var cell = d3.select(this).selectAll('.cell')
                .data(row)
                .style('fill', function(d) {
                    if (d.noteOn) {
                        return '#0F0';
                    } else {
                        return '#FFF';
                    }
                })
                .style('stroke', '#555');
    }

    this.placePlayLine(0);
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

