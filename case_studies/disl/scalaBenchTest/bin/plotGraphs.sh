#!/bin/bash
echo "set terminal png
set output './graphs/$1'
plot [$4] [$5]'$2' title '$3'" | gnuplot
