// inlets and outlets
inlets = 1
outlets = 4
// global variables
var clip_number = 0;
//var api = new LiveAPI(sample_callback, clip_string)
var list = new Array(0)
//var x = arrayfromargs(messagename, arguments);
//if (!api) {
//  post("no api object\n")
//
//}

// functions
function notes(){
	// Empty filler function to remove error
}

function note(x){
	// Take input arguments and output pitch, onset, and duration and append to list on output
	var list = new Array(arguments.length);
	for (i=0;i<arguments.length;i++)
	{
		list[i] = arguments[i];
	}
	for (x=0;x<3;x++)
	{
		outlet(x, list[x]);
	}
}

function done(){
	// After all the notes have been read, send data to the next js file
	outlet(3, "bang");
}
