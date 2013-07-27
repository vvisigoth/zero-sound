var context, epicBuffer;
window.addEventListener('load', init, false);

var BUFFERS = {};
var BUFFERS_TO_LOAD = {
    'kick': 'sound/CL516TAPE1/T09BD17IPS.wav',
    'chh': 'sound/CL516TAPE1/T09CHATD0.wav',
    'snare': 'sound/snare.mp3'
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

    if (!context.createGain) 
        context.createGain = context.createGainNode;
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 0.4;
    //var source = context.createBufferSource();
    //
    //
    var filter = context.createBiquadFilter();
    filter.type = 0;
    filter.frequency.value = 440;

    function playSound(buffer, timeOn, length) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        console.debug(source);
        //source.connect(context.destination);
        //console.debug(RhythmSample.gainNode);
        source.connect(context.destination);
        //RhythmSample.gainNode.connect(context.destination);
        //console.debug(RhythmSample.gainNode);
        if (!source.start) 
            source.start = source.noteOn;
        source.start(timeOn);
        if (length) source.stop(timeOn + length);

    }
        var kick = BUFFERS.kick;
        var kickLength = 0.5;
        var hihat  = BUFFERS.chh;
        var hihatLength = 0.5;
        var snare = BUFFERS.snare;
        var snareLength = 1;

        var startTime = context.currentTime + 0.100;
        var tempo = 80;
        var eighthNoteTime = (60 / tempo) / 2;
        var sixteenthNoteTime = (60 / tempo) / 4;

    for (var bar = 0; bar < 2; bar ++) {
        var time = startTime + bar * 8 * eighthNoteTime;
        console.log('playing');

        playSound(kick, time, kickLength);
        playSound(kick, time + 4 * eighthNoteTime, kickLength);

        playSound(snare, time + 2 * eighthNoteTime, snareLength);
        playSound(snare, time + 6 * eighthNoteTime, snareLength);


        for (var i = 0; i < 16; ++i) {
            playSound(hihat, time + i * sixteenthNoteTime, hihatLength);
        }
    }

};
