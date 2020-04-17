// inlets and outlets
inlets = 4
outlets = 4
// global variables
var pitches = new Array;
var onset = new Array;
var duration = new Array;
var meter = [0, 2, 1, 3, 0.5, 1.50, 2.50, 3.50];
var strength_conv = [1, 0.5, 0.25, 0.25, 0.125, 0.125, 0.125, 0.125];
var strength_index = [0.0625, 0.125, 0.25, 0.5, 1];
// Array[0][i] is false, Array[1][i] is true, i=val from meter and strength arrays
var strength_data = [
[0.380989, 0.375555, 0.311561, 0.30774, 0.25152],
[0.619011,0.624445, 0.688439, 0.69226, 0.74848]
];
var duration_index = [0.125, 0.16, 0.25, 0.33, 0.375, 0.50, 0.66, 0.75, 1.0, 1.33, 1.50, 1.75, 2.0, 3.0, 3.5, 4.0, 6.0];
var duration_data = [
[0.666667, 0.833333, 0.383225, 0.361345, 0.000000, 0.360448, 0.457627, 0.304505, 0.292583, 0.000001, 0.228183,
0.142857, 0.115385, 0.023256, 0.142857, 0.054054, 0.058824],
[0.333333, 0.166667, 0.616775, 0.638655, 1.000000, 0.639552, 0.542373, 0.695495, 0.707417, 1.000000, 0.771817,
0.857143, 0.884615, 0.976744, 0.857143,0.945946, 0.941176]
];
var progression = new Array;

var qual_transition = [
[0.82091, 0.11640, 0.01050, 0.02372, 0.02846],
[0.51542, 0.34416, 0.01055, 0.07143, 0.05844],
[0.21591, 0.07386, 0.17045, 0.32955, 0.21023],
[0.28162, 0.05396, 0.04890, 0.58516, 0.03035],
[0.23253, 0.07205, 0.03603, 0.01747, 0.64192]
];

var root_transition = [
[0.23126, 0.00634, 0.18374, 0.00845, 0.01056, 0.14995, 0.00106, 0.25660, 0.00422, 0.08553, 0.03590, 0.02640],
[0.04948, 0.23711, 0.00619, 0.11753, 0.04330, 0.01237, 0.10928, 0.00412, 0.20000, 0.08041, 0.11753, 0.02268],
[0.11103, 0.00649, 0.31291, 0.00937, 0.08291, 0.00721, 0.00433, 0.22350, 0.00216, 0.19899, 0.00865, 0.03244],
[0.02027, 0.15991, 0.01802, 0.40766, 0.00001, 0.04505, 0.07432, 0.04730, 0.07883, 0.00225, 0.12613, 0.02027],
[0.01253, 0.03681, 0.06343, 0.00313, 0.39937, 0.00548, 0.08222, 0.04307, 0.00001, 0.20673, 0.00001, 0.14722],
[0.17863, 0.01069, 0.04885, 0.07176, 0.11756, 0.22290, 0.00763, 0.15420, 0.03511, 0.01221, 0.13893, 0.00153],
[0.00001, 0.09237, 0.09237, 0.03815, 0.14257, 0.10241, 0.25301, 0.02410, 0.11847, 0.04618, 0.00402, 0.08635],
[0.16211, 0.00001, 0.18490, 0.00977, 0.04297, 0.04492, 0.00651, 0.33203, 0.00521, 0.16406, 0.02018, 0.02734],
[0.00842, 0.22105, 0.00001, 0.06947, 0.00001, 0.06526, 0.09684, 0.01053, 0.43158, 0.04000, 0.05684, 0.00001],
[0.04855, 0.00631, 0.16456, 0.00315, 0.11655, 0.04477, 0.04540, 0.11980, 0.00063, 0.31841, 0.00757, 0.12421],
[0.13251, 0.12938, 0.03235, 0.15633, 0.00270, 0.25606, 0.02965, 0.04852, 0.02156, 0.00539, 0.12129, 0.02426],
[0.01816, 0.01923, 0.05556, 0.00107, 0.24252, 0.00321, 0.03205, 0.07585, 0.03312, 0.12393, 0.00321, 0.39209]
];

