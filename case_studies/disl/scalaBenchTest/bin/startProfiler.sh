#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib
APP_JAR=lib/dacapo-9.12-bach.jar

DISL_SERVER_JAR=$DISL_LIB_PATH/disl-server.jar
INSTR_JAR=$INSTR_PATH/scalaBenchInst.jar
DISL_OPTIONS="-Ddisl.exclusionList=$EXCLUSION_LIST -noverify"


SERVER_CP=$DISL_SERVER_JAR:$INSTR_JAR:$APP_JAR

echo starting DiSL server

java -cp $SERVER_CP $DISL_OPTIONS ch.usi.dag.dislserver.DiSLServer

echo started server
