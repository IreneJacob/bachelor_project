package profiler;

import ch.usi.dag.disl.annotation.ArgumentProcessor;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irenesjacob on 05.05.17.
 */
@ArgumentProcessor
public class StringArgumentProcessor {
    public static void printStringArgument(Object val, ArgumentContext ac, MethodStaticContext msc){
        if (val instanceof String){
            BasicProfiler.addMethod(msc.thisMethodFullName());
        }
//        System.out.printf(
//                "method name: %s | arg pos: %d of %d \t| arg val: %s\n",
//                msc.thisMethodFullName(), ac.getPosition(), ac.getTotalCount(), val
//        );
    }
}
