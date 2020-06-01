// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const path = require( 'path' );

function colorTheme( cssTheme ) {
	// Dynamically change css theme

    var cssFile = "view/css/" + cssTheme;
    var href    = path.join( __dirname, cssFile );
    var w3Theme = document.getElementById("w3Theme");

	if ( w3Theme ) {
        if ( w3Theme.href !== href ) {
            w3Theme.href = href;
        }
	}

    require('electron').remote.getGlobal('GlobalTheme').css = cssTheme;
}

window.addEventListener('DOMContentLoaded', () => {
	var cssTheme = require('electron').remote.getGlobal('GlobalTheme').css;

	colorTheme( cssTheme );

	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	const archString = process.platform;
	const cdPath 	 = path.join( __dirname, '.' );

	replaceText( `platform-arch`, archString );
	replaceText( `cd`, cdPath );

	require( 'dns' ).resolve( 'www.google.com', function( err ) {
		if ( err ) {
			//console.log("No connection");
			replaceText( `isOnline`, "offline" );
		} else {
			//console.log("Connected");
			replaceText( `isOnline`, "online" );
		}
	});

});
