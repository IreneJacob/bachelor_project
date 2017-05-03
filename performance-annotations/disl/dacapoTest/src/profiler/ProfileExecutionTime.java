package profiler;

import java.util.ArrayList;
import java.nio.file.Path;
import java.nio.file.FileSystems;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by irenesjacob on 30.04.17.
 */
public class ProfileExecutionTime {
   private ProfileExecutionTime(){/*Prevent instantiation*/}

     private static final ArrayList<Long> cache = new ArrayList<>();
     static {
         Runtime.getRuntime().addShutdownHook(new Thread(() -> {
             try{
                 final Path completed = FileSystems.getDefault().getPath("./h2","initDbObjectBase.dat");
                 PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                 for (Long val: cache) {
                         out.println(val);
                 }
                 out.close();
             }catch (IOException e){
                 System.out.println(" hook called. Failed to write");
             }
         }));
     }


     public static void addValue(final long value){
         cache.add(value);
         // value can be execution time, bytecode executed etc.
     }
}
