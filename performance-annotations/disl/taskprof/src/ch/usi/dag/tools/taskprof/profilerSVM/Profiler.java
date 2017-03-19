package ch.usi.dag.tools.taskprof.profilerSVM;

import ch.usi.dag.dislreserver.remoteanalysis.RemoteAnalysis;
import ch.usi.dag.dislreserver.shadow.ShadowObject;
import ch.usi.dag.dislreserver.shadow.ShadowThread;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public final class Profiler extends RemoteAnalysis {

    private final ConcurrentHashMap<ShadowObject, TaskProfile> __taskProfiles;
    private final ConcurrentHashMap<ShadowThread, ThreadProfile> __threadProfiles;

    public Profiler() {
        __taskProfiles = new ConcurrentHashMap<>();
        __threadProfiles = new ConcurrentHashMap<>();
    }

    public void registerTaskCreation(final ShadowObject task, final int hash, final ShadowThread threadCreation, final long bcCreation) {
        final boolean isThread = task instanceof ShadowThread;
        final TaskProfile prof = __taskProfiles.computeIfAbsent(task, t -> new TaskProfile());
        final String creator = (threadCreation == null) ? null : threadCreation.getName();
        prof.__name = task.getShadowClass().getName() + "@" + hash;
        prof.__creationThread = creator;
        prof.__bcCreation = bcCreation;
        prof.__isThread = isThread;
        if (isThread) {
            final ShadowThread threadTask = (ShadowThread) task;
            final ThreadProfile threadProf = __threadProfiles.computeIfAbsent(threadTask, t -> new ThreadProfile());
            threadProf.__name = threadTask.getName();
            threadProf.__creationThread = creator;
            threadProf.__isDaemon = threadTask.isDaemon();
        }
    }

    public void registerTaskExecution(final ShadowObject task, final ShadowThread threadExecution, final long bcExecution) {
        final TaskProfile prof = __taskProfiles.computeIfAbsent(task, (t) -> new TaskProfile());
        prof.__executionThread = threadExecution.getName();
        prof.__bcExecution = bcExecution;
        final ThreadProfile threadProf = __threadProfiles.computeIfAbsent(threadExecution, t -> new ThreadProfile());
        threadProf.__tasksExecuted.incrementAndGet();
        threadProf.__bcExecuted.addAndGet(bcExecution);
    }

    public void registerTaskProcessing(final ShadowObject task, final long bcProcessing) {
        final TaskProfile prof = __taskProfiles.computeIfAbsent(task, (t) -> new TaskProfile());
        prof.__bcProcessing.addAndGet(bcProcessing);
    }

    public void registerThreadStart(final ShadowObject started, final ShadowThread starting) {
        final ThreadProfile threadProf = __threadProfiles.computeIfAbsent((ShadowThread) started, t -> new ThreadProfile());
        threadProf.__startingThread = starting.getName();
    }

    @Override
    public void atExit() {
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
            for (TaskProfile prof : __taskProfiles.values()) {
                out.println(prof.toString());
            }

            out.close();

            // Log the thread profiles
            out = new PrintWriter(Files.newBufferedWriter(threads));
            out.println("\"Name\",\"Is Daemon\",\"Creation Thread\",\"Starting Thread\",\"Executed tasks\",\"Executed bytecode\"");
            for (ThreadProfile prof : __threadProfiles.values()) {
                out.println(prof.toString());
            }

            out.close();
        } catch (IOException e) {
            System.out.println("[Warning] Failed to write to file: " + e.getMessage());
        }
    }

    @Override
    public void objectFree(final ShadowObject shadowObject) {
        // Do nothing
    }

    private static final class TaskProfile {

        private String __name = null;
        private String __creationThread = null;
        private String __executionThread = null;
        private long __bcCreation = 0;
        private long __bcExecution = 0;
        private AtomicLong __bcProcessing = new AtomicLong(0);
        private boolean __isThread = false;

        @Override
        public String toString() {
            return String.format("\"%s\",\"%b\",\"%s\",\"%d\",\"%d\",\"%s\",\"%d\"", __name, __isThread, __creationThread,
                    __bcCreation, __bcProcessing.get(), __executionThread, __bcExecution);
        }
    }

    private static final class ThreadProfile {
        private String __name = null;
        private String __creationThread = null;
        private String __startingThread = null;
        private AtomicLong __tasksExecuted = new AtomicLong(0);
        private AtomicLong __bcExecuted = new AtomicLong(0);
        private boolean __isDaemon = false;

        @Override
        public String toString() {
            return String.format("\"%s\",\"%b\",\"%s\",\"%s\",\"%d\",\"%d\"", __name, __isDaemon, __creationThread,
                    __startingThread, __tasksExecuted.get(), __bcExecuted.get());
        }
    }
}
