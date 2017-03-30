package Profiler;

import ch.usi.dag.disl.annotation.ArgumentProcessor;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irenesjacob on 29.03.17.
 */
@ArgumentProcessor
public class IntArgumentPrinter {
    public static void printIntegerArgument (
            int val, ArgumentContext ac, MethodStaticContext msc) {
        System.out.printf(
                "Int argument value in method %s at position %d of %d is %d\n",
                msc.thisMethodFullName(), ac.getPosition(), ac.getTotalCount(), val
        );
    }
}