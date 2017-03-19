import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.annotation.ThreadLocal;
import ch.usi.dag.disl.marker.AbstractMarker;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.Stack;

/**
 * Created by irenesjacob on 17.03.17.
 * a SimpleProfiler
 */
public class DiSLClass {
    // @Before(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.CommandLineRunner.*")
	// public static void beforemain() {
	// 	System.out.println("Instrumentation: Before method main");
	// }

	// @SyntheticLocal
	// static long entryTime;
	//
	// @Before(marker=BodyMarker.class, scope = "com.google.javascript.jscomp.AbstractCommandLineRunner.*")
	// static void onMethodEntry() {
	// 	entryTime = System.nanoTime();
	// }
	//
	// @After(marker=BodyMarker.class, scope = "com.google.javascript.jscomp.AbstractCommandLineRunner.*")
	// static void onMethodExit() {
	// 	System.out.println("Method duration " + (System.nanoTime()- entryTime));
	// }

//	@After(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.parsing.JsDocInfoParser.*")
//	public static void onMethodExit(MethodStaticContext methodStaticContext){
//		// print the methods with the interesting signatures
//		if (methodStaticContext.thisMethodSignature() != null) {
//			System.out.println( methodStaticContext.thisMethodFullName() + "\t\t" +  methodStaticContext.thisMethodSignature() );
//		}
//	}

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
