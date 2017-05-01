#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib

APP_JAR=lib/dacapo-9.12-bach.jar
APP_CP=$APP_JAR

INSTR_JAR=$INSTR_PATH/dacapoInst.jar

./bin/startProfiler.sh &

sleep 1

echo starting program

java -agentpath:lib/libdislagent.jnilib -Xbootclasspath/a:lib/disl-bypass.jar:${INSTR_JAR} -noverify -jar ${APP_JAR} luindex --no-validation
