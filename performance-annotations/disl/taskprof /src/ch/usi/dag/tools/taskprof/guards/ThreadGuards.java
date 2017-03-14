package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.annotation.GuardMethod;
import ch.usi.dag.disl.guardcontext.GuardContext;
import ch.usi.dag.disl.staticcontext.ClassStaticContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.concurrent.ConcurrentHashMap;

final class ThreadGuards {

    private ThreadGuards() { /* Prevent instantiation */ }

    private final static class ThreadGuard {

        private ThreadGuard() { /* Prevent instantiation */ }

        final private static ConcurrentHashMap<Class<?>, Boolean> __cache = new ConcurrentHashMap<>();

        @GuardMethod
        public static boolean isApplicable(final ClassStaticContext csc) {
            return ReflectionUtils.classIsCompatible(csc.getName(), Thread.class, __cache);
        }
    }

    final static class ThreadConstructorGuard {

        private ThreadConstructorGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("<init>") && gc.invoke(ThreadGuards.ThreadGuard.class);
        }
    }

    final static class ThreadStartMethodGuard {

        private ThreadStartMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("start")
                    && msc.thisMethodDescriptor().equals("()V")
                    && gc.invoke(ThreadGuard.class);
        }
    }

    final static class ThreadProcessingGuard {

        private ThreadProcessingGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ThreadGuard.class)
                    && !gc.invoke(ThreadConstructorGuard.class)
                    && !gc.invoke(ThreadStartMethodGuard.class)
                    && !gc.invoke(RunnableGuards.RunMethodGuard.class);
        }
    }

    final static class ThreadRunMethodGuard {

        private ThreadRunMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(ThreadGuard.class)
                    && gc.invoke(RunnableGuards.RunMethodGuard.class);
        }
    }

}
