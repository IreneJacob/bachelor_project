import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.marker.BodyMarker;

/**
 * Created by irenesjacob on 19.03.17.
 */
public class LocalVariables {

     @SyntheticLocal
     static long entryTime;

     @Before(marker=BodyMarker.class, scope = "com.google.javascript.jscomp.AbstractCommandLineRunner.*")
     static void onMethodEntry() {
     	entryTime = System.nanoTime();
     }

     @After(marker=BodyMarker.class, scope = "com.google.javascript.jscomp.AbstractCommandLineRunner.*")
     static void onMethodExit() {
     	System.out.println("Method duration " + (System.nanoTime()- entryTime));
     }

}
