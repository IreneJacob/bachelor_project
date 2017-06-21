import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorMode;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;
import org.apache.lucene.index.CheckIndex;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.store.Directory;
import org.h2.command.dml.Query;
import org.h2.table.Table;
import profiler.*;


/**
 * Created by irenesjacob on 12.05.17.
 */
public class RecordResults {
    @SyntheticLocal
    static long time;

    @SyntheticLocal
    static long memory;

    // Before entering the method
    @Before(marker = BodyMarker.class, scope = "org.apache.lucene.analysis.Token.setTermBuffer")
    static void startTimer() {
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope = "org.apache.lucene.analysis.Token.setTermBuffer")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;

        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, false);
    }
}
