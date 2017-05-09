package profiler;

import ch.usi.dag.disl.annotation.ArgumentProcessor;
import ch.usi.dag.disl.processorcontext.ArgumentContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.lang.reflect.Array;
import java.util.Collection;

/**
 * Created by irene on 09.05.17.
 */
@ArgumentProcessor
public class ObjectArgumentProcessor {
    public static void printStringArgument(Object val, ArgumentContext ac, MethodStaticContext msc){
        ProfileExecutionTime.setMeasurementArgIndex(ac.getPosition());
        if (val instanceof String){
            ProfileExecutionTime.setMeasurementFeatureType(Measurement.FeatureType.FT_STRING);
            ProfileExecutionTime.setMeasurementFeatureValue((long) ((String) val).length());
//            BasicProfiler.addMethod(msc.thisMethodFullName());
        }else if (val instanceof Integer){
            ProfileExecutionTime.setMeasurementFeatureType(Measurement.FeatureType.FT_INT);
            ProfileExecutionTime.setMeasurementFeatureValue((long) ((Integer) val));
        }else if (val instanceof Collection){
            ProfileExecutionTime.setMeasurementFeatureType(Measurement.FeatureType.FT_COLLECTION);
            ProfileExecutionTime.setMeasurementFeatureValue((long) ((Collection) val).size());
        } else if (val.getClass().isArray()){
        ProfileExecutionTime.setMeasurementFeatureType(Measurement.FeatureType.FT_ARRAY);
        ProfileExecutionTime.setMeasurementFeatureValue((long) (Array.getLength(val)));
        } else{
            ProfileExecutionTime.setMeasurementFeatureType(Measurement.FeatureType.FT_UNKNOWN);
            ProfileExecutionTime.setMeasurementFeatureValue(0); //FIXME: What is the feature in this case?
        }
//        System.out.printf(
//                "method name: %s | arg pos: %d of %d \t| arg val: %s\n",
//                msc.thisMethodFullName(), ac.getPosition(), ac.getTotalCount(), val
//        );
    }
}
