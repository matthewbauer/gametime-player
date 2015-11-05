#!/bin/sh

jspm bundle index.coffee!
zip -r build.zip \
  index.html \
  build.js \
  google-analytics-bundle.js \
  index.css \
  manifest.json \
  background.js \
  icon/ \
  jspm_packages/system.js \
  'jspm_packages/github/jmcriffey/bower-traceur-runtime@0.0.91/traceur-runtime.min.js' \
  'jspm_packages/npm/gambatte@0.8.1/' \
  'jspm_packages/npm/snes9x-next@0.8.1/' \
  'jspm_packages/npm/gw@0.8.1/' \
  'jspm_packages/npm/vba-next@0.8.1/' \
  'jspm_packages/npm/vecx@0.8.1/' \
  'jspm_packages/npm/nestopia@0.8.1/' \
  config.js
