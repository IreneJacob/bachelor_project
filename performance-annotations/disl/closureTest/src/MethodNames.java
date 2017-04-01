import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irenesjacob on 19.03.17.
 */
public class MethodNames {
	@After(marker = BodyMarker.class, scope = " com.google.javascript.jscomp.*.*")
	public static void onMethodExit(MethodStaticContext methodStaticContext){
		// print the methods with the interesting signatures
		if (methodStaticContext.thisMethodSignature() != null) {
			System.out.println( methodStaticContext.thisMethodFullName() + "\t\t" +  methodStaticContext.thisMethodSignature() );
		}
	}
}
