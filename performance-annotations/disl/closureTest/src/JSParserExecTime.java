import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.annotation.ThreadLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by irenesjacob on 21.03.17.
 */
public class JSParserExecTime {
    @ThreadLocal
    static HashMap<String,ArrayList<Long>> cache;
    @SyntheticLocal
    static long entryTime;

    @Before(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.parsing.JsDocInfoParser.*", order = 1000)
    static void pushOnMethodEntry(MethodStaticContext methodStaticContext) {
        if(cache == null){
            cache = new HashMap<>();
        }
        String methodName = methodStaticContext.thisMethodName();
        ArrayList<Long> val;
        if (!cache.containsKey(methodName)){
            val = new ArrayList<>();
            cache.put(methodName,val);
        }
        entryTime = System.nanoTime();
    }

    @After(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.parsing.JsDocInfoParser.*", order = 1000)
    static void popOnMethodExit(MethodStaticContext methodStaticContext) {
        String methodName = methodStaticContext.thisMethodName();
//		System.out.println(methodName);
        ArrayList<Long> val;
        long duration = System.nanoTime() - entryTime;
        val = cache.get(methodName);
        if (val!=null){
            val.add(duration);
            cache.replace(methodName,val);
        }
    }
//	@After(marker = BodyMarker.class, scope = "com.google.javascript.jscomp.AbstractCommandLineRunner.run")
//	static void onEnd() {
//		for (String name: cache.keySet()) {
//			System.out.println(cache.get(name));
//		}
//	}
}
