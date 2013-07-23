var BUFFERS = {};
var BUFFERS_TO_LOAD = {
    'kick': 'sound/CL516TAPE1/T09BD17IPS.wav',
    'chh': 'sound/CL516TAPE1/T09CHATD0.wav',
    'snare': 'sound/snare.mp3'
};

var rhythmIndex = 0;
var loopLength = 16;

var volumes = [0, 0.3, 1];

var theBeat = {
    "kitIndex":13,
    "effectIndex":18,
    "tempo":120,
    "swingFactor":0,
    "effectMix":0.19718309859154926,
    "kickPitchVal":0.5,
    "snarePitchVal":0.5,
    "hihatPitchVal":0.5,
    "tom1PitchVal":0.5,
    "tom2PitchVal":0.5,
    "tom3PitchVal":0.5,
    "rhythm1":[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "rhythm2":[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],
    "rhythm3":[0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],
    "rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
    "rhythm5":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "rhythm6":[0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,0]
};

var kick = BUFFERS.kick;
var kickLength = 0.5;
var hihat  = BUFFERS.chh;
var hihatLength = 0.5;
var snare = BUFFERS.snare;
var snareLength = 1;

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

var effectDryMix = 1;

var timeoutId;

var kMaxSwing = .08;

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

function RhythmSample() {};

RhythmSample.prototype.play = function() {

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
//RhythmSample.prototype.advanceNote = function() {
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

            // the sequence starts at starttime, so normalize currentTime so RhythmSample it's 0 at the start of the sequence.
            currentTime -= starttime;

            while (noteTime < currentTime + 0.200) {
                console.log('playing loop');
                
                // convert noteTime to context time.
                var contextplaytime = noteTime + starttime;

                
                // kick
                if (theBeat.rhythm1[rhythmIndex]) {
                    //playNote(currentkit.kickbuffer, false, 0,0,-2, 0.5, volumes[theBeat.rhythm1[RhythmSample.rhythmIndex]] * 1.0, kickpitch, contextplaytime);
                    console.log('kick')
                    playNote(BUFFERS.kick, false, 0,0,-2, 0.5, volumes[theBeat.rhythm1[RhythmSample.rhythmIndex]] * 1.0, 0, contextplaytime);
                    
                }

                // snare
                if (theBeat.rhythm2[rhythmIndex]) {
                    //playNote(currentkit.snarebuffer, false, 0,0,-2, 1, volumes[theBeat.rhythm2[RhythmSample.rhythmIndex]] * 0.6, snarepitch, contextplaytime);
                    console.log('snare')
                    playNote(BUFFERS.snare, false, 0,0,-2, 1, volumes[theBeat.rhythm2[RhythmSample.rhythmIndex]] * 0.6, 0, contextplaytime);
                }

                // hihat
                //if (theBeat.rhythm3[RhythmSample.rhythmIndex]) {
                //    // pan the hihat according to sequence position.
                //    playNote(currentKit.hihatBuffer, true, 0.5*RhythmSample.rhythmIndex - 4, 0, -1.0, 1, volumes[theBeat.rhythm3[RhythmSample.rhythmIndex]] * 0.7, hihatPitch, contextPlayTime);
                //}

                //// Toms    
                //if (theBeat.rhythm4[RhythmSample.rhythmIndex]) {
                //    playNote(currentKit.tom1, false, 0,0,-2, 1, volumes[theBeat.rhythm4[RhythmSample.rhythmIndex]] * 0.6, tom1Pitch, contextPlayTime);
                //}

                //if (theBeat.rhythm5[RhythmSample.rhythmIndex]) {
                //    playNote(currentKit.tom2, false, 0,0,-2, 1, volumes[theBeat.rhythm5[RhythmSample.rhythmIndex]] * 0.6, tom2Pitch, contextPlayTime);
                //}

                //if (theBeat.rhythm6[RhythmSample.rhythmIndex]) {
                //    playNote(currentKit.tom3, false, 0,0,-2, 1, volumes[theBeat.rhythm6[RhythmSample.rhythmIndex]] * 0.6, tom3Pitch, contextPlayTime);
                //}

                //
                //// Attempt to synchronize drawing time with sound
                //if (noteTime != lastDrawTime) {
                //    lastDrawTime = noteTime;
                //    drawPlayhead((RhythmSample.rhythmIndex + 15) % 16);
                //}

                advanceNote();
            }

            timeoutId = setTimeout("schedule()", 0);
        }

var playNote = function(buffer, pan, x, y, z, sendGain, mainGain, playbackRate, noteTime) {
        // Create the note
        console.log('playing note');
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
    }


