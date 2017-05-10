import com.google.javascript.rhino.jstype.JSType;
import profiler.*;
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
import java.util.Collection;
import java.util.List;

/**
 * Created by irenesjacob on 17.03.17.
 * Example instrumentation class.
 */


public class DiSLClass {

    @SyntheticLocal
    static long startTime;
/*
    //    finding most called methods
    @After(marker = BodyMarker.class, scope = "com.google.javascript.rhino.*.*")
    static void afterMethodExit(MethodStaticContext msc){
        BasicProfiler.addMethod(msc.thisMethodFullName());
    }

*/

///*
    //    looks for interesting features using pcc
    @Before(marker = BodyMarker.class, scope="com.google.javascript.jscomp.*.*")
    static void enteringMethod(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.*.*")
    static void exitingMethod(ArgumentProcessorContext proc, MethodStaticContext msc){
        // an example of value: execution time
        long duration = System.nanoTime() - startTime;
//                System.out.println("hello");
        Object[] method_args = proc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (method_args != null){
            FeatureSearch.searchForFeatures(method_args,msc.thisMethodFullName(),duration);
        }
    }

//    */


    /*
    // to write feature and value pair to .dat file
    @Before(marker = BodyMarker.class, scope="com.google.javascript.rhino.jstype.TemplateTypeMap.<init>")
    static void onMethodEntry(){
        startTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = "com.google.javascript.rhino.jstype.TemplateTypeMap.<init>")
    static void onMethodExit(ArgumentProcessorContext proc, MethodStaticContext msc){
        // an example of value: execution time
        long duration = System.nanoTime() - startTime;
//        ImmutableList<JSType> templateValues = (ImmutableList<JSType>) proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
//        int feature = 0;
//        System.out.println(templateValues.size());
//        for (JSType j: templateValues) {
//            feature += j.toString().length();
////            System.out.println(feature);
//        }
//        int feature = templateValues.size();
        int feature = ((Collection)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1]).size();
//          int feature = (int)proc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0];
        Profiler.writeToFile(feature,duration);
    }
 */


//
//
//
//      PAST VERSION
//
//
//
//    @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.Parser.parse", order = 1000)
//    public static void onMethodEntry(MethodStaticContext msc) {
//        entryTime = System.nanoTime();
////        System.out.println(msc.thisMethodFullName());
//    }
//
//    @After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.parsing.parser.Parser.parse", order = 1000)
//    static void popOnMethodExit(MethodStaticContext msc, ArgumentProcessorContext apc) {
//        try {
//            String methodName = msc.thisMethodName();
//            long duration = System.nanoTime() - entryTime;
////            String e = (String) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString();
//            //            int feature = (int) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0];
////            Node node = (Node) apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[1];
////            feature = node.getChildCount();
////            System.out.println(e);
////            ProfileData.addvalue("parse",Thread.currentThread(),duration);
////            ProfileWithFeature.addFeatureValuePair(feature, duration);
//        } catch (Exception e) {
//            System.out.println("An error "+ " ( " + (e) + " ) " + "occurred");
//        }
//
//    }
}
