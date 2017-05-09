import profiler.ProfileData;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irenesjacob on 28.03.17.
 */
public class ExecutionTimeLogger {
    @SyntheticLocal
    static long entryTime;

    @Before(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.Compiler.*", order = 1000)
    static void pushOnMethodEntry() {
        entryTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.Compiler.*", order = 1000)
    static void popOnMethodExit(MethodStaticContext methodStaticContext) {
        String methodName = methodStaticContext.thisMethodName();
        long duration = System.nanoTime() - entryTime;
        ProfileData.addvalue(methodName,Thread.currentThread(),duration);
    }
}
