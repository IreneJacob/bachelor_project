import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

/**
 * Created by irene on 10.05.17.
 */
public class PopularMethods {

    @After(marker = BodyMarker.class, scope = "org.h2.index.*.*")
    static void afterMethodExit(MethodStaticContext msc){
//        BasicProfiler.addMethod(msc.thisMethodFullName());
    }
}
