// Default page.js
//
// 
//
function init() {

  // pngfix
	if ( typeof(pngfix) == 'function' ) {
		pngfix();
	}

	// IE op mac afvangen
	if ( navigator.appVersion.search("MSIE") != -1 &&  navigator.appVersion.search("Macintosh") != -1) {
		var alerttext= "Your microsoft web browser ("+navigator.appVersion+")\nCan not be used for this.\nUse Safari or Firefox on a Apple with OS-X.";
		alert (alerttext);
	}

	document.getElementById('mouse_layer').onmousedown = ignore_mouse_down;


}

