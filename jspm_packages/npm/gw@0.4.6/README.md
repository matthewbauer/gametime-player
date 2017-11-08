# gw-libretro

**gw-libretro** is a [libretro](http://www.libretro.com/) core that runs Game & Watch simulators.

It runs simulators converted from source code for the games available at [MADrigal](http://www.madrigaldesign.it/sim/). Each simulator is converted with [pas2lua](https://github.com/leiradel/pas2lua), which was written specifically for this purpose, and uses [bstree](https://github.com/leiradel/bstree), which was also specifically written to obfuscate the generated Lua source code as per MADrigal's request.

The converted games are available at [libretro's buildbot site](http://bot.libretro.com/assets/cores/gw/). Unpack the zip and read the README.txt for instructions.

The [SNES controller](http://commons.wikimedia.org/wiki/File:SNES_controller.svg) and the [Boxy Bold](http://opengameart.org/content/boxy-bold-font) font used in **gw-libretro** are released under the [CC0](http://creativecommons.org/publicdomain/zero/1.0/).
