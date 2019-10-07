#!/usr/bin/python3

import os

print('Removing old js files.\n=========================\n')
for filename in os.listdir('.'):
    if filename.endswith('.js'):
        print('- ' + filename)
        os.system(('del ' if os.name == 'nt' else 'rm ')+ filename)