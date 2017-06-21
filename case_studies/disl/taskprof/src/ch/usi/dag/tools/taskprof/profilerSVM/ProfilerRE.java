package ch.usi.dag.tools.taskprof.profilerSVM;

import ch.usi.dag.dislre.REDispatch;

public final class ProfilerRE {

    private static final short creationId = REDispatch.registerMethod(
            "ch.usi.dag.tools.taskprof.profilerSVM.Profiler.registerTaskCreation");

    private static final short executionId = REDispatch.registerMethod(
            "ch.usi.dag.tools.taskprof.profilerSVM.Profiler.registerTaskExecution");

    private static final short processingId = REDispatch.registerMethod(
            "ch.usi.dag.tools.taskprof.profilerSVM.Profiler.registerTaskProcessing");

    private static final short startId = REDispatch.registerMethod(
            "ch.usi.dag.tools.taskprof.profilerSVM.Profiler.registerThreadStart");

    private ProfilerRE() {}

    public static void registerTaskCreation(final Object task, final long bcCreation) {
        if (task != null) {
            REDispatch.analysisStart(creationId);

            REDispatch.sendObject(task);
            REDispatch.sendInt(System.identityHashCode(task));
            REDispatch.sendCurrentThread();
            REDispatch.sendLong(bcCreation);

            REDispatch.analysisEnd();
        }
    }

    public static void registerTaskExecution(final Object task, final long bcExecution) {
        if (task != null) {
            REDispatch.analysisStart(executionId);

            REDispatch.sendObject(task);
            REDispatch.sendCurrentThread();
            REDispatch.sendLong(bcExecution);

            REDispatch.analysisEnd();
        }
    }

    public static void registerTaskProcessing(final Object task, final long bcProcessing) {
        if (task != null) {
            REDispatch.analysisStart(processingId);

            REDispatch.sendObject(task);
            REDispatch.sendLong(bcProcessing);

            REDispatch.analysisEnd();
        }
    }

    public static void registerThreadStart(final Thread thread) {
        if (thread != null) {
            REDispatch.analysisStart(startId);

            REDispatch.sendObject(thread);
            REDispatch.sendCurrentThread();

            REDispatch.analysisEnd();
        }
    }

}
