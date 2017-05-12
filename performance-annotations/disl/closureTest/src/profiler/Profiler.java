package profiler;

import java.util.ArrayList;

/**
 * Created by irene on 12.05.17.
 */
public class Profiler {
    private static final ArrayList<Measurement> cache = new ArrayList<>();

    public static void addValue(final Measurement m){
        cache.add(m);
    }


}
