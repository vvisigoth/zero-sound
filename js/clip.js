function noteData(gridWidth, gridHeight, square) {
    var data = new Array();
    var gridItemWidth = gridWidth / 32;
    var gridItemHeight = (square) ? gridItemWidth : gridHeight / 8;
    var startX = 0;
    var startY = 0;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;

    for (var index_a = 0; index_a < 8; index_a++) {
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
