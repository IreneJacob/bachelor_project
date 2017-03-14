package ch.usi.dag.tools.taskprof.util;


public class Stack<T> {

    private static final int FACTOR = 2;
    private static final int DEFAULT_INITIAL_SIZE = 1024;

    private Object[] stack;
    private int tos;

    public Stack(final int size) {
        stack = new Object[size];
        tos = 0;
    }

    public Stack() {
        this(DEFAULT_INITIAL_SIZE);
    }

    public void push(final T elem) {
        stack[tos++] = elem;
        if (tos > stack.length) {
            resize();
        }
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (tos > 0) {
            final T res = (T) stack[--tos];
            stack[tos] = null;
            return res;
        } else {
            return null;
        }
    }

    public boolean contains(final T elem) {
        /* Search backwards, since it's likely that methods will be called on tasks in execution, which are on top */
        for (int i = tos - 1; i >= 0; --i) {
            if (stack[i] == elem) {
                return true;
            }
        }
        return false;
    }

    private void resize() {
        final Object[] newArray = new Object[stack.length * FACTOR];
        for (int i = 0; i < stack.length; ++i) {
            newArray[i] = stack[i];
        }
        stack = newArray;
    }
}
