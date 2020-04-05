// inlets and outlets
inlets = 3
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
 
         
var chord_bank_original = [
['C-major triad',0,4,7,'None','None','None'],
['C-minor triad',0,3,7,'None','None','None'],
['C-dominant seventh chord',0,4,7,10,'None','None'],
['C-Perfect Twelfth',0,7,'None','None','None','None'],
['C-quartal trichord',0,2,7,'None','None','None'],
['C-quartal tetramirror',0,3,10,5,'None','None'],
['C-unison',0,'None','None','None','None','None'],
['C-major-second major tetrachord',0,4,7,2,'None','None'],
['C-minor seventh chord',0,3,7,10,'None','None'],
['C-major seventh chord',0,4,7,11,'None','None'],

['C#-minor triad',1,4,8,'None','None','None'],
['C#-major-second minor tetrachord',1,4,8,3,'None','None'],
['C#-major-minor tetramirror',5,1,4,8,'None','None'],
['C#-minor seventh chord',1,4,8,11,'None','None'],
['C#-dominant seventh chord',1,5,8,11,'None','None'],
['C#-major triad',1,5,8,'None','None','None'],

['Db-major triad',1,5,8,'None','None','None'],
['Db-dominant seventh chord',1,5,8,11,'None','None'],
['Db-major-second major tetrachord',3,1,5,8,'None','None'],
['Db-major seventh chord',1,5,8,0,'None','None'],
['Db-Perfect Twelfth',1,8,'None','None','None','None'],
['Db-unison',1,'None','None','None','None','None'],

['D-major triad',2,6,9,'None','None','None'],
['D-minor triad',2,5,9,'None','None','None'],
['D-unison',2,'None','None','None','None','None'],
['D-Perfect Twelfth',2,9,'None','None','None','None'],
['D-phrygian tetrachord',2,6,1,4,'None','None'],
['D-whole-tone tetramirror',2,6,0,4,'None','None'],
['D-dominant seventh chord',2,6,9,0,'None','None'],
['D-major-diminished tetrachord',2,6,9,3,'None','None'],
['D-minor seventh chord',5,9,0,2,'None','None'],
['D-quartal tetramirror',2,5,0,7,'None','None'],
['D-diminished triad',2,5,8,'None','None','None'],
['D-perfect-fourth major tetrachord',7,2,6,9,'None','None'],
['D-quartal trichord',9,2,4,'None','None','None'],
['D-major-second major tetrachord',4,2,6,9,'None','None'],
['D-major seventh chord',1,2,6,9,'None','None'],

['D#-half-diminished seventh chord',6,9,1,3,'None','None'],

['Eb-major triad',3,7,10,'None','None','None'],
['Eb-minor triad',3,6,10,'None','None','None'],
['Eb-minor seventh chord',3,6,10,1,'None','None'],
['Eb-dominant seventh chord',3,7,10,1,'None','None'],
['Eb-major seventh chord',2,3,7,10,'None','None'],
['Eb-Perfect Twelfth',3,10,'None','None','None','None'],
['Eb-lydian tetrachord',3,6,1,5,'None','None'],

['E-minor triad',4,7,11,'None','None','None'],
['E-major triad',4,8,11,'None','None','None'],
['E-dominant seventh chord',4,8,11,2,'None','None'],
['E-Perfect Twelfth',4,11,'None','None','None','None'],
['E-minor seventh chord',4,7,11,2,'None','None'],
['E-unison',4,'None','None','None','None','None'],
['E-Neapolitan pentachord',4,8,11,2,7,'None'],
['E-quartal tetramirror',9,2,4,7,'None','None'],
['E-major-second minor tetrachord',4,7,11,6,'None','None'],
['E-quartal trichord',11,4,6,'None','None','None'],

['F-major triad',5,9,0,'None','None','None'],
['F-minor triad',5,8,0,'None','None','None'],
['F-Perfect Eleventh',0,5,'None','None','None','None'],
['F-dominant-ninth',0,5,9,3,7,'None'],
['F-dominant seventh chord',5,9,0,3,'None','None'],
['F-quartal tetramirror',10,3,5,8,'None','None'],
['F-major seventh chord',5,9,0,4,'None','None'],
['F-minor seventh chord',8,5,0,3,'None','None'],
['F-minor-ninth chord',7,5,8,0,3,'None'],
['F-major pentatonic',10,5,8,0,3,'None'],
['F-minor-augmented tetrachord',5,8,0,4,'None','None'],
['F-Perfect Fifth',5,0,'None','None','None','None'],
['F-unison',5,'None','None','None','None','None'],
['F-tritone quartal tetrachord',5,9,3,10,'None','None'],

['F#-minor triad',6,9,1,'None','None','None'],
['F#-major triad',6,10,1,'None','None','None'],
['F#-dominant seventh chord',6,10,1,4,'None','None'],
['F#-major-second major tetrachord',8,6,10,1,'None','None'],
['F#-quartal tetramirror',6,4,9,11,'None','None'],
['F#-minor seventh chord',9,1,4,6,'None','None'],
['F#-Perfect Fifth',6,1,'None','None','None','None'],
['F#-half-diminished seventh chord',6,9,0,4,'None','None'],

['Gb-major triad',10,1,6,'None','None','None'],
['Gb-major-second major tetrachord',8,6,10,1,'None','None'],
['Gb-quartal trichord',6,8,1,'None','None','None'],
['Gb-major seventh chord',6,10,1,5,'None','None'],

['G-minor triad',7,10,2,'None','None','None'],
['G-minor seventh chord',7,10,2,5,'None','None'],
['G-unison',7,'None','None','None','None','None'],
['G-major triad',7,11,2,'None','None','None'],
['G-Perfect Fifth',7,2,'None','None','None','None'],
['G-Perfect Eleventh',2,7,'None','None','None','None'],
['G-major-second major tetrachord',7,11,2,9,'None','None'],
['G-perfect-fourth major tetrachord',0,7,11,2,'None','None'],
['G-quartal tetramirror',0,5,7,10,'None','None'],
['G-dominant seventh chord',7,11,2,5,'None','None'],
['G-major seventh chord',7,11,2,6,'None','None'],
['G-lydian tetrachord',7,10,5,9,'None','None'],
['G-phrygian tetrachord',7,11,6,9,'None','None'],

['G#-major triad',8,0,3,'None','None','None'],
['G#-minor seventh chord',8,11,3,6,'None','None'],
['G#-dominant seventh chord',8,0,3,6,'None','None'],
['G#-minor triad',8,11,3,'None','None','None'],

['Ab-major triad',8,0,3,'None','None','None'],
['Ab-minor seventh chord',8,11,3,6,'None','None'],
['Ab-minor triad',8,11,3,'None','None','None'],
['Ab-dominant seventh chord',8,0,3,6,'None','None'],
['Ab-quartal trichord',3,8,10,'None','None','None'],
['Ab-major seventh chord',8,0,3,7,'None','None'],
['Ab-major-second major tetrachord',8,0,3,10,'None','None'],
['Ab-whole-tone tetramirror',8,0,6,10,'None','None'],
['Ab-unison',8,'None','None','None','None','None'],
['Ab-tritone quartal tetrachord',8,0,6,1,'None','None'],

['A-minor triad',9,0,4,'None','None','None'],
['A-Perfect Fifth',9,4,'None','None','None', 'None'],
['A-unison',9,'None','None','None','None','None'],
['A-major triad',9,1,4,'None','None','None'],
['A-quartal tetramirror',2,7,9,0,'None','None'],
['A-dominant seventh chord',9,1,4,7,'None','None'],
['A-perfect-fourth minor tetrachord',2,4,9,0,'None','None'],
['A-minor seventh chord',9,0,4,7,'None','None'],
['A-quartal trichord',4,9,11,'None','None','None'],

['Bb-major triad',10,2,5,'None','None','None'],
['Bb-Perfect Fifth',10,5,'None','None','None','None'],
['Bb-quartal trichord',0,10,5,'None','None','None'],
['Bb-major-second major tetrachord',0,10,2,5,'None','None'],
['Bb-dominant seventh chord',10,2,5,8,'None','None'],
['Bb-minor seventh chord',10,1,5,8,'None','None'],
['Bb-Scriabins Mystic-chord',0,4,10,2,9,6],
['Bb-whole-tone tetramirror',10,2,8,0,'None','None'],
['Bb-minor triad',10,1,5,'None','None','None'],
['Bb-unison',10,'None','None','None','None','None'],
['Bb-major seventh chord',10,2,5,9,'None','None'],

['B-major triad',11,3,6,'None','None','None'],
['B-minor triad',11,2,6,'None','None','None'],
['B-dominant seventh chord',11,3,6,9,'None','None'],
['B-minor seventh chord',11,2,6,9,'None','None'],
['B-unison',11,'None','None','None','None','None'],
['B-major pentatonic',4,9,11,2,6,'None'],
['B-Perfect Fifth',11,6,'None','None','None','None'],
['B-lydian tetrachord',11,2,9,1,'None','None'],
['B-whole-tone tetramirror',11,3,9,1,'None','None'],
['B-major-second major tetrachord',1,11,3,6,'None','None'],
['B-flat-ninth pentachord',11,3,6,9,0,'None'],
['B-perfect-fourth minor tetrachord',4,6,11,2,'None','None'],
['B-enigmatic pentachord',10,11,2,6,4,'None'],
['B-quartal trichord',6,11,1,'None','None','None'],

['Cb-major-ninth chord',3,6,10,1,11,'None'],
['Cb-major seventh chord',11,3,6,10,'None','None'],
['Cb-major triad',11,3,6,'None','None','None']
];

