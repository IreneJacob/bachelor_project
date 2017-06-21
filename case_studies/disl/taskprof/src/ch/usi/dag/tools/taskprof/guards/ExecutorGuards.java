package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.annotation.GuardMethod;
import ch.usi.dag.disl.guardcontext.GuardContext;
import ch.usi.dag.disl.guardcontext.ReflectionStaticContext;
import ch.usi.dag.disl.staticcontext.ClassStaticContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;

final class ExecutorGuards {

    private ExecutorGuards() { /* Prevent instantiation */ }

    private final static class ExecutorGuard {

        private static final ConcurrentHashMap<Class<?>, Boolean> __cache = new ConcurrentHashMap<>();

        private ExecutorGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final ClassStaticContext csc, final ReflectionStaticContext rsc) {
            return ReflectionUtils.classIsCompatible(csc.getName(), Executor.class, __cache, "java/util/concurrent/Executor", rsc);
        }
    }

    private final static class ExecutorServiceGuard {

        private final static ConcurrentHashMap<Class<?>, Boolean> __cache = new ConcurrentHashMap<>();

        private ExecutorServiceGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final ClassStaticContext csc) {
            return ReflectionUtils.classIsCompatible(csc.getName(), ExecutorService.class, __cache);
        }
    }

    final static class ExecutorConstructorGuard {

        private ExecutorConstructorGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("<init>")
                    && gc.invoke(ExecutorGuards.ExecutorGuard.class);
        }
    }

    final static class ExecuteMethodGuard {

        private ExecuteMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("execute")
                    && msc.thisMethodDescriptor().equals("(Ljava/lang/Runnable;)V")
                    && gc.invoke(ExecutorGuards.ExecutorGuard.class);
        }
    }

    final static class SubmitMethodGuard {

        private SubmitMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            final String descriptor = msc.thisMethodDescriptor();

            return msc.thisMethodName().equals("submit")
                    && (descriptor.equals("(Ljava/lang/Runnable;)Ljava/util/concurrent/Future;")
                    || descriptor.equals("(Ljava/lang/Runnable;Ljava/lang/Object;)Ljava/util/concurrent/Future;")
                    || descriptor.equals("(Ljava/util/concurrent/Callable;)Ljava/util/concurrent/Future;"))
                    && gc.invoke(ExecutorGuards.ExecutorServiceGuard.class);
        }
    }
}
