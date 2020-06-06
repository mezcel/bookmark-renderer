// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const path = require( 'path' );

function toggleLightDark( isDark ) {

    var l1 = "w3-theme-l1",
        l2 = "w3-theme-l2",
        l3 = "w3-theme-l3",
        l4 = "w3-theme-l4",
        l5 = "w3-theme-l5";

    var d1 = "w3-theme-d1",
        d2 = "w3-theme-d2",
        d3 = "w3-theme-d3",
        d4 = "w3-theme-d4",
        d5 = "w3-theme-d5";


    if ( isDark ) {

        var eleml1 = document.querySelector( "." + l1 );
        var eleml2 = document.querySelector( "." + l2 );
        var eleml3 = document.querySelector( "." + l3 );
        var eleml4 = document.querySelector( "." + l4 );
        var eleml5 = document.querySelector( "." + l5 );

        if ( eleml1 ) { eleml1.classList.replace( l1, d1 ); }
        if ( eleml2 ) { eleml2.classList.replace( l2, d2 ); }
        if ( eleml3 ) { eleml3.classList.replace( l3, d3 ); }
        if ( eleml4 ) { eleml4.classList.replace( l4, d4 ); }
        if ( eleml5 ) { eleml5.classList.replace( l5, d5 ); }

    } else {

        var elemd1 = document.querySelector( "." + d1 );
        var elemd2 = document.querySelector( "." + d2 );
        var elemd3 = document.querySelector( "." + d3 );
        var elemd4 = document.querySelector( "." + d4 );
        var elemd5 = document.querySelector( "." + d5 );

        if ( elemd1 ) { elemd1.classList.replace( d1, l1 ); }
        if ( elemd2 ) { elemd2.classList.replace( d2, l2 ); }
        if ( elemd3 ) { elemd3.classList.replace( d3, l4 ); }
        if ( elemd4 ) { elemd4.classList.replace( d4, l3 ); }
        if ( elemd5 ) { elemd5.classList.replace( d5, l5 ); }

    }
    console.log( isDark );
}

function colorTheme( cssTheme, isDark ) {
	// Dynamically change css theme

    var cssFile = "view/css/" + cssTheme;
    var href    = path.join( __dirname, cssFile );
    var w3Theme = document.getElementById("w3Theme");

	if ( w3Theme ) {

        if ( w3Theme.dark !== isDark ) {
            w3Theme.isDark = isDark;
            toggleLightDark( isDark );
        }
        w3Theme.isDark = isDark;

        if ( w3Theme.href !== href ) {
            w3Theme.href = href;
			require('electron').remote.getGlobal('GlobalTheme').css = cssTheme;
        }

	}
	console.log(  w3Theme.isDark, require('electron').remote.getGlobal('GlobalTheme').isDark, "renderer.js" );

}

window.addEventListener('DOMContentLoaded', () => {
	var cssTheme = require('electron').remote.getGlobal('GlobalTheme').css;
	var isDark 	 = require('electron').remote.getGlobal('GlobalTheme').isDark;
	console.log( isDark );
	colorTheme( cssTheme, isDark );

	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	const archString = process.platform;
	const cdPath 	 = path.join( __dirname, './' );

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
