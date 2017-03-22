package Profiler;

import org.omg.SendingContext.RunTime;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by irenesjacob on 22.03.17.
 */
public final class Profiler {

    private Profiler(){/* Prevent instantiation */}

    private static final HashMap<String,ArrayList<Long>> cache = new HashMap<>();

    static {
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                try{
                    final Path completed = FileSystems.getDefault().getPath(".","tasks.txt");
                    PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                    for (String name: cache.keySet()) {
                        out.println(name);
                        for (long val: cache.get(name)) {
                            out.printf(val + "\t");
                        }
                        out.println('\n');

                    }
//                    out.println("Shutdown hook called successfully");
                    out.close();
                }catch (IOException e){
                    System.out.println(" hook called. Failed to write");
                }


            }});
    }

    public static void addvalue(final String name, final Thread thread, final long duration){
        ArrayList<Long> val;
        if (!cache.containsKey(name)){
            val = new ArrayList<>();
            val.add(duration);
            cache.put(name,val);
        }else{
            val = cache.get(name);
            val.add(duration);
            cache.replace(name,val);
        }
    }

}
