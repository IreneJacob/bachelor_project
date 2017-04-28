import Profiler.*;
import ch.usi.dag.disl.annotation.*;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.marker.Parameter;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.Scope;
import com.google.javascript.jscomp.parsing.parser.Parser;
import com.google.javascript.jscomp.parsing.parser.trees.ExpressionStatementTree;
import com.google.javascript.jscomp.parsing.parser.trees.ParseTree;
import com.google.javascript.jscomp.parsing.parser.trees.SwitchStatementTree;
import com.google.javascript.rhino.Node;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by irenesjacob on 17.03.17.
 * Example instrumentation class.
 */


public class DiSLClass {

    @SyntheticLocal
    static long entryTime;

    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.Parser.parse", order = 1000)
    public static void onMethodEntry(MethodStaticContext msc) {
        entryTime = System.nanoTime();
//        System.out.println(msc.thisMethodFullName());
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.Parser.parse", order = 1000)
    static void popOnMethodExit(MethodStaticContext msc, ArgumentProcessorContext apc) {
        try {
            String methodName = msc.thisMethodName();
            long duration = System.nanoTime() - entryTime;
//            String e = (String) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString();
            //            int feature = (int) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0];
//            Node node = (Node) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
//            feature = node.getChildCount();
//            System.out.println(e);
            ProfileData.addvalue("parse",Thread.currentThread(),duration);
//            Profiler.addFeatureValuePair(feature, duration);
        } catch (Exception e) {
            System.out.println("An error "+ " ( " + (e) + " ) " + "occurred");
        }

    }
}
