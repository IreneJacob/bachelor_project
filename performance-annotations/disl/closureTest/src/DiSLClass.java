import Profiler.*;
import ch.usi.dag.disl.annotation.*;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.javascript.rhino.Node;

/**
 * Created by irenesjacob on 17.03.17.
 * DISL CLASS
 */


public class DiSLClass {
    @SyntheticLocal
    static long entryTime;
//
    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.getInput", order = 1000)
    static void pushOnMethodEntry() {
        entryTime = System.nanoTime();
    }
//
//    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.getInput", order = 1000)
//    static void popOnMethodExit(MethodStaticContext methodStaticContext) {
//        String methodName = methodStaticContext.thisMethodName();
//        long duration = System.nanoTime() - entryTime;
//        Profiler.addvalue(methodName,Thread.currentThread(),duration);
//    }

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.*")
    public static void onMethodEntry(ArgumentProcessorContext apc) {
        apc.apply(IntArgumentPrinter.class, ArgumentProcessorMode.METHOD_ARGS);
    }

//    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.setScope")
//    public static void onMethodEntry(ArgumentProcessorContext argumentProcessorContext,MethodStaticContext msc) {
//        try {
////            argumentProcessorContext.apply(IntArgumentPrinter.class,ArgumentProcessorMode.METHOD_ARGS);
////                    System.out.println();
//            Node n = (Node) argumentProcessorContext.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0];
//            System.out.println(n.getChildCount());
//        } catch (Exception e) {
//            System.out.println("an error ( " + e + ") occured");
//        }
//    }
//    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.Compiler.setScope", order = 1000)
//    static void popOnMethodExit(MethodStaticContext methodStaticContext) {
//        String methodName = methodStaticContext.thisMethodName();
//        long duration = System.nanoTime() - entryTime;
//        Profiler.addvalue(methodName,Thread.currentThread(),duration);
//    }

}
