#!/bin/bash

for f in ./openfin/*; do 
	openfin --launch --config "$f" --allow-running-insecure-content &
done