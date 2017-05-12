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
    @Before(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.addChildrenAfter")
    static void startTimer(){
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope="com.google.javascript.rhino.Node.addChildrenAfter")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc){
        long duration = System.nanoTime() - time;
//        FIXME: This is confusing
        boolean precise = true; // if we have a precise method we are looking for, then we want to record the results and not check the values
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
         if (arguments != null) {
             FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration,precise);
         }
        Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
        if (rec != null) {
            if (rec instanceof Node) {
                Node n = (Node)rec;
                Measurement m = new Measurement();
                m.arg_idx = arguments.length;
                m.ft = Measurement.FeatureType.FT_OBJECTRETURNED;
                m.fv = n.getChildCount();
                m.value = duration;
                if (precise) {
//                    if (msc.thisMethodFullName() == "com.google.javascript.rhino.Node.addChildrenAfter"){
                        Profiler.addValue(m);
//                    }

                }else{
                    ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
                }
            }
        }
    }
}
