#!/bin/sh

jspm bundle-sfx index.coffee!
zip -r build.zip . -x '*.git*' -x '*jspm_packages*' -x '*node_modules*' -x 'build.zip'
