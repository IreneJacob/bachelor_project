package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.annotation.GuardMethod;
import ch.usi.dag.disl.guardcontext.GuardContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

public final class Guards {

    /**
     * Recognises constructors of subtypes of Runnable or Callable.
     */
    public final static class TaskConstructionGuard {

        private TaskConstructionGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(RunnableGuards.RunnableConstructorGuard.class)
                    || gc.invoke(CallableGuards.CallableConstructorGuard.class);
        }
    }

    /**
     * Recognises calls to the .run() method of a Runnable or the .call() method of a Callable.
     */
    public final static class TaskExecutionGuard {

        private TaskExecutionGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(RunnableGuards.RunMethodGuard.class)
                    || gc.invoke(CallableGuards.CallMethodGuard.class);
        }
    }

    /**
     * Recognises the .submit(task) method of an ExecutorService
     */
    public final static class TaskSubmissionGuard {

        private TaskSubmissionGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ExecutorGuards.ExecuteMethodGuard.class)
                    || gc.invoke(ExecutorGuards.SubmitMethodGuard.class);
        }
    }

    /**
     * Recognises the constructor of a subtype of Thread.
     */
    public final static class ThreadConstructionGuard {

        private ThreadConstructionGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ThreadGuards.ThreadConstructorGuard.class);
        }
    }


    /**
     * Recognises the constructor of a subtype of Executor.
     */
    public final static class ExecutorConstructionGuard {

        private ExecutorConstructionGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ExecutorGuards.ExecutorConstructorGuard.class);
        }
    }


    /**
     * Recognises methods of a Runnable or Callable other than .run(), .call() or .start()
     */
    public final static class TaskProcessingGuard {

        private TaskProcessingGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc, final MethodStaticContext msc) {
            return !msc.isMethodStatic() && (gc.invoke(RunnableGuards.RunnableProcessingGuard.class)
                    || gc.invoke(CallableGuards.CallableProcessingGuard.class))
                    && !gc.invoke(ThreadGuards.ThreadStartMethodGuard.class);
        }
    }

    /**
     * Recognises the .start() method of a Thread.
     */
    public final static class ThreadStartGuard {

        private ThreadStartGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ThreadGuards.ThreadStartMethodGuard.class);
        }
    }

    /**
     * Recognises methods of a Thread other than .start() or .run()
     */
    public final static class ThreadProcessingGuard {

        private ThreadProcessingGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc, final MethodStaticContext msc) {
            return !msc.isMethodStatic() && gc.invoke(ThreadGuards.ThreadProcessingGuard.class);
        }
    }

    /**
     * Recognises a thread's .run() method or the application's main method
     */
    public final static class ThreadRunMethodGuard {

        private ThreadRunMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(Guards.MainMethodGuard.class) || gc.invoke(ThreadGuards.ThreadRunMethodGuard.class);
        }
    }

    /**
     * Recognises the application's main method
     */
    private final static class MainMethodGuard {

        private MainMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc) {
            return msc.isMethodStatic()
                    && msc.thisMethodName().equals("main")
                    && msc.thisMethodDescriptor().equals("([Ljava/lang/String;)V");
        }
    }
}
