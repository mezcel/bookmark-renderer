// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	const archString = process.platform;
	const cwdString = process.cwd();

	replaceText( `platform-arch`, archString );
	replaceText( `cd`, cwdString );

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

