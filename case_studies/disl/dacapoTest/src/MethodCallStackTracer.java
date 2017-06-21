import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.annotation.ThreadLocal;
import java.util.Stack;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import profiler.IntArgumentProcessor;

public class MethodCallStackTracer {
    @ThreadLocal
    static Stack<String> callStack;

    @Before(marker=BodyMarker.class, scope="org.dacapo.luindex.*.*")
    static void pushOnMethodEntry(MethodStaticContext msc){
        System.out.println(msc.thisMethodFullName());
        if (callStack==null) {
            callStack = new Stack<String>();
        }
        callStack.push(msc.thisMethodFullName());
    }

    @After(marker=BodyMarker.class, scope="org.dacapo.luindex.*.*")
    static void popOnMethodExit(ArgumentProcessorContext apc){
        callStack.pop();
    }
}
