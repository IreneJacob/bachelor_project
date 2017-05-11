package profiler;

import java.util.ArrayList;
import java.nio.file.Path;
import java.nio.file.FileSystems;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import profiler.Measurement;

public class ProfileExecutionTime {
   private ProfileExecutionTime(){/*Prevent instantiation*/}
     private static double compute_best_pearson_coeff(String name) {
	ArrayList<Measurement> mm = cache.get(name);
	if (mm == null)
		return 0;
	int max_arg = 0;
	double max_cov = 0;
	double max_P = 0;
	int max_cov_idx;
	for (int cur_arg = 0; cur_arg <= max_arg; cur_arg++) {
		double arg_mean = 0;
		double measurement_mean = 0;
		double product_mean = 0;
		long cnt = 0;
		//Compute mean
		for (Measurement m: mm) {
			if (m.arg_idx > max_arg)
				max_arg = m.arg_idx;
			if (m.arg_idx == cur_arg) {
				if (m.ft != Measurement.FeatureType.FT_UNKNOWN) {
					arg_mean += m.fv;
					measurement_mean += m.value;
					product_mean += m.value * m.fv;
					cnt++;
				}
			}
		}
		if (cnt > 0) {
			arg_mean /= cnt;
			measurement_mean /= cnt;
			product_mean /= cnt;
		}
		// Compute covariance
		double cov = product_mean - arg_mean * measurement_mean;
		//Compute std_devs
		double arg_dev = 0;
		double val_dev = 0;
		cnt = 0;
		for (Measurement m: mm) {
			if (m.arg_idx == cur_arg) {
				if (m.ft != Measurement.FeatureType.FT_UNKNOWN) {
					cnt++;
					arg_dev += Math.pow(m.fv-arg_mean, 2);
					val_dev += Math.pow(m.value-measurement_mean, 2);
				}
			}
		}
		arg_dev /= cnt;
		val_dev /= cnt;
		arg_dev = Math.sqrt(arg_dev);
		val_dev = Math.sqrt(val_dev);
		double Pearson = cov / (arg_dev * val_dev);
		if (Math.abs(Pearson) > Math.abs(max_P)) {
			max_P = Pearson;
			max_cov_idx = cur_arg;
		}
	}
	return max_P;
     }

     private static double compute_best_arg_covariance(String name) {
	ArrayList<Measurement> mm = cache.get(name);
	int max_arg = 0;
	double max_cov = 0;
	int max_cov_idx;
	for (int cur_arg = 0; cur_arg <= max_arg; cur_arg++) {
		double arg_mean = 0;
		double measurement_mean = 0;
		double product_mean = 0;
		long cnt = 0;
		//Compute mean
		for (Measurement m: mm) {
			if (m.arg_idx > max_arg)
				max_arg = m.arg_idx;
			if (m.arg_idx == cur_arg) {
				if (m.ft != Measurement.FeatureType.FT_UNKNOWN) {
					arg_mean += m.fv;
					measurement_mean += m.value;
					product_mean += m.value * m.fv;
					cnt++;
				}
			}
		}
		if (cnt > 0) {
			arg_mean /= cnt;
			measurement_mean /= cnt;
			product_mean /= cnt;
		}
		// Compute covariance
		double cov = product_mean - arg_mean * measurement_mean;
		if (Math.abs(cov) > max_cov) {
			max_cov = cov;
			max_cov_idx = cur_arg;
		}
	}
	return max_cov;
     }

     private static long compute_variance(String name) {
	long mean = 0;
	int cnt = 0;
	long variance = 0;
	for (Measurement m: cache.get(name)) {
		if (m.ft != Measurement.FeatureType.FT_UNKNOWN) {
			mean += m.fv;
			cnt++;
		}
	}
	if (cnt > 0)
		mean /= cnt;
	for (Measurement m: cache.get(name)) {
		if (m.ft != Measurement.FeatureType.FT_UNKNOWN) {
			variance += (mean - m.fv) * (mean - m.fv);
		}
	}
	return variance;
     }

     private static void print_values(String pname) {
             try{
                 final Path completed = FileSystems.getDefault().getPath("./lucene","Values.dat");
                 PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
			for (Measurement m: cache.get(pname)) {
				out.println(m.arg_idx + " | " + m.ft + " | " + m.fv + ": " + m.value);
			}
                 out.close();
             }catch (IOException e){
                 System.out.println(" hook called. Failed to write");
             }
     }
    private static void print_feat_value_pair(String pname, Measurement.FeatureType featureType) {
        try{
            final Path completed = FileSystems.getDefault().getPath("./lucene","hasSeparateNorms.dat");
            PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
            for (Measurement m: cache.get(pname)) {
                if (m.ft.equals(featureType)){
                    out.println(m.fv + " \t " + m.value );
                }
            }
            out.close();
        }catch (IOException e){
            System.out.println(" hook called. Failed to write");
        }
    }
     private static final HashMap<String, ArrayList<Measurement>> cache = new HashMap<String, ArrayList<Measurement>>();
     private static Measurement measurement = new Measurement();

     public static void setMeasurementFeatureType(Measurement.FeatureType f){
         measurement.ft = f;
     }

     public static void setMeasurementValue(long v){
         measurement.value = v;
     }

     public static void setMeasurementFeatureValue(long f){
         measurement.fv = f;
     }

     public static void setMeasurementArgIndex(int i){
         measurement.arg_idx = i;
     }

     static {
     	System.out.println("AAA");
         Runtime.getRuntime().addShutdownHook(new Thread(() -> {
             try{
                 final Path completed = FileSystems.getDefault().getPath("./h2","Index.dat");
                 PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
		 for (String name: cache.keySet()) {
		 	double cov = compute_best_pearson_coeff(name);
			out.println(name + ": " + cov);
		 }
//		 print_values("org/apache/lucene/index/LogMergePolicy.findMergesForOptimize");
//		 print_feat_value_pair("org/apache/lucene/index/SegmentInfo.hasSeparateNorms", Measurement.FeatureType.FT_COLLECTION);
		 //print_values("org/apache/lucene/index/DocumentsWriter.recycleCharBlocks");
		 //print_values("org/apache/lucene/index/TermsHash.recyclePostings");
                 out.close();
             }catch (IOException e){
                 System.out.println(" hook called. Failed to write");
             }
         }));
     }

     public static void addMethod(final String name){
         addValue(name, measurement);
     }

     public static void addValue(final String name, final Measurement m){
        if (!cache.containsKey(name))
		cache.put(name, new ArrayList<Measurement>());	
	cache.get(name).add(m);
	 
         // value can be execution time, bytecode executed etc.
     }
}
