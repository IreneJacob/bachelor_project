import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import profiler.IntArgumentProcessor;
import profiler.ProfileExecutionTime;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;


/**
 * Created by irenesjacob on 30.04.17.
 */
public class Lucene {
//
//    @SyntheticLocal
//    static long time;
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


    @SyntheticLocal
    static long startTime;

    /*

    @Before(marker=BodyMarker.class , scope = "org.*.*")
    static void onMethodEntry(MethodStaticContext msc){
        System.out.println(msc.thisMethodFullName());
    }
    */
    /*

    @After(marker = BodyMarker.class, scope = "org.dacapo.*.*")
    static void afterMethodExit(ArgumentProcessorContext proc){
        proc.apply(IntArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
    }

     */
//    /*

    @Before(marker = BodyMarker.class, scope="org.dacapo.parser.ConfigFileTokenManager.jjCheckNAdd")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.dacapo.parser.ConfigFileTokenManager.jjCheckNAdd " )
    static void onMethodExit(){
        long duration = System.nanoTime() - startTime;
//        System.out.println(duration);
        ProfileExecutionTime.addValue(duration);
    }
//     */
}

