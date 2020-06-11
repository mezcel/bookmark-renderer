// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const path   = require( 'path' );
const cdPath = path.join( __dirname, './' );

var cssTheme = require('electron').remote.getGlobal('GlobalTheme').css;
var isDark 	 = require('electron').remote.getGlobal('GlobalTheme').isDark;

function replaceThemeClass( themeElem, strInitClass, strNewClass ) {

    if ( themeElem ) {
        var i = 0;

        for ( i = 0; i < themeElem.length; ++i ) {
            themeElem[i].classList.replace( strInitClass, strNewClass );
        }
    }

}

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

    var eleml1 = 0,
        eleml2 = 0,
        eleml3 = 0,
        eleml4 = 0,
        eleml5 = 0;

    if ( isDark ) {

        eleml1 = document.querySelectorAll( "." + l1 );
        eleml2 = document.querySelectorAll( "." + l2 );
        eleml3 = document.querySelectorAll( "." + l3 );
        eleml4 = document.querySelectorAll( "." + l4 );
        eleml5 = document.querySelectorAll( "." + l5 );

        replaceThemeClass( eleml5, l5, d5 );
        replaceThemeClass( eleml4, l4, d4 );
        replaceThemeClass( eleml3, l3, d3 );
        replaceThemeClass( eleml2, l2, d2 );
        replaceThemeClass( eleml1, l1, d1 );
    } else {

        elemd1 = document.querySelectorAll( "." + d1 );
        elemd2 = document.querySelectorAll( "." + d2 );
        elemd3 = document.querySelectorAll( "." + d3 );
        elemd4 = document.querySelectorAll( "." + d4 );
        elemd5 = document.querySelectorAll( "." + d5 );

        replaceThemeClass( eleml5, d5, l5 );
        replaceThemeClass( eleml4, d4, l4 );
        replaceThemeClass( eleml3, d3, l3 );
        replaceThemeClass( eleml2, d2, l2 );
        replaceThemeClass( eleml1, d1, l1 );

    }

    console.log( "Dark Mode:", isDark );
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

window.addEventListener( 'DOMContentLoaded', () => {

    colorTheme( cssTheme, isDark );

	const replaceText = ( selector, text ) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for ( const type of ['chrome', 'node', 'electron'] ) {
		replaceText(`${type}-version`, process.versions[type])
	}

    const archString = process.platform;
	replaceText( `platform-arch`, archString );
	replaceText( `cd`, cdPath );

	require( 'dns' ).resolve( 'www.google.com', function( err ) {
		if ( err ) {
			replaceText( `isOnline`, "offline" );
		} else {
			replaceText( `isOnline`, "online" );
		}
    });

});
