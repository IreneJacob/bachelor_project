import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import profiler.*;

import java.util.Stack;

/**
 * Created by irenesjacob on 01.05.17.
 */
public class H2 {

    @SyntheticLocal
    static long startTime;

    /*

    @Before(marker=BodyMarker.class , scope = "org.h2.constant.SysProperties.*")
    static void onMethodEntry(MethodStaticContext msc){
        System.out.println(msc.thisMethodFullName());
    }
    /*

    @After(marker = BodyMarker.class, scope = "org.h2.*.*")
    static void afterMethodExit(ArgumentProcessorContext proc){
        proc.apply(IntArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
    }

     */
    /*
    @Before(marker = BodyMarker.class, scope="org.h2.jdbc.JdbcPreparedStatement.setParameter")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.h2.jdbc.JdbcPreparedStatement.setParameter" )
    static void onMethodExit(){
        long duration = System.nanoTime() - startTime;
//        System.out.println(duration);
        ProfileExecutionTime.addValue(duration);
    }
     */

//    /*
    @Before(marker = BodyMarker.class, scope="org.apache.lucene.index.LogMergePolicy.isOptimized")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.LogMergePolicy.isOptimized" )
    static void onMethodExit(ArgumentProcessorContext proc){
        try {
            long duration = System.nanoTime() - startTime;
            int feature = (int)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
//        System.out.println(duration);
//            ProfileExecutionTime.addValue(duration);
//            ProfileWithFeature.addFeatureValuePair(feature, duration);
            Profiler.writeToFile(feature,duration);
        }catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }
//    */


    /*
    @Before(marker = BodyMarker.class, scope="org.apache.lucene.index.*.*")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.apache.lucene.index.*.*")
    static void onMethodExit(ArgumentProcessorContext proc, MethodStaticContext msc){
        try {
            // an example of value: execution time
            long duration = System.nanoTime() - startTime;
            Object[] method_args = proc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
            FeatureSearch.searchForFeatures(method_args,msc.thisMethodFullName(),duration);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    */


//    @After(marker = BodyMarker.class, scope = "org.h2.*.*")
//    static void afterMethodExit(ArgumentProcessorContext proc){
//        proc.apply(StringArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
////        BasicProfiler.addMethod(msc.thisMethodFullName());
//    }


}
