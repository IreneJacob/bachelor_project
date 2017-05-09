package profiler;

import java.lang.reflect.Array;
import java.util.Collection;

/**
 * Created by irene on 09.05.17.
 */
public class FeatureSearch {

    public static void searchForFeatures(Object[] method_args, String methodName, long duration){
        if (method_args != null){
            for (int i = 0; i < method_args.length; i++ ) {
                if (method_args[i] != null){
                    Measurement m = new Measurement();
                    m.arg_idx = i;
                    m.value = duration;
                    findFeature(method_args[i],m);
                    ProfileExecutionTime.addValue(methodName,m);
                }
            }
        }

    }

    static Measurement findFeature(Object feature_value, Measurement measurement){
        if (feature_value instanceof String){
            measurement.ft = Measurement.FeatureType.FT_STRING;
            measurement.fv = (long) ((String) feature_value).length();
        }else if (feature_value instanceof Integer){
            measurement.ft = Measurement.FeatureType.FT_INT;
            measurement.fv = (long) ((Integer) feature_value);
        }else if (feature_value instanceof Collection){
            measurement.ft = Measurement.FeatureType.FT_COLLECTION;
            measurement.fv = (long) ((Collection) feature_value).size();
        } else if (feature_value.getClass().isArray()){
            measurement.ft = Measurement.FeatureType.FT_ARRAY;
            measurement.fv = (long) Array.getLength(feature_value);
        } else{
            measurement.ft = Measurement.FeatureType.FT_UNKNOWN;
            measurement.fv =0;//FIXME: What is the feature in this case?
        }
        return measurement;
    }
}
