#!/usr/bin/python3

import os

os.system('python.exe clean.py' if os.name == 'nt' else './clean.py');

print('\nCompiling...\n=========================\n')

for filename in os.listdir('.'):
    if filename.endswith('.ts'):
        print('- ', end='')
        print(filename)
        os.system('tsc '+ filename)
