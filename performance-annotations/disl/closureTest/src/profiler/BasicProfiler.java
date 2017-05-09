package profiler;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by irenesjacob on 05.05.17.
 *
 * In this class, we store the name of the instrumented method and the number of times this method is called and then
 * output the ten most commonly called method names and the number of times they were called.
 */
public class BasicProfiler {
    private static final Map<String,Integer> map = new HashMap<>();
    private static int count = 0;
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try{
                final Path completed = FileSystems.getDefault().getPath("./logs/pcc","top_500_methods.txt");
                PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                Map<String, Integer> sortedMap = sortByValue(map);
                Set set = sortedMap.entrySet();
                Iterator it = set.iterator();

//                http://beginnersbook.com/2013/12/how-to-sort-hashmap-in-java-by-keys-and-values/
                while(it.hasNext() && count < 500){
                    Map.Entry mapEntry = (Map.Entry)it.next();
                    out.printf("%s %8s\n", mapEntry.getKey().toString(),mapEntry.getValue().toString());
//                    out.print(mapEntry.getKey() + "\t\t\t");
//                    out.println(mapEntry.getValue());
                    count++;
                }
                out.close();
            }catch (IOException e){
                System.out.println(" hook called. Failed to write");
            }
        }));
    }

//    sort map by value (http://stackoverflow.com/questions/109383/sort-a-mapkey-value-by-values-java)
    private static Map<String,Integer> sortByValue(Map<String,Integer> m){
        return m.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Collections.reverseOrder()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }


//    add method name and update count
    public static void addMethod(final String name){
        if (!map.containsKey(name)){
            map.put(name,1);
        }else{
            map.replace(name,map.get(name)+1);
        }
    }
}
