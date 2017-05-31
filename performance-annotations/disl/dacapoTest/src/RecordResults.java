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
    @Before(marker = BodyMarker.class, scope = "org.sunflow.core.accel.KDTree$BuildTask.<init>")
    static void startTimer() {
        time = System.nanoTime();
    }

    // After exiting the method
    @After(marker = BodyMarker.class, scope = "org.sunflow.core.accel.KDTree$BuildTask.<init>")
    static void recordFeatureValuePair(ArgumentProcessorContext apc, MethodStaticContext msc) {
        long duration = System.nanoTime() - time;
        // memory = Runtime.getRuntime().totalMemory();
        // long duration = memory - Runtime.getRuntime().freeMemory();
        Object[] arguments = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS);
        if (arguments != null) {
             Measurement m = new Measurement();
             m.arg_idx = 0;
             m.ft = Measurement.FeatureType.FT_INT;
            //  m.fv = ((String) arguments[1]).length();
            if (arguments[0] instanceof Integer) {
                m.fv = (int)(arguments[0]);
            }else{
                m.fv = (int)((float)arguments[0]);
            }
            //  m.fv = (int)(arguments[0]);
             m.value = duration;
             Profiler.addValue(m);
        //    Directory d = (Directory) arguments[0];
        //    int feature = d.

//            ProfileWithFeature.addFeatureValuePair((int)arguments[2],duration);
            //  FeatureSearch.searchForFeatures(arguments, msc.thisMethodFullName(), duration, false);
//             for (int i = 0; i < arguments.length ; i./++ ) {
//                 if (arguments[i] instanceof IndexWriter) {
//                    IndexWriter t = (IndexWriter) arguments[i];
//                    Measurement m = new Measurement();
//                    if (arguments != null){
//                        m.arg_idx = arguments.length;
//                    }else{
//                        m.arg_idx = 0;
//                    }
//                    m.ft = Measurement.FeatureType.FT_ARRAY;
//                    m.fv = t.getMaxFieldLength();
//                    m.value = duration;
//                    Profiler.addValue(m);
//                 //    ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
//                 }
//             }
//         }
//            Object rec = apc.getReceiver(ArgumentProcessorMode.METHOD_ARGS);
//            System.out.println(rec.getClass());
//            if (rec != null) {
//                if (rec instanceof CheckIndex.Status.SegmentInfoStatus) {
//                    CheckIndex.Status.SegmentInfoStatus t = (CheckIndex.Status.SegmentInfoStatus) rec;
//                    if (t != null) {
//                        // if (rec instanceof Node) {
//                        // Node n = (Node)rec;
//                        // if (n != null) {
//                        Measurement m = new Measurement();
//                        m.arg_idx = arguments.length;
//                        m.ft = Measurement.FeatureType.FT_RECEIVER;
//                        // m.fv = n.getChildCount();
//                        m.fv = t.numFiles;
//                        m.value = duration;
//                        Profiler.addValue(m);
//                    }
//                }
//            }
        }
    }
}
