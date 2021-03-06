package profiler;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by irene on 12.05.17.
 */
public class Profiler {
    private static final ArrayList<Measurement> cache = new ArrayList<>();

    static {
        System.out.println("AAA");
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                PrintWriter out = new PrintWriter(new FileWriter("./logs/pcc/fromCodeArg1.dat", true));
                for (Measurement m: cache) {
                    if (m.ft == Measurement.FeatureType.FT_STRING){
                        out.println(m.fv + "\t" + m.value);
                    }
                }
                out.close();
            }catch (IOException e){
                System.out.println(" hook called. Failed to write");
            }
        }));
    }
    public static void addValue(final Measurement m){
        cache.add(m);
    }


}
