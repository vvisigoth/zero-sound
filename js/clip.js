function Clip(obj) {
    // Turns an object into a Clip

    var mtx = []

    for (var i = 0; i < obj.rhythm.length; i ++) {
        mtx.push(obj.rhythm[i].map(function(x) { 
            return { 'noteOn': x }
        })
        );
    }

    obj.rhythm = mtx;

    return obj

}
