import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import profiler.FeatureSearch;

/**
 * Created by irene on 10.05.17.
 */
public class FeatureValueCorrelation {

    @SyntheticLocal
    static long startTime;

    //    looks for interesting features using pcc
    @Before(marker = BodyMarker.class, scope="org.h2.engine.*.*")
    static void enteringMethod(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "org.h2.engine.*.*")
    static void exitingMethod(ArgumentProcessorContext proc, MethodStaticContext msc){
        // an example of value: execution time
        long duration = System.nanoTime() - startTime;
//                System.out.println("hello");
        Object[] method_args = proc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (method_args != null){
            FeatureSearch.searchForFeatures(method_args,msc.thisMethodFullName(),duration);
        }
    }
}
