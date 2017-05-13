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
//                final Path completed = FileSystems.getDefault().getPath("./logs/pcc","addChildrenAfter.dat");
//                PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                PrintWriter out = new PrintWriter(new FileWriter("./logs/pcc/removeFirstChildRECEIVER.dat", true));
                for (Measurement m: cache) {
                    if (m.ft == Measurement.FeatureType.FT_RECEIVER){
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
