#!/bin/bash

INSTR_PATH=output
DISL_LIB_PATH=lib
APP_PATH=output

A_CP=$DISL_LIB_PATH/dislre-server.jar:$INSTR_PATH/taskprof.jar

echo java -Ddebug=true -Xms1G -Xmx2G -cp $A_CP ch.usi.dag.dislreserver.DiSLREServer

java -Dshvm.logging.level=trace -Xms1G -Xmx2G -cp $A_CP ch.usi.dag.dislreserver.DiSLREServer
