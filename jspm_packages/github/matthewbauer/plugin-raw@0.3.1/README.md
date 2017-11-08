raw
===

Raw array buffer loader

Basic Use
---------

```javascript
System.import('./data.exe!raw').then(function(data) {})
```

'data' out will be an ArrayBuffer.

By default, this data will not be bundled with the SystemJS builder.

## Testing

The tests should work in both Node and on the web. The page "test.html" should load the tests (you can run the server with python -m SimpleHTTPServer). You can compare them to: [http://matthewbauer.us/plugin-raw/test.html](http://matthewbauer.us/plugin-raw/test.html)

To run in node:

```sh
mocha --compilers js:babel/register test.js
```

### License

MIT
