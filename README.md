# tag-monitor
A script to test if a tag has been inserted into the DOM via JS 
 * Requires executable of phantomjs-2.1.1.
 * Search for gtm-monitoring and replace it with the tag/div ID you want to check for.
 
### Usage

You can pass sites as many as you want.

```
./phantomjs tag-monitor.js 'https://www.google.com/' 'https://www.github.com/'
```