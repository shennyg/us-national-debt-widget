#!/bin/bash

set -e

rm -rvf dist
broccoli build dist
cd dist
python -m SimpleHTTPServer 9002 &
open http://localhost:9002/
