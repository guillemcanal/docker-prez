/**
 * phantomjs script for printing presentations to PDF.
 *
 * Example:
 * phantomjs print-pdf.js "http://lab.hakim.se/reveal-js?print-pdf" reveal-demo.pdf
 *
 * By Manuel Bieh (https://github.com/manuelbieh)
 */

var webPage = require('webpage'),
	system = require('system'),
	page = webPage.create(),
	inputFile = system.args[1] || 'index.html?print-pdf',
	outputFile = system.args[2] || 'slides.pdf';

page.viewportSize = {
	width: 1056,
	height: 770
};

page.paperSize = {
	width: 1056,
	height: 770,
	border: 0,
	margin: 0
};

if( outputFile.match( /\.pdf$/gi ) === null ) {
	outputFile += '.pdf';
}

console.log( 'Printing PDF (Paper size: '+ page.paperSize.width + 'x' + page.paperSize.height +')' );

page.open(inputFile, function(status) {
	
  	page.evaluate(function() {

  		// make iframe clickable
	    Array.prototype.forEach.call(
	    	document.querySelectorAll('iframe'), 
	    	function (iframe) {
	    		var link = document.createElement('a'),
	    			clone = iframe.cloneNode(true),
	    			src = iframe.getAttribute('data-src') || iframe.src;
	    			href = iframe.getAttribute('data-href') || src;
				clone.src = src;
	    		link.href = href;
	    		link.appendChild(clone);
	    		iframe.parentNode.replaceChild(link, iframe);
    		}
		);

	});

  	window.setTimeout( function() {
		console.log( 'Printed successfully in ' + outputFile);
		page.render( outputFile );
		phantom.exit();
	}, 5000);

});

