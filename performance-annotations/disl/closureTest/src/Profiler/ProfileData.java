package profiler;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by irenesjacob on 31.03.17.
 */
public class ProfileData {

    private ProfileData(){/* Prevent instantiation */}

    private static final HashMap<String,ArrayList<Long>> cache = new HashMap<>();
    private static final Set<String> methods = new HashSet<>();
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                final Path completed = FileSystems.getDefault().getPath("./","methods.txt");
//                System.out.println("Shutdown hook called successfully");
                PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                for (String name: methods) {
                        out.println(name);
//                    for (long val: cache.get(name)) {
//                        out.printf(val + "\n");
//                    }
                    out.println('\n');

                }
                out.close();
            }catch (IOException e){
                System.out.println(" hook called. Failed to write");
            }
        }));
    }

    /*
    * This function adds just one value to the hashmap based on the name of the method, and can be used to plot the data
    * without and features on the x-axis.
    * */
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

    public static void addmethod(final String name){
        methods.add(name);
    }
}


