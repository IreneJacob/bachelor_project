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

import java.lang.reflect.Array;
import java.util.*;
//import profiler.Profiler;

/**
 * Created by irene on 10.05.17.
 */
public class FeatureValueCorrelation {

    @SyntheticLocal
    static long time;
    @SyntheticLocal
    static long memory;

//    com/google/javascript/rhino/Node.useSourceInfoIfMissingFromForTree
//com/google/javascript/rhino/Node.addChildrenAfter

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.*")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        boolean precise = false;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
//        if ((Set)arguments[0] instanceof Collection){
//            System.out.println("is a collection");
//        }
//        if (arguments != null) {
//            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, !precise);
//        }
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);

        if (rec != null) {
            if (rec instanceof Node) {
                Node n = (Node)rec;
                //
                Measurement m = new Measurement();
                m.arg_idx = arguments.length;
                m.ft = Measurement.FeatureType.FT_OBJECTRETURNED;
                m.fv = n.getChildCount();
                m.value = duration;
                Profiler.addValue(m);
//                ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
            }
        }
    }
}
