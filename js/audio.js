var context, epicBuffer;
window.addEventListener('load', init, false);

var BUFFERS = {};
var BUFFERS_TO_LOAD = {
    'drum1': 'sound/CL516TAPE1/T09BD17IPS.wav'
};

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API not supported');
    }

    loadBuffers();

}

function loadBuffers() {
    var names = [];
    var paths = [];
    for (var name in BUFFERS_TO_LOAD) {
        var path = BUFFERS_TO_LOAD[name];
        names.push(name);
        paths.push(path);
    }
    bufferLoader = new BufferLoader(context, paths, function(bufferList) {
        for (var i = 0; i < bufferList.length; i ++) {
            var buffer = bufferList[i];
            var name = names[i];
            BUFFERS[name] = buffer;
        }
    });
    bufferLoader.load();
};

var RhythmSample = {};

RhythmSample.play = function() {
    function playSound(buffer, time) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        if (!source.start) 
            source.start = source.noteOn;
        source.start(time);
        //TODO playsound should have optional "stop" parameter
        source.stop(time + 0.5);

    }
        var kick = BUFFERS.drum1;

        var startTime = context.currentTime + 0.100;
        var tempo = 80;
        var eighthNoteTime = (60 / tempo) / 2;

    for (var bar = 0; bar < 2; bar ++) {
        var time = startTime + bar * 8 * eighthNoteTime;
        console.log('playing');
        playSound(kick, time);
        playSound(kick, time + 4 * eighthNoteTime);
    }

};






