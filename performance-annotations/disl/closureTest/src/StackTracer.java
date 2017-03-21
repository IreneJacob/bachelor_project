import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.ThreadLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.Stack;

/**
 * Created by irenesjacob on 19.03.17.
 */
public class StackTracer {
    @ThreadLocal
    static Stack<String> callStack;
    @Before(marker=BodyMarker.class, scope = " com.google.javascript.jscomp.parsing.JsDocInfoParser.*", order=1000)
    static void pushOnMethodEntry(MethodStaticContext msc) {
        if (callStack == null) { callStack = new Stack<String>(); }
        callStack.push(msc.thisMethodFullName());
    }
    @After(marker=BodyMarker.class, scope = " com.google.javascript.jscomp.parsing.JsDocInfoParser.*", order=1000)
    static void popOnMethodExit() {
        System.out.println(callStack.pop());
    }
}
