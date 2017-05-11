package profiler;

public class Measurement {
	public enum FeatureType {
		FT_INT,
		FT_STRING,
		FT_COLLECTION,
		FT_ARRAY,
		FT_NODEF1,
		FT_UNKNOWN
	};

	public long value;
	public FeatureType ft;
	public long fv;
	public int arg_idx;
}
