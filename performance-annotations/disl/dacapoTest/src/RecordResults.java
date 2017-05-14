import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
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

    // Before entering the method
    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.CommandLineRunner$Flags.splitPipeParts")
    static void startTimer(){
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope= "com.google.javascript.jscomp.CommandLineRunner$Flags.splitPipeParts")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc){
        long duration = System.nanoTime() - time;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
         if (arguments != null) {
            //  if (arguments[1] instanceof Node) {
            //      Node n = (Node)arguments[1];
            //      if (n != null) {
            //          Measurement m = new Measurement();
            //          m.arg_idx = arguments.length;
            //          m.ft = Measurement.FeatureType.FT_UNKNOWN;
            //          m.fv = n.getChildCount();
            //          m.value = duration;
            //          Profiler.addValue(m);
            //      }
            //  }
             FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, false);
            for (int i = 0; i < arguments.length ; i++ ) {
                // if (arguments[i] instanceof Node) {
                    // Node n = (Node)arguments[i];
                    // if (n != null) {
                        Measurement m = new Measurement();
                        m.arg_idx = arguments.length;
                        m.ft = Measurement.FeatureType.FT_UNKNOWN;
                        // m.fv = n.getChildCount();
                        m.fv = -1;
                        m.value = duration;
                        Profiler.addValue(m);
                    // }
                // }
            }
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