var chord_bank_edited = [
['C-major triad',0,4,7,'None','None','None', 0],
['C-minor triad',0,3,7,'None','None','None', 1],
['C-major seventh chord',0,4,7,11,'None','None', 2],
['C-minor seventh chord',0,3,7,10,'None','None', 3],
['C-dominant seventh chord',0,4,7,10,'None','None', 4],

['C#/Db-major triad',1,5,8,'None','None','None', 0],
['C#-minor triad',1,4,8,'None','None','None', 1],
['C#-minor seventh chord',1,4,8,11,'None','None', 3],
['C#/Db-dominant seventh chord',1,5,8,11,'None','None', 4],

['Db-major seventh chord',1,5,8,0,'None','None', 2],

['D-major triad',2,6,9,'None','None','None', 0],
['D-minor triad',2,5,9,'None','None','None', 1],
['D-major seventh chord',1,2,6,9,'None','None', 2],
['D-minor seventh chord',5,9,0,2,'None','None', 3],
['D-dominant seventh chord',2,6,9,0,'None','None', 4],

['Eb-major triad',3,7,10,'None','None','None', 0],
['Eb-minor triad',3,6,10,'None','None','None', 1],
['Eb-major seventh chord',3,2,7,10,'None','None', 2],
['Eb-minor seventh chord',3,6,10,1,'None','None', 3],
['Eb-dominant seventh chord',3,7,10,1,'None','None', 4],

['E-major triad',4,8,11,'None','None','None', 0],
['E-minor triad',4,7,11,'None','None','None', 1],
['E-major triad',4,8,11,3,'None','None', 2],
['E-minor seventh chord',4,7,11,2,'None','None', 3],
['E-dominant seventh chord',4,8,11,2,'None','None', 4],

['F-major triad',5,9,0,'None','None','None', 0],
['F-minor triad',5,8,0,'None','None','None', 1],
['F-major seventh chord',5,9,0,4,'None','None', 2],
['F-minor seventh chord',5,8,0,3,'None','None', 3],
['F-dominant seventh chord',5,9,0,3,'None','None', 4],

['F#/Gb-major triad',6,10,1,'None','None','None', 0],
['F#-minor triad',6,9,1,'None','None','None', 1],
['Gb-major seventh chord',6,10,1,5,'None','None', 2],
['F#-minor seventh chord',6,1,4,9,'None','None', 3],
['F#-dominant seventh chord',6,10,1,4,'None','None', 4],

['G-major triad',7,11,2,'None','None','None', 0],
['G-minor triad',7,10,2,'None','None','None', 1],
['G-major seventh chord',7,11,2,6,'None','None', 2],
['G-minor seventh chord',7,10,2,5,'None','None', 3],
['G-dominant seventh chord',7,11,2,5,'None','None', 4],

['G#Ab-major triad',8,0,3,'None','None','None', 0],
['G#/Ab-minor triad',8,11,3,'None','None','None', 1],
['Ab-major seventh chord',8,0,3,7,'None','None', 2],
['G#/Ab-minor seventh chord',8,11,3,6,'None','None', 3],
['G#/Ab-dominant seventh chord',8,0,3,6,'None','None', 4],

['A-major triad',9,1,4,'None','None','None', 0],
['A-minor triad',9,0,4,'None','None','None', 1],
['A-major triad',9,1,4, 8,'None','None', 2],
['A-minor seventh chord',9,0,4,7,'None','None', 3],
['A-dominant seventh chord',9,1,4,7,'None','None', 4],

['Bb-major triad',10,2,5,'None','None','None', 0],
['Bb-minor triad',10,1,5,'None','None','None', 1],
['Bb-major seventh chord',10,2,5,9,'None','None', 2],
['Bb-minor seventh chord',10,1,5,8,'None','None', 3],
['Bb-dominant seventh chord',10,2,5,8,'None','None', 4],

['B/Cb-major triad',11,3,6,'None','None','None', 0],
['B-minor triad',11,2,6,'None','None','None', 1],
['Cb-major seventh chord',11,3,6,10,'None','None', 2],
['B-minor seventh chord',11,2,6,9,'None','None', 3],
['B-dominant seventh chord',11,3,6,9,'None','None', 4]
];

var prev_chord = -1;
var maximumProbability = 100.0;

// functions
function maximumProb(maxprob){
	maximumProbability = maxprob;
}

