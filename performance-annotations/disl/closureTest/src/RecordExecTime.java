import profiler.ProfileExecutionTime;
import profiler.Measurement;
import java.util.Arrays;
import java.util.Collection;
import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.processorcontext.ArgumentProcessorContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import com.google.javascript.rhino.Node;

public class RecordExecTime {

    @SyntheticLocal
    static long time;
    @SyntheticLocal
    static long memory;


    @Before(marker=BodyMarker.class, scope="com.google.javascript.rhino.Node.*")
    static void pushOnMethodEntry(){
        time = System.nanoTime();
    	//Runtime r = Runtime.getRuntime();
	//memory = r.freeMemory();
    }


    @After(marker=BodyMarker.class, scope="com.google.javascript.rhino.Node.*")
    //@After(marker=BodyMarker.class, scope="org.h2.result.Row.getValue")
    static void popOnMethodExit(ArgumentProcessorContext apc, MethodStaticContext msc){
    	//Runtime r = Runtime.getRuntime();
        //long umem = memory - r.freeMemory();
	long duration = System.nanoTime() - time;
//        int feature = apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].;
//        System.out.println(apc.getArgs(ArgumentProcessorMode.METHOD_ARGS)[0].toString());
         //System.out.println("Duration: " + duration);
	 Object[] arguments = apc.getArgs(ch.usi.dag.disl.processorcontext.ArgumentProcessorMode.METHOD_ARGS);
	 int a;
	 for (a = 0; a < arguments.length; a++) {
	 	Measurement m = new Measurement();
		m.arg_idx = a;
		if (arguments[a] instanceof Integer) {
			//System.out.println("Arg " + a + " : int");
			m.ft = Measurement.FeatureType.FT_INT;
			m.fv = (int)arguments[a];
			//m.value = umem;
			m.value = duration;
        	}
		else if (arguments[a] instanceof String) {
			m.ft = Measurement.FeatureType.FT_STRING;
			m.fv = ((String)arguments[a]).length();
			//m.value = umem;
			m.value = duration;
        	}
		else if (arguments[a] instanceof Collection) {
			m.ft = Measurement.FeatureType.FT_COLLECTION;
			m.fv = ((Collection)arguments[a]).size();
			//m.value = umem;
			m.value = duration;
        	}
		else if (arguments[a] instanceof Arrays) {
			m.ft = Measurement.FeatureType.FT_ARRAY;
			m.fv = 1;//((Arrays)arguments[a]).length;
			//m.value = umem;
			m.value = duration;
        	}
		else {
			//System.out.println("Arg " + a + " : unk");
			m.ft = Measurement.FeatureType.FT_UNKNOWN;
			m.fv = -1;
			//m.value = umem;
			m.value = duration;
		}
		ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
	}
	Object rec = apc.getReceiver(ch.usi.dag.disl.processorcontext.ArgumentProcessorMode.METHOD_ARGS);
	if (rec instanceof Node) {
		Node n = (Node)rec;
		//
	 	Measurement m = new Measurement();
		m.arg_idx = a;
		m.ft = Measurement.FeatureType.FT_NODEF1;
		m.fv = n.getChildCount();
		if (msc.thisMethodFullName().equals("com/google/javascript/rhino/Node.setInputId"))
			System.out.println("Node! " + m.fv);
		m.value = duration;
		m.value = duration;
		ProfileExecutionTime.addValue(msc.thisMethodFullName(), m);
	}
    }
}
