#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib
APP_PATH=output

APP_JAR=$APP_PATH/testapp.jar
APP_CP=$APP_JAR
INSTR_JAR=$INSTR_PATH/taskprof.jar

./bin/startProfiler.sh &

sleep 1

echo java -cp $APP_CP -agentpath:lib/libdislagent.jnilib  -Xbootclasspath/a:lib/disl-bypass.jar:$INSTR_JAR -noverify Main

java -cp $APP_CP -agentpath:lib/libdislagent.jnilib  -Xbootclasspath/a:lib/disl-bypass.jar:$INSTR_JAR -noverify Main
