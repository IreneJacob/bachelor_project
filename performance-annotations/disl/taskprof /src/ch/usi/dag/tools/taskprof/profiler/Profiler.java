package ch.usi.dag.tools.taskprof.profiler;


import ch.usi.dag.tools.taskprof.util.SynchronizedWeakKeyIdentityHashMap;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;

public final class Profiler {

    private Profiler() { /* Prevent instantiation */ }

    private static final SynchronizedWeakKeyIdentityHashMap<Object, TaskProfile> __taskToProfile = new SynchronizedWeakKeyIdentityHashMap<>();
    private static final SynchronizedWeakKeyIdentityHashMap<Thread, ThreadProfile> __threadToProfile = new SynchronizedWeakKeyIdentityHashMap<>();

    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                final Path completed = FileSystems.getDefault().getPath("profiles", "tasks.csv");
                final Path threads = FileSystems.getDefault().getPath("profiles", "threads.csv");
                final Path dir = completed.getParent();
                if (!Files.exists(dir)) {
                    Files.createDirectories(dir);
                }

                // Log the task profiles
                PrintWriter out = new PrintWriter(Files.newBufferedWriter(completed));
                out.println("\"Name\",\"Is Thread\",\"Creation Thread\",\"Creation Bytecode\",\"Processing Bytecode\",\"Execution Thread\",\"Execution Bytecode\"");
                for (Object po : __taskToProfile.values()) {
                    final TaskProfile p = (TaskProfile) po;
                    out.printf("\"%s\",\"%b\",\"%s\",\"%d\",\"%d\",\"%s\",\"%d\"\n", p.__name, p.__isThread, p.__creationThread, p.__creationBc, p.__processingBc, p.__executionThread, p.__executionBc);
                }

                out.close();

                // Log the thread profiles
                out = new PrintWriter(Files.newBufferedWriter(threads));
                out.println("\"Name\",\"Is Daemon\",\"Creation Thread\",\"Creation Bytecode\",\"Starting Thread\",\"Executed tasks\",\"Executed bytecode\"");
                for (Object po : __threadToProfile.values()) {
                    final ThreadProfile p = (ThreadProfile) po;
                    out.printf("\"%s\",\"%b\",\"%s\",\"%d\",\"%s\",\"%d\",\"%d\"\n", p.__name, p.__isDaemon, p.__creationThread, p.__creationBc, p.__startingThread, p.__tasksExecuted, p.__executedBc);
                }

                out.close();
            } catch (IOException e) {
                System.out.println("[Warning] Failed to write to file: " + e.getMessage());
            }
        }));
    }

    public static void registerTaskCreation(final Object task, final Thread creationThread, final long creationBc) {
        if(task != null) {
            if (task instanceof Thread) {
                __taskToProfile.putIfAbsent(task, new TaskProfile(Profiler.toString(task), creationThread, creationBc, true));
                registerThreadCreation((Thread) task, creationThread, creationBc);
            } else {
                __taskToProfile.putIfAbsent(task, new TaskProfile(Profiler.toString(task), creationThread, creationBc, false));
            }
        }
    }

    public static void registerTaskProcessing(final Object task, final long processingBc) {
        if (task != null) {
            final TaskProfile prof = __taskToProfile.get(task);
            if (prof != null && !prof.__inExecution) {
                prof.__processingBc += processingBc;
            }
        }
    }

    public static void registerTaskExecutionStart(final Object task) {
        if (task != null) {
            final TaskProfile prof = __taskToProfile.computeIfAbsent(task, t -> new TaskProfile(Profiler.toString(t), null, -1, false));
            prof.__inExecution = true;
        }
    }

    public static void registerTaskExecutionDone(final Object task, final Thread executionThread, final long executionBc) {
        if (task != null) {
            final TaskProfile prof = __taskToProfile.get(task);
            if (prof != null) {
                prof.__executionThread = ((executionThread == null) ? null : executionThread.getName());
                prof.__executionBc = executionBc;
                if (executionThread  != null) {
                    final ThreadProfile threadProf = __threadToProfile.computeIfAbsent(executionThread,
                            t -> new ThreadProfile(t, null, -1));
                    threadProf.__tasksExecuted += 1;
                    threadProf.__executedBc += executionBc;
                }
            }
        }
    }

    private static void registerThreadCreation(final Thread thread, final Thread creationThread, final long creationBc) {
        if (thread != null) {
            __threadToProfile.putIfAbsent(thread, new ThreadProfile(thread, creationThread, creationBc));
        }
    }

    public static void registerThreadStart(final Thread thread, final Thread startingThread) {
        if (thread != null && startingThread != null) {
            final ThreadProfile prof = __threadToProfile.computeIfAbsent(thread, t -> new ThreadProfile(t, null, -1));
            prof.__startingThread = startingThread.getName();
        }
    }

    private static String toString(final Object obj) {
        return obj.getClass().getName() + "@" + System.identityHashCode(obj);
    }

    private static final class TaskProfile {
        private final String __name;
        private final String __creationThread;
        private final long __creationBc;
        private String __executionThread;
        private long __executionBc;
        private long __processingBc;
        private boolean __inExecution;
        private final boolean __isThread;

        private TaskProfile(final String name, final Thread creationThread, final long creationBc, final boolean isThread) {
            __name = name;
            __creationThread = ((creationThread == null) ? null : creationThread.getName());
            __creationBc = creationBc;
            __executionThread = null;
            __executionBc = 0;
            __inExecution = false;
            __isThread = isThread;
        }
    }

    private static final class ThreadProfile {
        private final String __name;
        private final String __creationThread;
        private  String __startingThread;
        private final long __creationBc;
        private long __tasksExecuted;
        private long __executedBc;
        private final boolean __isDaemon;

        private ThreadProfile(final Thread thread, final Thread creationThread, final long creationBc) {
            final boolean threadIsNull = thread == null;

            __name =(threadIsNull ? null : thread.getName());
            __startingThread = null;
            __creationThread = ((creationThread == null) ? null : creationThread.getName());
            __creationBc = creationBc;
            __tasksExecuted = 0;
            __executedBc = 0;
            __isDaemon = !threadIsNull && thread.isDaemon();
        }
    }
}
