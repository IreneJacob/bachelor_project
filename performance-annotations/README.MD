# Performance annotations

## disl
contains the source code for instrumenting the dacapo benchmarks and closure compiler using DiSL.

All the other directories in this folder were used when deciding between DiSL and AspectJ to instrument the system. They are no longer useful, and are simply being kept here for documentation purposes (will be removed later).

## libs
contains jar files to instrument closure compiler with AspectJ.

## testAspects
contains source code for instrumening closure compiler with AspectJ.

The Makefile is to compile the AspectJ class and to run the instrumented classes
