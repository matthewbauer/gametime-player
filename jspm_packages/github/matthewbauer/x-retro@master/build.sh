#!/bin/sh

#create auto-loading dependency bundle (bundle.js)
node --max_old_space_size=4096 ./node_modules/jspm/jspm.js bundle --minify --inject --skip-source-maps player.coffee! + x-retro + raw + snes9x-next + gambatte + vba-next + nestopia + gw + vecx bundle.js
#create light-weight self-executing launcher bundle (build.js)
jspm bundle-sfx x-retro.js 
echo "" >> build.js
cat jspm_packages/system.js config.js >> build.js
