function Clip(matrix) {

    var mtx = []

    for (var i = 0; i < matrix.length; i ++) {
        mtx.push(matrix[i].map(function(x) { 
            return { 'noteOn': x }
        })
        );
    }

    return mtx;

}
