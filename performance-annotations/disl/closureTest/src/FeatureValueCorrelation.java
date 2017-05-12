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

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
//import profiler.Profiler;

/**
 * Created by irene on 10.05.17.
 */
public class FeatureValueCorrelation {

    @SyntheticLocal
    static long time;
    @SyntheticLocal
    static long memory;


    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.*.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
    }
//
//    @After(marker=BodyMarker.class, scope="com.google.javascript.rhino.Node.*")
//    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc){
//        long duration = System.nanoTime() - time;
//        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
//        if (arguments!= null){
//            int a;
//            for (a = 0; a < arguments.length; a++) {
//                if (arguments[a] != null){
//                    Measurement m = new Measurement();
//                    m.arg_idx = a;
//                    m.value = duration;
//                    if (arguments[a] instanceof Integer) {
//                        m.ft = Measurement.FeatureType.FT_INT;
//                        m.fv = (int)arguments[a];
//                    }
//                    else if (arguments[a] instanceof String) {
//                        m.ft = Measurement.FeatureType.FT_STRING;
//                        m.fv = ((String)arguments[a]).length();
//                    }
//                    else if (arguments[a] instanceof Collection) {
//                        m.ft = Measurement.FeatureType.FT_COLLECTION;
//                        m.fv = ((Collection)arguments[a]).size();
//                    }
//                    else if (arguments[a] instanceof Arrays) {
//                        m.ft = Measurement.FeatureType.FT_ARRAY;
//                        m.fv = 1;
//                    }
//                    else {
//                        m.ft = Measurement.FeatureType.FT_UNKNOWN;
//                        m.fv = -1;
//
//                    }
//                    ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//                }
//
//            }
//        }
//
//        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
//        if (rec instanceof Node) {
//            Node n = (Node)rec;
//            //
//            Measurement m = new Measurement();
//            m.arg_idx = arguments.length;
//            m.ft = Measurement.FeatureType.FT_NODEF1;
//            m.fv = n.getChildCount();
////            if (msc.thisMethodFullName().equals("com/google/javascript/rhino/Node.setInputId"))
////                System.out.println("Node! " + m.fv);
//            m.value = duration;
//            m.value = duration;
//            ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//        }
//    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.*.*")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (arguments != null) {
            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration);
        }
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
        if (rec != null) {
            if (rec instanceof Node) {
                Node n = (Node)rec;
                //
                Measurement m = new Measurement();
                m.arg_idx = arguments.length;
                m.ft = Measurement.FeatureType.FT_RETOBJ;
                m.fv = n.getChildCount();
                m.value = duration;
                ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
            }
//            else if (rec instanceof List){
//                List<String> listReturned = (List<String>) rec;
//                Measurement m = new Measurement();
//                m.arg_idx = arguments.length;
//                m.ft = Measurement.FeatureType.FT_COLLECTION;
//                m.fv = listReturned.size();
//                m.value = duration;
//                ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//            }
        }
    }
}
