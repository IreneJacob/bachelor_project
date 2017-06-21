#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib
APP_PATH=output

APP_JAR=$APP_PATH/testapp.jar
DISL_SERVER_JAR=$DISL_LIB_PATH/disl-server.jar
INSTR_JAR=$INSTR_PATH/taskprof.jar
EXCLUSION_LIST=conf/exclusion.lst
DISL_OPTIONS="-Ddisl.exclusionList=$EXCLUSION_LIST -noverify"

SERVER_CP=$DISL_SERVER_JAR:$INSTR_JAR:$APP_JAR


echo java -cp $SERVER_CP $DISL_OPTIONS ch.usi.dag.dislserver.DiSLServer

java -cp $SERVER_CP $DISL_OPTIONS ch.usi.dag.dislserver.DiSLServer
