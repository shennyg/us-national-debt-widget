# US National Debt Widget

The debt widgets aka "debt clocks" I found<a href="#fn1"><sup>1</sup></a> weren't available over a secure connection, this one doesn't require an external website, just upload a single file to your server.

# Usage

1. Upload `debtClock.min.js` to your public webroot or use the [rawgit CDN version](https://cdn.rawgit.com/shennyg/us-national-debt-widget/d402d06f61b19aee6c134007f3cad3a0fe39a2a8/dist/debtClock.min.js).
2. Add the script to your HTML with the correct path to the above file.
3. Call the script after your DOM has loaded.

````html
<h1 id="debtClock">Calculating debt...</h1>
<script src="https://cdn.rawgit.com/shennyg/us-national-debt-widget/d402d06f61b19aee6c134007f3cad3a0fe39a2a8/dist/debtClock.min.js" type="text/javascript"></script>
<script type="text/javascript">
  (function() {
    var options = {};
    var debtClock = new DebtClock(options);
  })();
</script>
````

[See available options](https://github.com/shennyg/us-national-debt-widget/blob/master/src/app.js#L27).

# Development

For fun this was built using [ES2015](https://babeljs.io/).

1. Install [broccoli](https://github.com/broccolijs/broccoli)
2. Install required development modules, run `npm install`
3. Run `npm run serve` or `broccoli serve` and open [http://localhost:4200/](http://localhost:4200/). Broccoli will watch for modifications to `src/app.js` and recompile so all you need to do is refresh your browser.

# Build

1. To build the files into `dist/` and test on [http://localhost:8000/](http://localhost:8000/), run `npm run build` or `sh ./build.sh`

The file you will want is `dist/debtClock.min.js`.

# Todo

- [x] Add to free CDN service so people can use without hosting the file.

# Footnotes

[<a name="fn1">1</a>]: US Debt Widgets without a valid SSL cert: http://www.usadebtclock.com/debt-clock-widget-for-website.php & http://zfacts.com/p/789.html
