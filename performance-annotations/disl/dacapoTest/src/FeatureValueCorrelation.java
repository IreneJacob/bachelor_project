import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import org.h2.engine.Session;
import profiler.FeatureSearch;
import profiler.Measurement;
import profiler.ProfileExecutionTime;
import org.h2.table.Table;
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

    @Before(marker = BodyMarker.class, scope = "org.h2.expression.Function.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.h2.expression.Function.*")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        memory = Runtime.getRuntime().totalMemory();
        // duration = memory - Runtime.getRuntime().freeMemory();
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (arguments != null) {
            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, true);
            // for (int i = 0; i < arguments.length ; i++ ) {
            //     if (arguments[i] instanceof Session) {
            //        Session t = (Session) arguments[i];
            //        Measurement m = new Measurement();
            //        if (arguments != null){
            //            m.arg_idx = arguments.length;
            //        }else{
            //            m.arg_idx = 0;
            //        }
            //        m.ft = Measurement.FeatureType.FT_ARRAY;
            //        m.fv = t.getCurrentSchemaName().length();
            //        m.value = duration;
            //        ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
            //     }
            // }
        }
        //  Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
//
//          if (rec != null) {
//               if (rec instanceof Table) {
//                  // Node n = (Node)rec;
//                  Table t = (Table) rec;
//                  Measurement m = new Measurement();
//                  if (arguments != null){
//                      m.arg_idx = arguments.length;
//                  }else{
//                      m.arg_idx = 0;
//                  }
// //                 m.arg_idx = (Integer) arguments.length;
//                  // m.ft = Measurement.FeatureType.FT_RECEIVER;
//                  m.ft = Measurement.FeatureType.FT_RECEIVER;
//                  // m.fv = n.getChildCount();
//                  m.fv = t.getSQL().length();
//                  m.value = duration;
//  //                Profiler.addValue(m);
//                  ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//               }
//          }
    }
}
