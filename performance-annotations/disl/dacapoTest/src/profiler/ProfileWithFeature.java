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

    private static final ArrayList<KeyValuePair> pairs = new ArrayList<>();

    private ProfileWithFeature(){/* Prevent instantiation */}

    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                final Path file = FileSystems.getDefault().getPath("./lucene","message.dat");
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

    public static void addStringFeatureAndValue(final String feature, final long duration){
        int strlen = feature.length();
        KeyValuePair<Integer,Long> keyValuePair =  new KeyValuePair<>(strlen,duration);
        pairs.add(keyValuePair);
    }

    public static void addFeatureValuePair(final int feature, final long duration){
        KeyValuePair<Integer,Long> keyValuePair =  new KeyValuePair<>(feature,duration);
        pairs.add(keyValuePair);
    }
}
