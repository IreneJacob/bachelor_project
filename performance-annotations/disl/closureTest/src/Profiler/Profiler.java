package profiler;

import dataStructures.KeyValuePair;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

/**
 * Created by irene on 07.05.17.
 */
public class Profiler {

    private static final ArrayList<KeyValuePair> pairs = new ArrayList<>();
    private static final Path file = FileSystems.getDefault().getPath("./logs/pcc/","setInputID3.dat");
    private static PrintWriter out = null;
    static {
        try{
            out = new PrintWriter(Files.newBufferedWriter(file));
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    private Profiler(){/* Prevent instantiation */}

    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            if (out != null){
                out.close();
            }
        }));
    }

    public static void writeToFile(final int feature, final long duration){
        if (out != null){
            out.println(feature+ "\t" + duration);
        }
    }

    public static void writeStrFeat(final String feature, final long duration){
        if (out != null){
            out.println(feature.length()+ "\t" + duration);
        }
    }
}
