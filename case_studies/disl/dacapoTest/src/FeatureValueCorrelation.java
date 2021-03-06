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
import org.h2.message.TraceSystem;
import profiler.Profiler;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.lang.reflect.Array;
import java.util.*;
import java.util.logging.Logger;
//import profiler.Profiler;

/**
 * Created by irene on 10.05.17.
 */
public class FeatureValueCorrelation {
    @SyntheticLocal
    static long time;

    @Before(marker = BodyMarker.class, scope = "org.h2.index.*.*")
    static void pushOnMethodEntry() {
        time = System.nanoTime();
    }


    @After(marker = BodyMarker.class, scope = "org.h2.index.*.*")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (arguments != null) {
            FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, true);
        }
    }
}
