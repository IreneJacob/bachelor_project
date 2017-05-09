import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import profiler.*;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.lang.reflect.Array;
import java.util.Collection;


/**
 * Created by irenesjacob on 30.04.17.
 */
public class Lucene {
//
    @SyntheticLocal
    static long time;

    @SyntheticLocal
    static long startTime;
//
//    @Before(marker=BodyMarker.class, scope="org.dacapo.luindex.Index.<init>")
//    static void pushOnMethodEntry(){
////        System.out.println(msc.thisMethodFullName());
//        time = System.nanoTime();
//    }
//
//    @After(marker=BodyMarker.class, scope="org.dacapo.luindex.Index.<init>")
//    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc){
//        long duration = System.nanoTime() - time;
////        int feature = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].;
////        System.out.println(apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString());
////         System.out.println(System.nanoTime() - time);
//        ProfileExecutionTime.addValue(duration);
////         ProfileExecutionTime.addValue(duration,Thread.currentThread());
//    }

    /*

    @Before(marker=BodyMarker.class , scope = "org.*.*")
    static void onMethodEntry(MethodStaticContext msc){
        System.out.println(msc.thisMethodFullName());
    }
    */
//    /*
/*
    @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.*.*")
    static void afterMethodExit(ArgumentProcessorContext proc){
//        proc.apply(StringArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
        Object[] o = proc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
    }
*/

/*

//    finding most called methods
    @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.*.*")
    static void afterMethodExit(MethodStaticContext msc){
        BasicProfiler.addMethod(msc.thisMethodFullName());
    }


*/

    /*

    // to write feature and value pair to .dat file
    @Before(marker = BodyMarker.class, scope="org.apache.lucene.index.LogMergePolicy.findMergesForOptimize")
    static void onMethodEntry(){
      startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.LogMergePolicy.findMergesForOptimize")
    static void onMethodExit(ArgumentProcessorContext proc, MethodStaticContext msc){
          // an example of value: execution time
          long duration = System.nanoTime() - startTime;
          int feature = ((Collection)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0]).size();
//          int feature = (int)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[2];
          Profiler.writeToFile(feature,duration);
    }

     */
//    /*
//    looks for interesting features using pcc
    @Before(marker = BodyMarker.class, scope="org.apache.lucene.index.TermBuffer.*")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

        @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.TermBuffer.*")
        static void onMethodExit(ArgumentProcessorContext proc, MethodStaticContext msc){
                // an example of value: execution time
                long duration = System.nanoTime() - startTime;
//                System.out.println("hello");
                Object[] method_args = proc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
                if (method_args != null){
                    FeatureSearch.searchForFeatures(method_args,msc.thisMethodFullName(),duration);
                }
        }
//             */

        //    /*
//    @Before(marker = BodyMarker.class, scope="org.dacapo.parser.ConfigFileTokenManager.jjCheckNAdd")
//    static void onMethodEntry(){
//        startTime = System.nanoTime();
//    }
//
//    @After(marker = BodyMarker.class, scope = "org.dacapo.parser.ConfigFileTokenManager.jjCheckNAdd " )
//    static void onMethodExit(){
//        long duration = System.nanoTime() - startTime;
////        System.out.println(duration);
//        ProfileExecutionTime.addValue(duration);
//    }
//     */

}

