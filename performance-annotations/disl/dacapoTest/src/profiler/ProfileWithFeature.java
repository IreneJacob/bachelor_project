package profiler;

import dataStructures.KeyValuePair;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

/**
 * Created by irenesjacob on 03.05.17.
 */
public class ProfileWithFeature {
    private ProfileWithFeature(){/* Prevent instantiation */}

    private static final ArrayList<KeyValuePair> pairs = new ArrayList<>();
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                final Path file = FileSystems.getDefault().getPath("./sunflow/","WaldTriangleIntersect.dat");
                PrintWriter out = new PrintWriter(Files.newBufferedWriter(file));
//                System.out.println("reaches here");
                for (KeyValuePair tuple: pairs){
                    out.println(tuple.getKey() + "\t" + tuple.getValue());
                }
                out.close();
            }catch (IOException e){
                System.out.println(" hook called. Failed to write");
            }
        }));
    }

    public static void addFeatureValuePair(final int feature, final long duration){
        KeyValuePair<Integer,Long> keyValuePair =  new KeyValuePair<>(feature,duration);
        pairs.add(keyValuePair);
    }
}
