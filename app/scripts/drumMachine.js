
var BUFFERS_TO_LOAD = {
    'kick': '../sound/BD1.wav',
    'hh1': '../sound/HH1.wav',
    'hh2': '../sound/HH2.wav',
    'clap': '../sound/CLAP1.wav',
    'kick2': '../sound/BD1.wav',
    'hh12': '../sound/HH1.wav',
    'hh22': '../sound/HH2.wav',
    'clap2': '../sound/CLAP1.wav'
    //'tom2': '../sound/TOM1.wav',
    //'tom1': '../sound/TOM2.wav',
    //'crash': '../sound/CRASH1.wav',
    //'snare': '../sound/snare.mp3',
};
var BUFFERS = [];
var rhythmIndex = 0;
var loopLength = 16;
var effectDryMix = 1;
var kMaxSwing = .08;

var volumes = [0, 0.3, 0.5, 1];

var theBeat, timeoutId;

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API not supported');
    }
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
            BUFFERS.push(buffer);
        }
    });
    bufferLoader.load();
};

function DrumMachine() {};

DrumMachine.prototype.loadBeat = function(beat) {
    theBeat = beat;

    loadBuffers();

};

DrumMachine.prototype.play = function() {

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


    var startTime = context.currentTime + 0.100;
    var tempo = 80;
    var eighthNoteTime = (60 / tempo) / 2;
    var sixteenthNoteTime = (60 / tempo) / 4;


    noteTime = 0.0;
    starttime = context.currentTime + 0.005;

    schedule();

};

DrumMachine.prototype.stop = function() {
    clearInterval(timeoutId); 
}

var advanceNote = function() {
    // Advance time by a 16th note...
    var secondsPerBeat = 60.0 / theBeat.tempo;

    rhythmIndex++;
    if (rhythmIndex == loopLength) {
        rhythmIndex = 0;
    }

        // apply swing    
    if (rhythmIndex % 2) {
        noteTime += (0.25 + kMaxSwing * theBeat.swingFactor) * secondsPerBeat;
    } else {
        noteTime += (0.25 - kMaxSwing * theBeat.swingFactor) * secondsPerBeat;
    }
}


var schedule = function() {
        var currentTime = context.currentTime;

        // the sequence starts at starttime, so normalize currentTime so DrumMachine it's 0 at the start of the sequence.
        currentTime -= starttime;

        while (noteTime < currentTime + 0.200) {
            console.log('playing loop');
            
            // convert noteTime to context time.
            var contextplaytime = noteTime + starttime;


            //TODO you know there's a way to do this with a for loop
            
            // kick
            for (var n = 0; n < theBeat.rhythm.length; n ++) {
                if (theBeat.rhythm[n][rhythmIndex].noteOn) {
                    playNote(
                        BUFFERS[n], // buffer
                        false, // pan?
                        0,// pan x
                        0,// pan y
                        -2, // pan z
                        0.5,  // send gain
                        volumes[theBeat.rhythm[n][rhythmIndex].noteOn] * 1.0, //mainGain
                        0, //playback rate
                        contextplaytime, //note TIme
                        0.5); //lenght
                    
                }
            }
            advanceNote();
        }

        timeoutId = setTimeout("schedule()", 0);
    }

var playNote = function(buffer, pan, x, y, z, sendGain, mainGain, playbackRate, noteTime, length) {
        // Create the note
        var voice = context.createBufferSource();
        voice.buffer = buffer;
        voice.playbackRate.value = playbackRate;

        // Optionally, connect to a panner
        var finalNode;
        if (pan) {
            var panner = context.createPanner();
            panner.setPosition(x, y, z);
            voice.connect(panner);
            finalNode = panner;
        } else {
            finalNode = voice;
        }

        // Connect to dry mix
        var dryGainNode = context.createGain();
        dryGainNode.gain.value = mainGain * effectDryMix;
        finalNode.connect(dryGainNode);
        //dryGainNode.connect(masterGainNode);
        dryGainNode.connect(context.destination);

        // Connect to wet mix
        //var wetGainNode = context.createGain();
        //wetGainNode.gain.value = sendGain;
        //finalNode.connect(wetGainNode);
        //wetGainNode.connect(convolver);

        voice.start(noteTime);
        if (length) voice.stop(noteTime + length);
    }


