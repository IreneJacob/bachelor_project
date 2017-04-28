import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.marker.BodyMarker;

/**
 * Created by irenesjacob on 19.03.17.
 */
public class HelloWorld {
     @Before(marker = BodyMarker.class, scope = "*.*")
     public static void beforemain() {
     	System.out.println("Instrumentation: Before method main");
     }
}
