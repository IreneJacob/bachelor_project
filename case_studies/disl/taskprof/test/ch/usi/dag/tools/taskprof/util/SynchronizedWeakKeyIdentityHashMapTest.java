package ch.usi.dag.tools.taskprof.util;

import org.junit.Test;

import java.lang.ref.WeakReference;
import java.util.Arrays;
import java.util.function.Function;

import static org.junit.Assert.*;

public final class SynchronizedWeakKeyIdentityHashMapTest {
    @Test
    public void putIfAbsent() throws Exception {
        final SynchronizedWeakKeyIdentityHashMap<String, Integer> map = new SynchronizedWeakKeyIdentityHashMap<>(16);

        map.putIfAbsent("c", 3);
        map.putIfAbsent("c", 2);

        final Integer res = map.get("c");
        assertNotNull(res);
        assertEquals(res.intValue(), 3);
    }

    @Test
    public void get() throws Exception {
        final SynchronizedWeakKeyIdentityHashMap<String, Integer> map = new SynchronizedWeakKeyIdentityHashMap<>(16);

        map.putIfAbsent("a", 1);
        map.putIfAbsent("b", 2);
        map.putIfAbsent("c", 3);
        map.putIfAbsent("d", 4);

        final Integer a = map.get("a");
        final Integer b = map.get("b");
        final Integer c = map.get("c");
        final Integer d = map.get("d");
        final Integer e = map.get("e");

        assertNotNull(a);
        assertEquals(a.intValue(), 1);
        assertNotNull(b);
        assertEquals(b.intValue(), 2);
        assertNotNull(c);
        assertEquals(c.intValue(), 3);
        assertNotNull(d);
        assertEquals(d.intValue(), 4);
        assertNull(e);
    }

    @Test
    public void computeIfAbsent() throws Exception {
        final SynchronizedWeakKeyIdentityHashMap<String, Integer> map = new SynchronizedWeakKeyIdentityHashMap<>(16);

        final Integer a1 = map.computeIfAbsent("a", (k) -> 1);
        final Integer a2 = map.get("a");

        assertNotNull(a1);
        assertNotNull(a2);
        assertEquals(a1, a2);
        assertEquals(a1.intValue(), 1);
    }

    @Test
    public void values() throws Exception {
        final SynchronizedWeakKeyIdentityHashMap<String, Integer> map = new SynchronizedWeakKeyIdentityHashMap<>(16);

        map.putIfAbsent("a", 1);
        map.putIfAbsent("b", 2);
        map.putIfAbsent("c", 3);
        map.putIfAbsent("d", 4);

        final Object[] values = map.values();
        Arrays.sort(values);

        assertTrue(Arrays.binarySearch(values, 1) >= 0);
        assertTrue(Arrays.binarySearch(values, 2) >= 0);
        assertTrue(Arrays.binarySearch(values, 3) >= 0);
        assertTrue(Arrays.binarySearch(values, 4) >= 0);
        assertTrue(Arrays.binarySearch(values, 5) < 0);
    }
}