function pitch(x){
	pitches.length = arguments.length;
	var list = new Array(arguments.length);

	for (i=0;i<arguments.length;i++){
		pitches[i] = arguments[i];
		}

	var numMeasures = 1;
	var pitchArray = ["pitches"];
	var onsetArray = ["onset"];
	var durationArray = ["duration"];
	var vals;

	//Get measures here
	if (Math.max.apply(Math, onset) >= 4) {
		if (Math.max.apply(Math, onset) % 4 === 0){
			numMeasures = Math.ceil(Math.max.apply(Math, onset)/4) + 1;
			}
		else{
			numMeasures = Math.ceil(Math.max.apply(Math, onset)/4);
			}
		pitchArray.length = numMeasures;
		var pitchObj = {};
		var onsetObj = {};
		var durationObj = {};
		var outputOnset = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

		for (m=0;m<numMeasures-1;m++){
			var firstIdx = onset.indexOf(closestValueHigher(onset, (m*4)));
			var secondIdx = onset.indexOf(closestValueHigher(onset, ((m+1)*4)));
			var currentPitchKey;
			var currentOnsetKey;
			var currentDurationKey;

			currentPitchKey = "pitch" + String(m);
			currentOnsetKey = "onset" + String(m);
			currentDurationKey = "duration" + String(m);

			pitchObj[currentPitchKey] = pitches.slice(firstIdx, secondIdx);
			onsetObj[currentOnsetKey] = onset.slice(firstIdx, secondIdx);
			durationObj[currentDurationKey] = duration.slice(firstIdx, secondIdx);
			}

		currentPitchKey = "pitch" + String((numMeasures-1));
		currentOnsetKey = "onset" + String((numMeasures-1));
		currentDurationKey = "duration" + String((numMeasures-1));
		pitchObj[currentPitchKey] = pitches.slice(onset.indexOf(4*(numMeasures-1)));
		onsetObj[currentOnsetKey] = onset.slice(onset.indexOf(4*(numMeasures-1)));
		durationObj[currentDurationKey] = duration.slice(onset.indexOf(4*(numMeasures-1)));

		var pitchKeys = Object.keys(pitchObj),
    	len = pitchKeys.length,
    	i = 0,
    	currMeasPitch;
		var onsetKeys = Object.keys(onsetObj),
    	len = onsetKeys.length,
    	i = 0,
    	currMeasOnset;
		var durationKeys = Object.keys(durationObj),
    	len = durationKeys.length,
    	i = 0,
    	currMeasDuration;
		outlet(0, (numMeasures * 4));
		var progression = new Array;
		progression.length = numMeasures;
		while (i < len) {
    		currMeasPitch = pitchObj[pitchKeys[i]];
			currMeasOnset = onsetObj[onsetKeys[i]];
			for (s=0;s<currMeasOnset.length;s++){
				currMeasOnset[s] = currMeasOnset[s] % 4;
				}
			currMeasDuration = durationObj[durationKeys[i]];

			var currentChord = new Array;
			currentChord.length = 1;

			possibleChords = getPossibleChords(currMeasPitch);
			post(currMeasOnset);
			post();
			post(prev_chord);
			post();
			vals = getChordPredictions(possibleChords, currMeasPitch, currMeasOnset, currMeasDuration, strength_data, prev_chord);
			indexVal = vals[0];
			prev_chord = vals[1];
			for (x=0;x<6;x++)
			{
				if (chord_bank_edited[indexVal][x + 1] != 'None'){
					currentChord.length ++;
					currentChord[x] = chord_bank_edited[indexVal][x + 1];
				}
			}
			post("Current chord: ");
			post(chord_bank_edited[indexVal][0]);
			post();
			var filtered = currentChord.filter(function (el) {
  				return el != null;
				});

			post(filtered);
			post();
			outlet(1, outputOnset[i]);
			outlet(2, filtered);
			i += 1;
			}


		}

	else{
		outlet(0, (numMeasures * 4));
		var outputOnset = [0, 4, 8];
		var progression = new Array;
		progression.length = numMeasures;
		for (b=0;b<numMeasures;b++){
			var currentChord = new Array;
			currentChord.length = 1;
			possibleChords = getPossibleChords(eval(pitchArray[b]));
			vals = getChordPredictions(possibleChords, pitches, onset, duration, strength_data, prev_chord);
			indexVal = vals[0];
			prev_chord = vals[1];
			for (x=0;x<6;x++)
			{
				if (chord_bank_edited[indexVal][x + 1] != 'None'){
					currentChord.length ++;
					currentChord[x] = chord_bank_edited[indexVal][x + 1];
				}
			}
			post("Current chord: ");
			post(chord_bank_edited[indexVal][0]);
			post();
			var filtered = currentChord.filter(function (el) {
  			return el != null;
				});

			post(filtered);
			post();
			outlet(1, outputOnset[b]);
			outlet(2, filtered);
		}
		}

	}

function on(x){
	onset.length = arguments.length;
	for (i=0;i<arguments.length;i++)
	{
		onset[i] = arguments[i];
	}
}

function dur(x){
	duration.length = arguments.length;
	for (i=0;i<arguments.length;i++)
	{
		duration[i] = arguments[i];
	}
}

