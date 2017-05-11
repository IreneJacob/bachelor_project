import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.javascript.rhino.Node;
import profiler.Profiler;

import java.util.Collection;

/**
 * Created by irene on 10.05.17.
 */
public class DiSLClass {
    @SyntheticLocal
    static long startTime;

    // to write feature and value pair to .dat file
    @Before(marker = BodyMarker.class, scope="com.google.javascript.rhino.Node.setInputId")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.rhino.Node.setInputId")
    static void onMethodExit(ArgumentProcessorContext proc, MethodStaticContext msc){
        // an example of value: execution time
        long duration = System.nanoTime() - startTime;
        int feature = ((Node)proc.getReceiver(ArgumentProcessorMode.METHOD_ARGS)).getChildCount();
//        ImmutableList<JSType> templateValues = (ImmutableList<JSType>) proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
//        int feature = 0;
//        System.out.println(templateValues.size());
//        for (JSType j: templateValues) {
//            feature += j.toString().length();
////            System.out.println(feature);
//        }
//        int feature = templateValues.size();
//        int feature = ((Collection)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1]).size();
//          int feature = (int)proc.getArgs(ArgumentProcessorMode.METHOD_ARG)[0];
        Profiler.writeToFile(feature,duration);
    }
}
