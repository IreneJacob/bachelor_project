# Data Analysis for Performance Annotations ![logo align="top"](https://github.com/IreneJacob/performance_annotations/blob/master/logo/logo_small.png)
Performance problems in large software systems can be difficult to resolve. In particular, identifying a performance issue in the source code of a large system can be an arduous process, with little guarantee of success.

The idea of performance annotations is to provide valuable information regarding the performance characteristics of a piece of code. For example, a performance annotation might relate the running time or space complexity of a function to, say, the size of an input data structure. This information can then be used to optimise a system.

With proper analysis, the data received from these annotations could reveal the parts of the system causing performance problems.

The goal of this project is to derive performance annotations from the execution of a system. In essence, this amounts to recording and analysing relevant data logged by instrumenting a subject system.

Specifically, we look at two case studies in this project:

Closure compiler and these systems from the DaCapo benchmark suite:
- Lucene - Luindex, Lusearch
- H2
- Sunflow

## Finding popular methods
In the **src** directory, there is a file *PopularMethods.java*. Change the scope in the @After annotation of the afterMethodExit method, to the scope that you are investigating.

Please note:  for dacapoTest, you can change the benchmark you are testing in the file *startApp.sh* in the **bin** directory. Similarly, to test a different javascript file for closureTest, change the filename in *startApp.sh*

Details of the output file (such as output filename and where to create the output file) can be set in the shutdown hook of the *BasicProfiler.java* file in the **src/profiler** directory.

To run the profiler, write the following line in the terminal:
``` ant clean; ant run ```

Please make sure that the DiSL-Class in the *Manifest.MF* file has the name **PopularMethods**

## Finding interesting methods and their features
The scope of the search should be defined in the @Before and @After annotations of the methods pushOnMethodEntry and popOnMethodExit  in the file *FeatureValueCorrelation.java* in the **src** folder. The output location and output filename can be defined in the file *ProfileExecutionTime.java* in the **src/profiler** directory. By default the file name is *Index.dat* The output should be the full name of the method and the PCC value calculated for it and its features.

If a particular method looks interesting, then uncomment the line
```
print_values("<full-name-of-method>");
```
and copy the full name of the method to run find details about the method and its features. Again, the name of the output file for this information and its output location can be changed in the print_values method in the *ProfileExecutionTime.java*  file.

To run the profiler, write the following line in the terminal:
``` ant clean; ant run ```

Please make sure that the DiSL-Class in the *Manifest.MF* file has the name **FeatureValueCorrelation**

## Recording Results
Once a promising method has been found from the previous stages, write the scope of the method you are instrumenting as the scope in the file *RecordResults.java* in the **src** directory. The location and name of the output file can be set in the file *Profiler.java* in the directory **src/profiler**. Change the following line of code in *Profiler.java* to select which feature type of the method, you would like the results to observe.

After this, we plot the results and add a fitted curve to the data points to better understand the relation between the value of the feature and the performance metric being measured (execution time in nanoseconds). An example graph is given below

To run the profiler, write the following line in the terminal:
``` ant clean; ant run ```

Please make sure that the DiSL-Class in the *Manifest.MF* file has the name **RecordResults**

An example of a graph from the data collected in this project is given below:

![graph align="center"](https://github.com/IreneJacob/performance_annotations/blob/master/poster/sample_graph.png)
<!--
contains source code for instrumenting closure compiler

bin:

- 'plotGraphs.sh': bash script for making graphs using gnuplot.

  ```
    ./bin/plotGraphs.sh graph_name.png data.dat graph_title x_range y_range
  ```

- 'startApp.sh': starts the server, waits a second, starts the application
- 'startProfiler': starts the DiSL server plotGraphs.sh

js: contains javascript files taken from the internet to be passed as input to the closure compiler

lib: contains jar files required to run the DiSL server and the closure compiler.

logs: contains .dat files generated

src:

- dataStructures: contains files like 'KeyValuePairs.java' which are data structures used by the profiler to store feature value and execution time pairs.
- Profiler:

  - 'IntArgumentPrinter.java': prints details about the integer argument of a method to standard output.
  - 'ProfileData.java': a class which stores just the execution time (without any feature) in a .dat file
  - 'Profiler.java': a class which stores feature values and execution time pair in .dat files

- Other .java files in this folder: source code for instrumenting the closure compiler.

- The manifest contains the names of the disl classes that will be called by the disl server.

Please note: the ProfileData and Profiler files do not have to be specified in the manifest as they are not Disl classes (don't have disl annotations).

--------------------------------------------------------------------------------

## dacapoTest

contains source code for instrumenting DaCapo benchmarks.

bin:

- 'plotGraphs.sh': bash script for making graphs using gnuplot. results are stored in the directory graphs.

  ```
    ./bin/plotGraphs.sh graph_name.png data.dat graph_title x_range y_range
  ```

- 'startApp.sh': starts the server, waits a second, starts the application
- 'startProfiler': starts the DiSL server

avrora, lucene, h2, sunflow: contains data files generated by the profilers

lib: contains jar files required to run the DiSL server and the DaCapo benchmarks.

src:

- dataStructures: contains files like 'KeyValuePairs.java' which are data structures used by the profiler to store feature value and execution time pairs.
- profiler:

  - 'IntArgumentProcessor.java': prints details about the integer argument of a method to standard output.
  - 'ProfileExecutionTime.java': a class which stores just the execution time (without any feature) in a .dat file
  - 'ProfileWithFeature.java': a class which stores feature values and execution time pair in .dat files

- 'H2.java', 'Lucene.java', 'Sunflow.java': source code for instrumenting the respective benchmarks.

- The manifest contains the names of the disl classes that will be called by the disl server.

Please note: the ProfileWithFeature and ProfileExecutionTime files do not have to be specified in the manifest as they are not Disl classes (don't have disl annotations). -->
