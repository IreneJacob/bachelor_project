import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import org.h2.table.Table;
import profiler.FeatureSearch;
import profiler.Measurement;
import profiler.ProfileExecutionTime;
import profiler.Profiler;


/**
 * Created by irenesjacob on 12.05.17.
 */
public class RecordResults {
    @SyntheticLocal
    static long time;

    @SyntheticLocal
    static long memory;
    // Before entering the method
    @Before(marker = BodyMarker.class, scope = "org.h2.util.SmallLRUCache.newInstance")
    static void startTimer(){
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope= "org.h2.util.SmallLRUCache.newInstance")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc){
        // long duration = System.nanoTime() - time;
        memory = Runtime.getRuntime().totalMemory();
        long duration = memory - Runtime.getRuntime().freeMemory();
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
         if (arguments != null) {
            //  Measurement m = new Measurement();
            //  m.arg_idx = 1;
            //  m.ft = Measurement.FeatureType.FT_INT;
            // //  m.fv = ((String) arguments[1]).length();
            //  m.fv = (int)arguments[1];
            //  m.value = duration;
            //  Profiler.addValue(m);

             FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, false);
            // for (int i = 0; i < arguments.length ; i++ ) {
            //     if (arguments[i] instanceof Table) {
            //        Table t = (Table) arguments[i];
            //        Measurement m = new Measurement();
            //        if (arguments != null){
            //            m.arg_idx = arguments.length;
            //        }else{
            //            m.arg_idx = 0;
            //        }
            //        m.ft = Measurement.FeatureType.FT_ARRAY;
            //        m.fv = t.getSQL().length();
            //        m.value = duration;
            //        Profiler.addValue(m);
            //     //    ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
            //     }
            // }
         }
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
        if (rec != null) {
            // if (rec instanceof Node) {
                // Node n = (Node)rec;
                // if (n != null) {
                    Measurement m = new Measurement();
                    m.arg_idx = arguments.length;
                    m.ft = Measurement.FeatureType.FT_RECEIVER;
                    // m.fv = n.getChildCount();
                    m.fv = -1;
                    m.value = duration;
                    Profiler.addValue(m);
                // }
            // }
        }
    }
}
