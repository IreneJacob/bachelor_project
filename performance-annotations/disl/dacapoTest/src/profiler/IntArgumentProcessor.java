package profiler;

import ch.usi.dag.disl.annotation.ArgumentProcessor;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi. dag. disl.staticcontext.MethodStaticContext;

@ArgumentProcessor
public class IntArgumentProcessor{
    public static void printIntegerArgument(int val, ArgumentContext ac, MethodStaticContext msc){
        BasicProfiler.addMethod(msc.thisMethodFullName());
//        System.out.printf(
//        "method name: %s | arg pos: %d of %d \t| arg val: %d\n",
//        msc.thisMethodFullName(), ac.getPosition(), ac.getTotalCount(), val
//        );
    }
}
