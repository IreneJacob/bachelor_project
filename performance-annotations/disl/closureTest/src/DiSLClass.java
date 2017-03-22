import Profiler.Profiler;
import ch.usi.dag.disl.annotation.*;
import ch.usi.dag.disl.annotation.ThreadLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by irenesjacob on 17.03.17.
 * DISL CLASS
 */


public class DiSLClass {
	@ThreadLocal
	static HashMap<String,ArrayList<Long>> cache;
	@SyntheticLocal
	static long entryTime;


	@Before(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.Compiler.*", order = 1000)
	static void pushOnMethodEntry(MethodStaticContext methodStaticContext) {
		entryTime = System.nanoTime();
	}

	@After(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.Compiler.*", order = 1000)
	static void popOnMethodExit(MethodStaticContext methodStaticContext) {
		String methodName = methodStaticContext.thisMethodName();
		long duration = System.nanoTime() - entryTime;
		if (duration > 1000){
			Profiler.addvalue(methodName,Thread.currentThread(),duration);
		}
	}
}
