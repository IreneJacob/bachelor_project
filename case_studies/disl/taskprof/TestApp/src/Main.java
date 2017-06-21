import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class Main {
    public Main() {
    }

    public static AtomicInteger toggle = new AtomicInteger(0);

    public static void main(String[] args) {
        ExecutorService ex = Executors.newFixedThreadPool(4);

        ex.execute(() -> System.out.println("Hello lambda 2"));
        ex.execute(() -> System.out.println("Hello lambda 3"));
        ex.execute(() -> System.out.println("Hello lambda 4"));
        ex.execute(() -> System.out.println("Hello lambda 5"));
        ex.execute(() -> System.out.println("Hello lambda 6"));
        ex.execute(() -> System.out.println("Hello lambda 7"));
        ex.execute(() -> System.out.println("Hello lambda 8"));
        ex.execute(() -> System.out.println("Hello lambda 9"));

        ex.shutdown();
    }

}
