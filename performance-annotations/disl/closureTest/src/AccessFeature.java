import Profiler.Profiler;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.javascript.rhino.Node;

/**
 * Created by irenesjacob on 30.03.17.
 */
public class AccessFeature {

    @SyntheticLocal
    static long entryTime;

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.getInput", order = 1000)
    static void pushOnMethodEntry() {
        entryTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.setScope")
    public static void onMethodExit(ArgumentProcessorContext argumentProcessorContext,MethodStaticContext msc) {
        try {
            Node n = (Node) argumentProcessorContext.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0];
            String methodName = msc.thisMethodName();
            long duration = System.nanoTime() - entryTime;
            Profiler.addFeatureValuePair(methodName,Thread.currentThread(),n.getChildCount(),duration);
        } catch (Exception e) {
            System.out.println("an error ( " + e + ") occurred");
        }
    }
}
