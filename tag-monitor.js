/**
 * tag-monitor is a script to test if a tag has been inserted into the DOM via phantomjs.
 * Requires executable of phantomjs-2.1.1.
 * Search for gtm-monitoring and replace it with the tag/div ID you with to check for.
 * Usage: ./phantomjs tag-monitor.js 'https://www.google.com/' 'https://www.github.com/'
 * You can pass sites as many as you want.
 */

var page = require('webpage').create();
var system = require('system');
var args = system.args;

if (args.length === 1) {
    console.log("Try to pass some sites when invoking the script! eg: 'https://www.google.com/' 'https://www.github.com/' ");
    phantom.exit();
} else {
    var urls = [];
    args.forEach(function(arg, i) {
        urls [i] = [arg];
    });
}

urls.shift(); // drop index 0 from the array which is the script name.
var count = 0;
var tagFound = 'The GTM tag is firing properly on: ';
var tagNotFound = 'The GTM tag is not loaded on: ';

var repeatStr = function(str, count) {
    var array = [];
    for(var i = 0; i < count;)
        array[i++] = str;
    return array.join('');
};

var iterate = function () {
    return function (urlStatus) {
        // stop if there was a problem with the sites.
        if (urlStatus === 'fail' || !urlStatus) {
            console.log('There was a problem with the sites urls[].');
            phantom.exit();
        }
        var script = 'function() { return document.getElementById("gtm-monitoring") }';
        var gtmDiv = page.evaluateJavaScript(script);
        if (typeof(gtmDiv) === 'object') { // tag has been inserted into the DOM.
            console.log(tagFound + urls[count]);
            console.log(repeatStr("-", urls[count].length + tagFound.length));
        } else if (typeof(gtmDiv) === 'string'){ // returns null tag is not in the DOM.
            console.log(tagNotFound + urls[count]);
            console.log(repeatStr("-", urls[count].length + tagNotFound.length));
        }
        count++;
        if (urlStatus === "success") {
            if (count < urls.length) {
                // open the next url...
                page.open(urls[count], iterate());
            } else {
                // try to open the next url and stop if it is undefined or last element.
                page.open(urls[count], function () {
                    phantom.exit();
                });
            }
        }
    };
};

page.open(urls[count], iterate());