function getPossibleChords(getPitches){
	possibleChords = new Array;
	uniquePitches = new Array;
	for (c=0;c<getPitches.length;c++)
	{
		getPitches[c] = (getPitches[c]%12);
	}
	uniquePitches = getPitches.filter(onlyUnique);
	for (i=0;i<uniquePitches.length;i++)
	{
		for (x=0;x<chord_bank_edited.length;x++)
		{
			for (y=1;y<7;y++)
				if (chord_bank_edited[x][y] != 'None')
				{
					if (uniquePitches[i] === chord_bank_edited[x][y])
					{
						possibleChords.push(x);
					}
				}
		}
	}
	possibleChords = possibleChords.filter(onlyUnique);
	return possibleChords;
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//function getStrengthFromOnset


function getChordPredictions(possibleChords, pitchvar, onsetvar, duration, strength_data, pre_chord) {
	post('----------------------------');
	post();
	var boolArray = new Array(possibleChords.length);
	var chordProbabilities = new Array(possibleChords.length);
	var p_chord = pre_chord;
	// For each possible chord, check if at least one note in the chord matches the current pitch
	for (i=0;i<possibleChords.length;i++)
	{
		var currChordProb = 10000000;
		for (j=0;j<pitchvar.length;j++)
		{
			// if the melody note matches one of the chord tones, return a 1, otherwise, return 0
			var bool = 0;

			for (x=0;x<7;x++)
			{
				if (chord_bank_edited[possibleChords[i]][x + 1] != 'None'){
					if (chord_bank_edited[possibleChords[i]][x + 1] == (pitchvar[j] % 12)){
						bool = 1;
					}
				}
			}

			if (meter.indexOf(onsetvar[j]) != -1) {
				currChordProb *= strength_data[bool][strength_index.indexOf(strength_conv[meter.indexOf(onsetvar[j])])];
			}
      
			if (duration_index.indexOf(duration[j]) != -1) {
				currChordProb *= duration_data[bool][duration_index.indexOf(duration[j])];
			}

		}
		if (p_chord != -1) {
				ante_root = chord_bank_edited[p_chord][1];
				cons_root = chord_bank_edited[possibleChords[i]][1];
				raw = ante_root-cons_root;
				if (raw < 0) {
					motion = 12 + raw;
					}
				else{
					motion = raw;
					}

				currChordProb *= root_transition[chord_bank_edited[p_chord][1]][chord_bank_edited[possibleChords[i]][1]];
				post(chord_bank_edited[p_chord][0]);
				post(chord_bank_edited[p_chord][1]);
				post();
				post(chord_bank_edited[possibleChords[i]][0]);
				post(chord_bank_edited[possibleChords[i]][1]);
				post();
				post(root_transition[chord_bank_edited[p_chord][1]][chord_bank_edited[possibleChords[i]][1]]);
				post();

				currChordProb *= qual_transition[chord_bank_edited[p_chord][7]][chord_bank_edited[possibleChords[i]][7]];
			}

			post('currChordProb, duration: ');
			post(currChordProb);
			post();
		chordProbabilities[i] = currChordProb;
	}
	post(chordProbabilities);
	post();
	var chordProbCopy = chordProbabilities.slice();
	if (maximumProbability == 100) {
		var topValues = chordProbCopy.sort(function(a, b){return a-b}).slice(-5).filter(onlyUnique);
		topValues = topValues.sort(function(a, b){return a-b});
	}
	else {
		chordProbCopy = chordProbCopy.sort(function(a, b){return a-b}).filter(onlyUnique);
		var sliceInd = chordProbCopy.indexOf(closestValue(chordProbCopy, (Math.max.apply(Math, chordProbCopy) * (maximumProbability / 100.0))));
		var topValues = chordProbCopy.slice(0, sliceInd).sort(function(a, b){return a-b}).filter(onlyUnique);
		var topValues = topValues.slice(-5);
	}
	var indices = new Array;

	for (f=0; f<5; f++){
		var idx = chordProbabilities.indexOf(topValues[f]);
		while (idx != -1) {
  			indices.push(idx);
  			idx = chordProbabilities.indexOf(topValues[f], idx + 1);
		}
	}
	post(indices);
	post();
	for (g=0;g<indices.length;g++){
		post(chord_bank_edited[possibleChords[indices[g]]][0]);
		post();
		post(chordProbabilities[indices[g]]);
		post();
		if (g === indices.length - 1) {
			progressionIdx = possibleChords[indices[g]];
			p_chord = possibleChords[indices[g]];
		}
	}
	return [progressionIdx, p_chord];
}

// https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
function closestValue(array, value) {
    var result,
        lastDelta;

    array.some(function (item) {
        var delta = Math.abs(value - item);
        if (delta >= lastDelta) {
            return true;
        }
        result = item;
        lastDelta = delta;
    });
    return result;
}

function closestValueHigher(array, value) {
    var result,
        lastDelta;

    array.some(function (item) {
        var delta = Math.abs(value - item);
        if (delta > lastDelta) {
            return true;
        }
        result = item;
        lastDelta = delta;
    });
    return result;
}
