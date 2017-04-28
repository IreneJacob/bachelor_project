import Profiler.ProfileData;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irenesjacob on 19.03.17.
 */
public class MethodNames {
	@After(marker = BodyMarker.class, scope = " com.google.javascript.*.*.*")
	public static void onMethodExit(MethodStaticContext methodStaticContext,  ArgumentProcessorContext apc){
		Object[] args = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
		// print the methods with the interesting signatures
		if (args.length != 0) {
			ProfileData.addmethod(methodStaticContext.thisMethodFullName());
//			System.out.println( methodStaticContext.thisMethodFullName() + "\t" + "has " + args.length + " arguments.");
		}
	}
}