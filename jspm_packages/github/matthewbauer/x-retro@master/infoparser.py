#!/usr/bin/env python

# used to create file extensions association

import json
import imp
import os
import os.path

DIR = 'cores'
extensions = {}
for filename in os.listdir(DIR):
  parts = filename.split('.')
  corename = parts[0]
  extension = parts[-1]
  if extension == 'info':
    if os.path.isfile(os.path.join(DIR, corename + '.dylib')):
      core = imp.load_source(corename, os.path.join(DIR, filename))
      if core.supported_extensions != '':
        for support in core.supported_extensions.split('|'):
          if support not in extensions:
            extensions[support] = []
          extensions[support].append(corename)
with open('cores.json', 'w') as outfile:
  json.dump(extensions, outfile, sort_keys=True, indent=2)
