#!/bin/sh

jspm bundle-sfx index.coffee!
zip -r build.zip index.html build.js google-analytics-bundle.js index.css manifest.json background.js icon/
