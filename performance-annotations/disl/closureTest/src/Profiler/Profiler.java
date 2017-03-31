package Profiler;

import DataStructures.Tuple;
import org.omg.SendingContext.RunTime;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by irenesjacob on 22.03.17.
 * Data from DiSLClass is logged to .dat files
 */
public final class Profiler {

    private Profiler(){/* Prevent instantiation */}

    private static final ArrayList<Tuple> pairs = new ArrayList<>();
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                final Path completed = FileSystems.getDefault().getPath("./logs","nodeSetScope.dat");
                PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                for (Tuple t: pairs){
                    out.println(t.x + "\t" + t.y);
                }
                out.close();
            }catch (IOException e){

                System.out.println(" hook called. Failed to write");
            }
        }));
    }

    public static void addFeatureValuePair(final String name, final Thread thread, final int feature, final long duration){
        Tuple<Integer,Long> tuple =  new Tuple<>(feature,duration);
        pairs.add(tuple);
    }
}
