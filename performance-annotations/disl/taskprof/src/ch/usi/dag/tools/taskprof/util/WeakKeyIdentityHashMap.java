package ch.usi.dag.tools.taskprof.util;

import java.lang.ref.WeakReference;
import java.util.function.Function;

public final class WeakKeyIdentityHashMap<K, V> {

    private static final int FACTOR = 2;
    private static final int DEFAULT_INITIAL_SIZE = 1024;
    private static final int PRIME = 31;

    private Entry<K, V>[] __table;
    private int __used;
    private int __threshold;

    @SuppressWarnings("unchecked")
    public WeakKeyIdentityHashMap(int initialSize) {
        this.__table = new Entry[initialSize];
        this.__used = 0;
        this.__threshold = (initialSize * 2 ) / 3;
    }

    public WeakKeyIdentityHashMap() {
        this(DEFAULT_INITIAL_SIZE);
    }

    public void putIfAbsent(final K key, final V value) {
        if (key == null)
            throw new IllegalArgumentException();

        int idx = System.identityHashCode(key) % __table.length;

        Entry<K, V> e;
        while ((e = __table[idx]) != null) {
            if (e.get() == key) {
                return;
            } else {
                idx = (idx + (1 + idx % PRIME)) % __table.length;
            }
        }

        __table[idx] = new Entry<>(key, value);

        if (++__used >= __threshold) {
            resize();
        }
    }

    public V get(final K key) {
        if (key == null)
            throw new IllegalArgumentException();

        int idx = System.identityHashCode(key) % __table.length;

        Entry<K, V> e;
        while ((e = __table[idx]) != null) {
            if (e.get() == key) {
                return e.__value;
            } else {
                idx = (idx + (1 + idx % PRIME)) % __table.length;
            }
        }

        return null;
    }

    public V computeIfAbsent(final K key, final Function<K, V> f) {
        if (key == null)
            throw new IllegalArgumentException();

        int idx = System.identityHashCode(key) % __table.length;

        Entry<K, V> e;
        while ((e = __table[idx]) != null) {
            if (e.get() == key) {
                return e.__value;
            } else {
                idx = (idx + (1 + idx % PRIME)) % __table.length;
            }
        }

        final V value = f.apply(key);
        __table[idx] = new Entry<>(key, value);


        if (++__used >= __threshold) {
            resize();
        }

        return value;
    }

    public Object[] values() {
        final Object[] values = new Object[__used];
        int i = 0;
        for (Entry<K, V> e : __table) {
            if (e != null) {
                values[i++] = e.__value;
            }
        }
        return values;
    }


    private void resize() {
        @SuppressWarnings("unchecked") final Entry<K, V>[] newTable = new Entry[__table.length * FACTOR];
        for (Entry<K, V> e : __table) {
            if (e != null) {
                int idx = e.__hash % newTable.length;

                while (newTable[idx] != null) {
                    idx = (idx + (1 + idx % PRIME)) % newTable.length;
                }

                newTable[idx] = e;
            }
        }

        __table = newTable;
        __threshold = (newTable.length * 2 ) / 3;
    }

    private static final class Entry<K, V> extends WeakReference<K> {
        private final V __value;
        private final int __hash;

        Entry(K key, V value) {
            super(key);
            __value = value;
            __hash = System.identityHashCode(key);
        }
    }
}
