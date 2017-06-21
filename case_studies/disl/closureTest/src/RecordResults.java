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
 * Created by irenesjacob on 12.05.17.
 */
public class RecordResults {
    @SyntheticLocal
    static long time;

    // Before entering the method
    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.SourceFile.fromCode")
    static void startTimer(){
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope= "com.google.javascript.jscomp.SourceFile.fromCode")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc){
        long duration = System.nanoTime() - time;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
         if (arguments != null) {
            /*  The commented code below was used to pick one of the * string features in a method where there were multiple
            * parameters with the same feature type, and we wanted
            * to observe the parameters as seperate featurs */
            //  String s = (String)arguments[1];
            //      Measurement m = new Measurement();
            //      m.arg_idx = arguments.length;
            //      m.ft = Measurement.FeatureType.FT_STRING;
            //      m.fv = s.length();
            //      m.value = duration;
            //      Profiler.addValue(m);
             FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, false);
         }
        /*  The commented code below was used to collect data for
        * the setInputId method with its unique feature */
        // Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
        // if (rec != null) {
        //     if (rec instanceof Node) {
        //         Node n = (Node)rec;
        //         if (n != null) {
        //             Measurement m = new Measurement();
        //             m.arg_idx = arguments.length;
        //             m.ft = Measurement.FeatureType.FT_RECEIVER;
        //             m.fv = n.getChildCount();
        //             m.value = duration;
        //             Profiler.addValue(m);
        //         }
        //     }
        // }
    }
}
