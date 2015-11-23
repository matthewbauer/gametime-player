#!/bin/sh

jspm bundle index.coffee! + nestopia + gambatte + snes9x-next + gw + vba-next + vecx + picodrive + quicknes --inject

zip -r build.zip \
  index.html \
  build.js \
  google-analytics-bundle.js \
  index.css \
  manifest.json \
  background.js \
  bootstrap.js\
  icon/ \
  jspm_packages/system-csp-production.js \
  'jspm_packages/github/jmcriffey/bower-traceur-runtime@0.0.91/traceur-runtime.min.js' \
  config.js
