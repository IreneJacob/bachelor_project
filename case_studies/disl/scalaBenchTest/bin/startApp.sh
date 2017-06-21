#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib

APP_JAR=lib/scala-benchmark-suite-0.1.0-20110410.175024-1.jar
APP_CP=$APP_JAR

INSTR_JAR=$INSTR_PATH/scalaBenchInst.jar

./bin/startProfiler.sh &

sleep 1

echo starting program

java -agentpath:lib/libdislagent.jnilib -Xbootclasspath/a:lib/disl-bypass.jar:${INSTR_JAR} -noverify -jar ${APP_JAR} actors -s default --no-validation
