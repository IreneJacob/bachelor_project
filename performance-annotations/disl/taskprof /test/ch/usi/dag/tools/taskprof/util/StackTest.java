package ch.usi.dag.tools.taskprof.util;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by decars on 2016-08-23.
 */
public class StackTest {
    @Test
    public void pushPopTest() throws Exception {
        final Stack<String> stack = new Stack<>();
        stack.push("hello");
        stack.push("world");
        assertEquals(stack.pop(), "world");
        assertEquals(stack.pop(), "hello");
    }

    @Test
    public void containsTest() throws Exception {
        final Stack<String> stack = new Stack<>();
        stack.push("hello");
        stack.push("world");
        assertTrue(stack.contains("hello"));
        assertTrue(!stack.contains("!"));
        assertTrue(stack.contains("world"));
        stack.pop();
        assertTrue(stack.contains("hello"));
        assertTrue(!stack.contains("world"));
        stack.pop();
        assertTrue(!stack.contains("hello"));
        assertTrue(!stack.contains("world"));
    }

}