package profiler;

import com.google.javascript.rhino.Node;

import java.lang.reflect.Array;
import java.util.Collection;

/**
 * Created by irene on 09.05.17.
 */
public class FeatureSearch {

    public static void searchForFeatures(Object[] method_args, String methodName, long duration, boolean precise){
            for (int i = 0; i < method_args.length; i++ ) {
                if (method_args[i] != null){
                    Measurement m = new Measurement();
                    m.arg_idx = i;
                    m.value = duration;
                    findFeature(method_args[i],m);
                    if (precise) {
                        Profiler.addValue(m);
                    }else{
                        ProfileExecutionTime.addValue(methodName,m);
                    }


                }
            }
    }

//    public static void searchObjectForFeature(Object rec, String methodName, long duration){
//      if(rec != null){
//        if (rec instanceof Node) {
//      		Node n = (Node)rec;
//      		//
//      	 	Measurement m = new Measurement();
//      		m.arg_idx = -1;
//      		m.ft = Measurement.FeatureType.FT_NODEF1;
//      		m.fv = n.getChildCount();
//      		if (methodName.equals("com/google/javascript/rhino/Node.setInputId"))
//      			System.out.println("Node! " + m.fv);
//      		m.value = duration;
//      		ProfileExecutionTime.addValue(methodName, m);
//      	}
//      }
//    }

    static Measurement findFeature(Object feature_value, Measurement m){
        if (feature_value instanceof String){
            m.ft = Measurement.FeatureType.FT_STRING;
            m.fv = ((String) feature_value).length();
        }else if (feature_value instanceof Integer){
            m.ft = Measurement.FeatureType.FT_INT;
            m.fv = ((int) feature_value);
        }else if (feature_value instanceof Collection){
            m.ft = Measurement.FeatureType.FT_COLLECTION;
            m.fv = ((Collection) feature_value).size();
        } else if (feature_value.getClass().isArray()){
            m.ft = Measurement.FeatureType.FT_ARRAY;
            m.fv = Array.getLength(feature_value);
        } else{
            m.ft = Measurement.FeatureType.FT_UNKNOWN;
            m.fv = -1;//FIXME: What is the feature in this case?
        }
        return m;
    }
}
