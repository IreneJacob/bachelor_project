import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.javascript.rhino.Node;
import profiler.FeatureSearch;
import profiler.Measurement;
import profiler.ProfileExecutionTime;
import profiler.Profiler;

/**
 * Created by irene on 10.05.17.
 */
public class FeatureValueCorrelation {

    @SyntheticLocal
    static long time;
    @SyntheticLocal
    static long memory;


    @Before(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
        //Runtime r = Runtime.getRuntime();
        //memory = r.freeMemory();
    }


    @After(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.*")
    //@After(marker=BodyMarker.class, scope="org.h2.result.Row.getValue")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        //Runtime r = Runtime.getRuntime();
        //long umem = memory - r.freeMemory();
        long duration = System.nanoTime() - time;
//        int feature = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].;
//        System.out.println(apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString());
        //System.out.println("Duration: " + duration);
//        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
//        System.out.println(rec.toString());
//        if (arguments != null) {
//            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration);
//        }
        if (rec != null) {
//            FeatureSearch.searchObjectForFeature(rec, msc.thisMethodFullName(), duration);
            if (rec instanceof Node) {
                Node n = (Node)rec;
                //
                Measurement m = new Measurement();
                m.arg_idx = -1;
                m.ft = Measurement.FeatureType.FT_NODEF1;
                m.fv = n.getChildCount();
//                    if (msc.thisMethodFullName().equals("com/google/javascript/rhino/Node.setInputId"))
//                        System.out.println("Node! " + m.fv);
                m.value = duration;
                ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//                Profiler.addValue(msc.thisMethodFullName(),m);
            }
        }
    }
}
