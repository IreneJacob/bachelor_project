.PHONY: all

all: aspects.jar

ASPECTS_SRC = testAspects/MethodCallerProfiler.java
# ASPECTS_SRC = testAspects/TimeProfiler.java

aspects.jar: $(ASPECTS_SRC)
	java -cp libs/aspectjrt.jar:libs/aspectjtools.jar:libs/closure-1.0.jar   org/aspectj/tools/ajc/Main -1.5 -outxml -outjar aspects.jar $(ASPECTS_SRC)

.PHONY: run

run: aspects.jar
	java -javaagent:libs/aspectjweaver.jar -cp libs/closure-1.0.jar:aspects.jar com.google.javascript.jscomp.CommandLineRunner --js js/03_test.js --js_output_file /dev/null
