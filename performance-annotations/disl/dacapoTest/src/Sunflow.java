import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import profiler.*;

/**
 * Created by irenesjacob on 02.05.17.
 */
public class Sunflow {
    @SyntheticLocal
    static long startTime;

    /*

    @Before(marker=BodyMarker.class , scope = "org.*.*")
    static void onMethodEntry(MethodStaticContext msc){
        System.out.println(msc.thisMethodFullName());
    }
    */
//    /*
    @After(marker = BodyMarker.class, scope = "org.sunflow.*.*")
    static void afterMethodExit(ArgumentProcessorContext proc){
        proc.apply(StringArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
//        proc.apply(IntArgumentProcessor.class, ArgumentProcessorMode.METHOD_ARGS);
    }
//     */

    /*

    @After(marker = BodyMarker.class, scope = "org.sunflow.*.*")
    static void afterMethodExit(MethodStaticContext msc){
        BasicProfiler.addMethod(msc.thisMethodFullName());
    }
    */

//    /*
//    @Before(marker = BodyMarker.class, scope="org.sunflow.util.FastHashMap.alloc")
//    static void onMethodEntry(){
//        startTime = System.nanoTime();
//    }
//
//    @After(marker = BodyMarker.class, scope = "org.sunflow.util.FastHashMap.alloc" )
//    static void onMethodExit(){
//        long duration = System.nanoTime() - startTime;
////        System.out.println(duration);
//        ProfileExecutionTime.addValue(duration);
//    }
////     */

    /*
    @Before(marker = BodyMarker.class, scope="org.sunflow.core.primitive.TriangleMesh.WaldTriangle.intersect")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.sunflow.core.primitive.TriangleMesh.WaldTriangle.intersect" )
    static void onMethodExit(ArgumentProcessorContext proc){
        try {
            long duration = System.nanoTime() - startTime;
            int feature = (int)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
            ProfileWithFeature.addFeatureValuePair(feature, duration);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    */
}
