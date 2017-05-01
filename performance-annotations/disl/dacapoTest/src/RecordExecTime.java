import profiler.ProfileExecutionTime;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;


/**
 * Created by irenesjacob on 30.04.17.
 */
public class RecordExecTime {

    @SyntheticLocal
    static long time;

    @Before(marker=BodyMarker.class, scope="org.dacapo.luindex.Index.<init>")
    static void pushOnMethodEntry(){
//        System.out.println(msc.thisMethodFullName());
        time = System.nanoTime();
    }

    @After(marker=BodyMarker.class, scope="org.dacapo.luindex.Index.<init>")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc){
        long duration = System.nanoTime() - time;
//        int feature = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].;
//        System.out.println(apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString());
//         System.out.println(System.nanoTime() - time);
        ProfileExecutionTime.addValue(duration);
//         ProfileExecutionTime.addValue(duration,Thread.currentThread());
    }
}