// Rows are: M, m, M7, m7, 7, columns are root motion in semitones, data is: Given a quality for the antecedent chord, the probablity 
// that the consequent chord moves by that distance in semitones.
var transition_data = [
[0.17984, 0.00498, 0.15133, 0.01799, 0.01526, 0.17992, 0.00112, 0.19695, 0.00353, 0.05896, 0.07261, 0.01751],
[0.20687, 0.02276, 0.03187, 0.10091, 0.00152, 0.13581, 0.00001, 0.05842, 0.14643, 0.00001, 0.16313, 0.00228],
[0.14516, 0.00403, 0.09677, 0.04839, 0.02419, 0.16935, 0.00001, 0.04032, 0.00806, 0.22984, 0.00001, 0.23387],
[0.10691, 0.02599, 0.03187, 0.10091, 0.00152, 0.13581, 0.00001, 0.05842, 0.14643, 0.00001, 0.16313, 0.00228],
[0.15929, 0.01983, 0.02296, 0.00731, 0.00001, 0.32046, 0.00626, 0.09603, 0.00313, 0.00522, 0.04697, 0.01253]
];

var qual_transition = [
[0.82091, 0.11640, 0.01050, 0.02372, 0.02846],
[0.51542, 0.34416, 0.01055, 0.07143, 0.05844],
[0.21591, 0.07386, 0.17045, 0.32955, 0.21023],
[0.18162, 0.05396, 0.04890, 0.28516, 0.03035],
[0.23253, 0.07205, 0.03603, 0.01747, 0.64192]
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

// functions
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
	
	post(pitches);
	post();

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
			var firstIdx = onset.indexOf(4*m);
			var secondIdx = onset.indexOf(4* (m+1));
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
	//else if (Math.max.apply(Math, onset) >= 4){
	//	var splitIdx = onset.indexOf(4);
	//	var pitch1 = pitches.slice(0, splitIdx);
	//	var pitch2 = pitches.slice(splitIdx);
	//	var onset1 = onset.slice(0, splitIdx);
	//	var onset2 = onset.slice(splitIdx);
	//	var duration1 = duration.slice(0, splitIdx);
	//	var duration2 = duration.slice(splitIdx);
	//	for (val=0;val<onset2.length;val++){
	//		onset2[val] = onset2[val] % 4;
	//		}
	//	numMeasures = 2;
	//	pitchArray = ["pitch1", "pitch2"];
	//	onsetArray = ["onset1", "onset2"];
	//	durationArray = ["duration1", "duration2"];
	//	}
	else{
		outlet(0, (numMeasures * 4));
		var outputOnset = [0, 4, 8];
		var progression = new Array;
		progression.length = numMeasures;
		for (b=0;b<numMeasures;b++){
			var currentChord = new Array;
			currentChord.length = 1;
			//post(pitchArray);
			//post(b);
			//post(pitchArray[b]);
			//post(eval(pitchArray[b]));
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
			//post(outputOnset[b]);
			//post();
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
	//post(getPitches);
	//post();
	possibleChords = new Array;
	uniquePitches = new Array;
	//pitches = pitches % 12;
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
	//post(pitchvar);
	post('----------------------------');
	post();
	var boolArray = new Array(possibleChords.length);
	var chordProbabilities = new Array(possibleChords.length);
	var p_chord = pre_chord;
	//for (a = 0; a < possibleChords.length; a++) {
  	//	boolArray[a] = new Array(pitchvar.length);
	//}
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
			
			//post(chord_bank_edited[possibleChords[i]][0]);
			//post();
			//post(pitches);
			//post();
			//post(j);
			//post();
			//post(pitches[j]);
			//post();
			//post(meter);
			//post();
			//post(onset[j]);
			//post();
			
			
			//boolArray[i][j] = bool;
			if (meter.indexOf(onsetvar[j]) != -1) {
				
				//post(onset[j]);
				//post(meter.indexOf(onset[j]));
				//post(bool);
				//post();
				//post(strength_data[bool][strength_index.indexOf(strength_conv[meter.indexOf(onset[j])])]);
				//post();
				currChordProb *= strength_data[bool][strength_index.indexOf(strength_conv[meter.indexOf(onsetvar[j])])];
			}
			//post('currChordProb, strength: ');
			//post(currChordProb);
			//post();
			//post(duration[j]);
			if (duration_index.indexOf(duration[j]) != -1) {
				currChordProb *= duration_data[bool][duration_index.indexOf(duration[j])];
				//post(bool);
				//post();
				//post(duration_data[bool][duration_index.indexOf(duration[j])]);
				//post();
			}
			
			
			
		}
		if (p_chord != -1) {
				//post('prev_chord loop');
				//post(p_chord);
				//post();
				ante_root = chord_bank_edited[p_chord][1];
				cons_root = chord_bank_edited[possibleChords[i]][1];
				raw = ante_root-cons_root;
				if (raw < 0) {
					motion = 12 + raw;
					}
				else{
					motion = raw;
					}
				//motion = (ante_root - cons_root) % 12;
				//post(ante_root);
				//post(cons_root);
				//post();
				//post(motion);
				//post(chord_bank_edited[p_chord][7]);
				//post();
				//post(currChordProb);
				//post();
				currChordProb *= transition_data[chord_bank_edited[p_chord][7]][motion];
				
				currChordProb *= qual_transition[chord_bank_edited[p_chord][7]][chord_bank_edited[possibleChords[i]][7]];
				//post(currChordProb);
				//post();
				//post('done');
				//post();
			}
			
			post('currChordProb, duration: ');
			post(currChordProb);
			post();
		chordProbabilities[i] = currChordProb;
		//Here you get the boolean of each pitch for this chord
		//post(chord_bank_edited[possibleChords[i]][0]);
		//post(chordProbabilities[i]);
		//post();
	}
	post(chordProbabilities);
	post();
	var chordProbCopy = chordProbabilities.slice();
	var topValues = chordProbCopy.sort(function(a, b){return a-b}).slice(-5).filter(onlyUnique);
	post(topValues);
	post();
	topValues = topValues.sort(function(a, b){return a-b});
	//post(topValues);
	//post();
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
	//progression.push(chordProbabilities[indices.length]);

	//post(chordProbabilities);
	//post();
	//post("measureNumber: ");
	//post(measureNumber);
	
	//post();
	//post(progressionIdx);
	//post(p_chord);
	//post();
	return [progressionIdx, p_chord];
}
