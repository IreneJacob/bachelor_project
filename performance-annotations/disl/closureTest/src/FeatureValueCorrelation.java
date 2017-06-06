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

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.NodeTraversal.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.NodeTraversal.*")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (arguments != null) {
            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, true);
        }
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
        // // if (rec != null) {
        //     if (rec instanceof Node) {
        //         Node n = (Node)rec;
        //         //
        //         Measurement m = new Measurement();
        //         m.arg_idx = arguments.length;
        //         m.ft = Measurement.FeatureType.FT_RECEIVER;
        //         m.fv = n.getChildCount();
        //         m.value = duration;
        //         ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
        //     }
        // // }
    }
}
