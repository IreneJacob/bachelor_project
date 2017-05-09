import profiler.ProfileWithFeature;
import profiler.Profiler;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.dynamiccontext.DynamicContext;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.AbstractStaticContext;
import ch.usi.dag.disl.staticcontext.FieldAccessStaticContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.javascript.rhino.Node;

/**
 * Created by irenesjacob on 10.04.17.
 * This class allows us to access local variables in the method that we instrument
 */
public class BasicFeature extends AbstractStaticContext {
    @SyntheticLocal
    static long entryTime;

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.LineNumberTable.getSourcePosition", order = 1000)
    public static void onMethodEntry(MethodStaticContext msc) {
        entryTime = System.nanoTime();
//        System.out.println(msc.thisMethodFullName());
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.LineNumberTable.getSourcePosition", order = 1000)
    static void popOnMethodExit(MethodStaticContext msc, ArgumentProcessorContext apc,DynamicContext dc) {
        try {
            long duration = System.nanoTime() - entryTime;
            int feature = dc.getLocalVariableValue(0,java.lang.Integer.class);
//            System.out.println(feature);
//            Node node = (Node) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
//            feature = node.getChildCount();
            ProfileWithFeature.addFeatureValuePair(feature, duration);
        } catch (Exception e) {
            System.out.println("An error "+ " ( " + (e) + " ) " + "occurred");
        }

    }
}
